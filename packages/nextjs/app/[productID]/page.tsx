"use client";

import React from "react";
import { NextPage } from "next";
import NodeModal from "~~/components/NodeModal";
import ReactFlow from "~~/components/reactflow";
import { useJourneyForProduct } from "~~/providers/ReactFlow";

const ProductPage: NextPage = () => {
  const {
    open,
    setOpen,
    currentNode,
    onNodeClick,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    reactFlowWrapper,
    onConnect,
    onConnectStart,
    onConnectEnd,
  } = useJourneyForProduct();
  console.log(nodes, edges);
  return (
    <div className="flex h-[100vh]">
      <div
        style={{
          height: "90vh",
          width: "100%",
          background: "#F4F4F4",
          border: "none",
        }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          type="flowMode"
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          // onEdgeClick={onEdgeClick}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
        />
      </div>

      <NodeModal
        key={currentNode?.id}
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default ProductPage;
