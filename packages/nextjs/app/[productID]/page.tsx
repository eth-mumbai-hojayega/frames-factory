"use client";

import React, { useMemo } from "react";
import { NextPage } from "next";
import NodeModal from "~~/components/NodeModal";
import ReactFlow from "~~/components/reactflow";
import { useJourneyForProduct } from "~~/providers/ReactFlow";
import { NodeData } from "~~/types/commontypes";
import { notification } from "~~/utils/scaffold-eth";

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

  const frameId = useMemo(() => {
    const getFirstNodeFrameId = (nodes: any[]) => {
      const firstNode = nodes.find(node => node.id === "1");
      console.log("firstNode", firstNode);
      return firstNode?.data?.frameId;
    };
    return getFirstNodeFrameId(nodes);
  }, [nodes]);

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
        {frameId && (
          <button
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 999,
              padding: "10px",
              background: "white",
              border: "1px solid black",
              borderRadius: "5px",
              cursor: "pointer",
              color: "black",
            }}
            onClick={() => {
              window.navigator.clipboard.writeText(`https://frames-hojayega.vercel.app/frames/${frameId}`);
              notification.success("Link copied to clipboard");
            }}
          >
            Link For Warpcast
          </button>
        )}
      </div>
      {/*render button that copies link of current node*/}

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
