import { fetchMetadata } from "frames.js/next";


export async function generateMetadata({ params, searchParams }: any) {
  console.log(searchParams);
  const frameId = params.frameId;
  return {
    title: "Frames",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(new URL("/api/orchestrator/" + frameId, "https://frames-hojayega.vercel.app")),
  };
}

export default function Page() {
  return <span>Frame Template</span>;
}
