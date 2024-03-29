import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useProductJourney } from "./ProductProvider";
import { randomUUID } from "crypto";
import { useEdgesState, useNodesState } from "reactflow";
import { Edge, Node, useReactFlow } from "reactflow";
import { initialNodes } from "~~/components/reactflow/initialNodes";
import { selectedNodeStyle } from "~~/components/reactflow/selectedNodeStyles";
import { NodeData } from "~~/types/commontypes";

interface IReactFlow {
  nodes: Node<NodeData>[];
  edges: Edge[];
  reactFlowWrapper: React.RefObject<HTMLDivElement>;
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onConnect: (params: any) => void;
  onConnectStart: (event: any, { nodeId }: any) => void;
  onConnectEnd: (event: any) => void;
  onNodeClick: (event: any, node: Node) => void;
  updateNode: (nodeId: string, data: Partial<Node>) => void;
  saveJourney: () => void;
  deleteNode: (nodeId: string) => void;
  currentNode: Node<NodeData> | undefined;
  getNode: (nodeId: string) => Node<NodeData> | undefined;
}

const ReactFlow = createContext<IReactFlow | null>(null);

const useReactFlowProvider = () => {
  const { productQuery, productID, updateProduct } = useProductJourney();
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);

  const [currentNode, setCurrentNode] = useState<Node<NodeData>>();

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const connectingNodeId = useRef(null);

  const { project, screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params: any) => {
    const id = randomUUID();
    const newEdge = {
      ...params,
      id: params?.source + params?.sourceHandle + id,
      type: "special",
      label: "Edge name",
    };

    setEdges(prevEdges => [...prevEdges, newEdge]);
  }, []);

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      if (targetIsPane) {
        if (!connectingNodeId.current) return;
        // we need to remove the wrapper bounds, in order to get the correct position
        const boundingRect = reactFlowWrapper?.current ? reactFlowWrapper?.current.getBoundingClientRect() : null;
        if (!boundingRect) return;
        const { left } = boundingRect;
        const nextId = randomUUID();
        const newNode = {
          id: nextId,
          type: "singlebutton",
          position: screenToFlowPosition({
            x: event.clientX - left,
            y: event.clientY,
          }),
          data: {
            label: "Node Name",
            frameId: "",
          },
        };

        setSelectedNode(newNode);
        setNodes(nodes => [...nodes, newNode]);

        const newEdge: Edge = {
          id: randomUUID(),
          type: "special",
          source: connectingNodeId.current,
          target: nextId,
          label: "Edge Name",
          data: {},
        };
        setEdges(edges => [...edges, newEdge]);
      }
    },
    [project, nodes, edges, reactFlowWrapper],
  );

  const getNode = (nodeId: string) => {
    return nodes.find((node: Node) => nodeId === node.id);
  };

  const setSelectedNode = (_node: Node) => {
    setCurrentNode({
      ..._node,
      data: {
        ..._node.data,
      },
      style: selectedNodeStyle,
    });
    const nodesMap = nodes.map(node => {
      if (node.id === _node.id) {
        return {
          ..._node,
          data: {
            ..._node.data,
            style: selectedNodeStyle,
          },
        };
      }
      return {
        ...node,
        data: {
          ...node.data,
          style: "",
        },
      };
    });
    setNodes(nodesMap);
  };

  const onNodeClick = (event: any, node: Node) => {
    const _node = getNode(node.id);
    if (!_node) return;
    setSelectedNode(_node);
  };

  const updateNode = (nodeId: string, data: Partial<Node>) => {
    const node = getNode(nodeId);
    if (!node) return;
    node.data = {
      ...node.data,
      ...data,
    };
    setSelectedNode(node);
  };

  const saveJourney = () => {
    updateProduct.mutate({ journey: { nodes, edges } });
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter((node: Node) => node.id !== nodeId));
    setEdges(edges);
  };

  useEffect(() => {
    if (!productID || !productQuery.data) return;
    const { nodes, edges } = productQuery.data.journey;
    setNodes(nodes);
    setEdges(edges);
  }, [productID, productQuery.data, productQuery.data?.journey]);

  return {
    nodes,
    edges,
    reactFlowWrapper,
    setNodes,
    setEdges,
    onConnect,
    onConnectStart,
    onConnectEnd,
    onNodeClick,
    updateNode,
    saveJourney,
    deleteNode,
    currentNode,
    getNode,
  };
};

export function ProvideReactFlow({ children }: PropsWithChildren<{}>) {
  const value = useReactFlowProvider();
  return <ReactFlow.Provider value={value}>{children}</ReactFlow.Provider>;
}

export const ReactFlowProvider = () => {
  const context = useContext(ReactFlow);
  if (context == null) {
    throw "Ensure that the component is wrapped inside ReactFlowProvider";
  }
  return context;
};
