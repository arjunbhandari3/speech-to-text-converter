import { useState } from "react";
import TextToSpeech from "./textToSpeech/textToSpeech";
import SpeechToText from "./speechToText/speechToText";

const SpeechWrapper = () => {
  const [mode, setMode] = useState(null);

  if (!mode) {
    return (
      <div className="container">
        <h2>Welcome</h2>
        <br />
        <p>Please select one:</p>

        <div className="d-flex">
          <button onClick={() => setMode("speechToText")}>
            Speech To Text
          </button>

          <button className="ml-2" onClick={() => setMode("textToSpeech")}>
            Text To Speech
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={() => setMode(null)}>Back</button>
      {mode === "textToSpeech" ? <TextToSpeech /> : <SpeechToText />}
    </div>
  );
};

export default SpeechWrapper;
