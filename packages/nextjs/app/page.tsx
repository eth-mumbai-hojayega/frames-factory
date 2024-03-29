"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ReactFlow from "~~/components/reactflow";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="h-[90vh]">
      <ReactFlow
        nodes={[
          {
            id: "1",
            type: "input",

            data: { label: "Input Node" },
            position: { x: 250, y: 25 },
          },
          // you can also pass a React component as a label
          {
            id: "2",
            type: "output",
            data: { label: <div>Output Node</div> },
            position: { x: 250, y: 250 },
          },
        ]}
        edges={[{ id: "e1-2", source: "1", target: "2", animated: true }]}
        onNodeClick={(event, node) => console.log("click", node)}
        onConnect={params => console.log("connect", params)}
        onConnectStart={(event, { nodeId }) => console.log("connect start", nodeId)}
        onConnectEnd={event => console.log("connect end", event)}
        onNodesChange={() => console.log("nodes change")}
        onEdgesChange={() => console.log("edges change")}
        onNodesDelete={e => console.log("nodes delete", e)}
      />
    </div>
  );
};

export default Home;
