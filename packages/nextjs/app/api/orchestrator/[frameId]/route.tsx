import Frame from "../../../../model/frame";
import connectDB from "../../../lib/connectDB";
import { frames } from "../../../lib/frames";
import { Button } from "frames.js/next";
import parse from 'html-react-parser';


/* eslint-disable react/jsx-key */
const handleRequest = frames(async ctx => {
  if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Transaction submitted! {ctx.message.transactionId}
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
      ],
    };
  }
  await connectDB();
  try {
    const frameId = ctx.url.pathname.replace("/api/orchestrator/", "");
    const frame = await Frame.findById(frameId);
    const outputFrame = parseJsonToFrame(frame.frameJson);
    return outputFrame;
  } catch (e) {
    return { image: <span>Error 404 Frame not found!</span>, buttons: [], input: "" };
  }
});

const parseJsonToFrame = (frameJson: any) => {
  const { buttons, image, inputText } = frameJson;
  const transformedButtons = buttons.map((button: any) => (
    <Button
      action={button.action ? button.action : "post"}
      target={{ pathname: `/${button?.target}`, query: { value: button?.query } }}
    >
      {button.label}
    </Button>
  ));
  return { image: parse(image) , buttons: transformedButtons, textInput: inputText };
};

export const GET = handleRequest;
export const POST = handleRequest;

// //sample Frame
