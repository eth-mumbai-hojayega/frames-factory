"use client";

import React from "react";
import { NextPage } from "next";
import ReactFlow from "~~/components/reactflow";
import { useJourneyForProduct } from "~~/providers/ReactFlow";

const ProductPage: NextPage = () => {
  const {
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

  return (
    <div className="h-[100vh]">
      <div
        style={{
          height: "90vh",
          width: "50%",
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
    </div>
  );
};

export default ProductPage;
