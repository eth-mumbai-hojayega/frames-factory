import { getFrameById } from "../apis";
import { Edge, Node } from "reactflow";
import { NodeData } from "~~/types/commontypes";

export const getChildNodesFromEdgeBasedOnNodeID = async (nodeId: string, edges: Edge[], nodes: Node<NodeData>[]) => {
  const filteredEdges = edges.filter(edge => edge.source === nodeId);
  const parentEdges = edges.filter(edge => edge.target === nodeId);
  const parentNodes = parentEdges.map(edge => edge.source);
  const targetNodes = filteredEdges.map(edge => edge.target);
  const getFrameIdFromNode = (nodeId: string) => {
    const node = nodes.find(node => node.id === nodeId);
    return node?.data?.frameId;
  };
  const targetFrameIds = targetNodes.map(node => getFrameIdFromNode(node));
  const parentFrameIds = parentNodes.map(node => getFrameIdFromNode(node));
  // Filter out empty strings from frameIds array
  const filteredFrameIds = targetFrameIds.filter(frameId => frameId !== "");
  const filteredParentFrameIds = parentFrameIds.filter(frameId => frameId !== "");
  // Combine the two arrays
  const combinedFrameIds = [...filteredFrameIds, ...filteredParentFrameIds];
  // Remove duplicates
  const uniqueFrameIds = Array.from(new Set(combinedFrameIds));
  const frameDataArray = await Promise.all(uniqueFrameIds.map(frameId => getFrameById(frameId as string)));
  return frameDataArray;
};
