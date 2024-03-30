import { Edge, Node } from "reactflow";

export interface NodeData {
  label?: string;
  frameId?: string;
}
export interface JourneyJson {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export interface Journey {
  _id: string;
  name: string;
  walletAddress: string;
  journeyJson: JourneyJson;
  desc?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FrameJson {
  image: string;
  buttons: any[];
  inputText?: string;
  state?: string;
  imageOptions?: string;
}

export interface Frame {
  _id: string;
  name: string;
  frameJson: FrameJson;
}
