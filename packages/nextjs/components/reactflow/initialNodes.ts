import { Node } from "reactflow";
import { NodeData } from "~~/types/commontypes";

export const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    data: {
      label: "Initial Frame",
    },
    position: { x: 0, y: -50 },
  },
];
