import Frame from "../../../../model/frame";
import connectDB from "../../../lib/connectDB";
import { frames } from "../../../lib/frames";
import { Button } from "frames.js/next";

/* eslint-disable react/jsx-key */
const handleRequest = frames(async ctx => {
  await connectDB();
  try {
    const frameId = ctx.url.pathname.replace("/api/orchestrator/", "");
    const frame = await Frame.findById(frameId);
    const outputFrame = parseJsonToFrame(frame.frameJson);
    console.log(outputFrame);
    return outputFrame;
  } catch (e) {
    return { image: <span>Error 404 Frame not found!</span>, buttons: [], input: "" };
  }
});

const parseJsonToFrame = (frameJson: any) => {
  const { buttons, image, inputText } = frameJson;
  const transformedButtons = buttons.map((button: any) => (
    <Button action="post" target={{ pathname: `/${button?.target}`, query: { value: button?.query } }}>
      {button.label}
    </Button>
  ));
  return {
    image: image,
    buttons: transformedButtons,
    textInput: inputText,
    version: "vNext",
  };
};

export const GET = handleRequest;
export const POST = handleRequest;

// //sample Frame
