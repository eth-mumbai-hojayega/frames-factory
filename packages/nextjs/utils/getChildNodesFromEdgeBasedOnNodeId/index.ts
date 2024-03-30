import { getFrameById } from "../apis";
import { Edge, Node } from "reactflow";
import { NodeData } from "~~/types/commontypes";

export const getChildNodesFromEdgeBasedOnNodeID = async (nodeId: string, edges: Edge[], nodes: Node<NodeData>[]) => {
  const filteredEdges = edges.filter(edge => edge.source === nodeId);
  const targetNodes = filteredEdges.map(edge => edge.target);
  const getFrameIdFromNode = (nodeId: string) => {
    const node = nodes.find(node => node.id === nodeId);
    return node?.data?.frameId;
  };
  const frameIds = targetNodes.map(node => getFrameIdFromNode(node));
  // Filter out empty strings from frameIds array
  const filteredFrameIds = frameIds.filter(frameId => frameId !== "");
  const frameDataArray = await Promise.all(filteredFrameIds.map(frameId => getFrameById(frameId as string)));
  return frameDataArray;
};
