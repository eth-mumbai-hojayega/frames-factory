import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useProductJourney } from "./ProductProvider";
import { useQuery } from "@tanstack/react-query";
import { createFrames } from "frames.js/next";
import { useEdgesState, useNodesState } from "reactflow";
import { useAccount } from "wagmi";
import { initialNodes } from "~~/components/reactflow/initialNodes";

interface IReactFlow {}

const ReactFlow = createContext<IReactFlow | null>(null);

const useReactFlow = () => {
  const { productQuery, productID } = useProductJourney();
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);

  const [currentNode, setCurrentNode] = useState(null);

  useEffect(() => {
    if (!productID || !productQuery.data) return;
    const { nodes, edges } = productQuery.data.journey;
    setNodes(nodes);
    setEdges(edges);
  }, [productID, productQuery.data, productQuery.data?.journey]);

  return {};
};

export function ProvideReactFlow({ children }: PropsWithChildren<{}>) {
  const value = useReactFlow();
  return <ReactFlow.Provider value={value}>{children}</ReactFlow.Provider>;
}

export const ReactFlowProvider = () => {
  const context = useContext(ReactFlow);
  if (context == null) {
    throw "Ensure that the component is wrapped inside ReactFlowProvider";
  }
  return context;
};
