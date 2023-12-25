import useSpeechToText from "./useSpeechToText";
import useClipboard from "../../hooks/useClipboard";

const SpeechToText = () => {
  const { transcribeText, speechRecognizing, toggleSpeechRecognition } =
    useSpeechToText();

  const { copy, isCopied } = useClipboard();

  const copyText = () => {
    copy(transcribeText);
  };

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <br />

      <div className="main-content">{transcribeText}</div>

      <div className="d-flex">
        <button onClick={copyText}>
          {isCopied ? "Copied!" : "Copy to clipboard"}
        </button>
        <button onClick={toggleSpeechRecognition}>
          {speechRecognizing ? "Stop" : "Start"} Listening
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
