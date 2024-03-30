import { useState } from "react";
import { Frame } from "frames.js";

type FrameRenderProps = {
  isLoggedIn: boolean;
  frame: Frame;
  submitOption: (args: { buttonIndex: number; inputText?: string }) => Promise<void>;
};

function FrameRender({ frame, submitOption, isLoggedIn }: FrameRenderProps) {
  const [inputText, setInputText] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <div>
      {/* <button onClick={() => setIsWaiting(false)} className="absolute top-2 right-1 text-gray-500 hover:text-gray-600 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button> */}
      <img
        src={frame.image}
        alt="Description of the image"
        style={{
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%", // Set the width to 100%
          height: "40vh", // Maintain aspect ratio
        }}
      />
      {frame.inputText && (
        <input
          className="w-full p-2 border mt-1 border-gray-400 rounded bg-white" // Set background color to white
          type="text"
          placeholder={frame.inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "4px",
          gap: "4px",
        }}
      >
        {frame.buttons?.map(({ label, action, target }, index: number) => (
          <button
            type="button"
            disabled={isWaiting}
            className={`bg-gray-200 p-2 hover:bg-gray-300 ${
              isWaiting ? "bg-gray-100 hover:bg-gray-100" : ""
            } border-gray-400 border text-sm text-gray-800 rounded`}
            style={{
              flex: "1 1 0px",
              cursor: isWaiting ? undefined : "pointer",
            }}
            onClick={async () => {
              if (!isLoggedIn) {
                alert("Choose an fid to impersonate or Sign in (costs warps) to use the frame buttons");
                return;
              }
              if (action === "link") {
                if (window.confirm("You are about to be redirected to " + target!)) {
                  window.location.href = target!;
                }
              } else if (action === "mint") {
                alert(`Requested to mint NFT: ${target}`);
              } else {
                setIsWaiting(true);
                try {
                  await submitOption({
                    buttonIndex: index + 1,
                    inputText: frame.inputText !== undefined ? inputText : undefined,
                  });
                } catch (err) {
                  alert("error: check the console");
                  console.error(err);
                }
                setIsWaiting(false);
              }
            }}
            key={index}
          >
            {action === "mint" ? `♦ ` : ""}
            {label}
            {action === "post_redirect" || action === "link" ? ` ↗` : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FrameRender;
