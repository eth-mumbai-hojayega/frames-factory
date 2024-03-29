import React from "react";
import { Background, Controls, Edge, ReactFlow as Flow } from "reactflow";
import "reactflow/dist/style.css";

type ReactFlow = {
  nodes: any[];
  edges: Edge<any>[];
  onNodeClick: (event: any, node: Node) => void;
  onEdgeClick?: (event: any, edge: Edge) => void;
  onConnectStart?: (
    _: any,
    {
      nodeId,
    }: {
      nodeId: any;
    },
  ) => void;
  onConnect?: (params: any) => void;
  onConnectEnd?: (event: any) => void;
  onNodesChange?: () => void;
  onEdgesChange?: () => void;
  onNodesDelete: (e: any) => void;
};

const ReactFlow: React.FC<ReactFlow> = ({
  nodes,
  edges,
  onNodeClick,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onConnectEnd,
  onConnectStart,
  onEdgeClick,
  onNodesDelete,
}) => {
  return (
    <Flow
      nodes={nodes}
      edges={edges}
      onEdgeClick={onEdgeClick}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodesDelete={onNodesDelete}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      fitView
      maxZoom={1.3}
      minZoom={-2.5}
      style={{ background: "#E7E7E7" }}
      onNodeClick={onNodeClick}
    >
      <Background color="#aaa" gap={50} size={3} />
      <Controls />
    </Flow>
  );
};

export default ReactFlow;
