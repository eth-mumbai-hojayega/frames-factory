import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useProductJourney } from "./ProductProvider";
import { useEdgesState, useNodesState } from "reactflow";
import { Edge, Node, useReactFlow } from "reactflow";
import { uuid } from "uuidv4";
import { initialNodes } from "~~/components/reactflow/initialNodes";
import { selectedNodeStyle } from "~~/components/reactflow/selectedNodeStyles";
import { NodeData } from "~~/types/commontypes";
import { createFrame } from "~~/utils/apis";

interface IJourneyForProduct {
  nodes: Node<NodeData>[];
  edges: Edge[];
  reactFlowWrapper: React.RefObject<HTMLDivElement>;
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onConnect: (params: any) => void;
  onConnectStart: (event: any, { nodeId }: any) => void;
  onConnectEnd: (event: any) => void;
  onNodeClick: (event: any, node: Node) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  saveJourney: () => void;
  deleteNode: (nodeId: string) => void;
  currentNode: Node<NodeData> | undefined;
  getNode: (nodeId: string) => Node<NodeData> | undefined;
  onNodesChange: (nodes: Node<NodeData>[]) => void;
  onEdgesChange: (edges: Edge[]) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JourneyForProductContext = createContext<IJourneyForProduct | null>(null);

const useJourneyForProductContextProvider = () => {
  const { productQuery, productID, updateProduct } = useProductJourney();
  const [open, setOpen] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentNode, setCurrentNode] = useState<Node<NodeData>>();

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const connectingNodeId = useRef(null);

  const { project, screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params: any) => {
    const id = uuid();
    const newEdge = {
      ...params,
      id: params?.source + params?.sourceHandle + id,
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
        const nextId = uuid();
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
          id: uuid(),
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
        style: selectedNodeStyle,
      },
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
    setOpen(true);
    setSelectedNode(_node);
  };

  const updateNode = (nodeId: string, data: Partial<NodeData>) => {
    const node = getNode(nodeId);
    if (!node) return;
    node.data = {
      ...node.data,
      ...data,
    };
    setSelectedNode(node);
    saveJourney();
  };

  const saveJourney = () => {
    updateProduct.mutate({ journeyJson: { nodes, edges } });
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter((node: Node) => node.id !== nodeId));
    setEdges(edges);
  };

  useEffect(() => {
    if (!productID || !productQuery.data || !productQuery.data?.journeyJson) return;
    const { nodes, edges } = productQuery.data.journeyJson;
    setNodes(nodes);
    setEdges(edges);
  }, [productID, productQuery.data, productQuery.data?.journeyJson]);

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
    onNodesChange,
    onEdgesChange,
    open,
    setOpen,
  };
};

export function ProvideJourneyForProductContext({ children }: PropsWithChildren<{}>) {
  const value = useJourneyForProductContextProvider();
  return <JourneyForProductContext.Provider value={value}>{children}</JourneyForProductContext.Provider>;
}

export const useJourneyForProduct = () => {
  const context = useContext(JourneyForProductContext);
  if (context == null) {
    throw "Ensure that the component is wrapped inside JourneyForProductContextProvider";
  }
  return context;
};
