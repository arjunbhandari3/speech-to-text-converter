import { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const toggleSpeak = () => {
    if (!isSpeaking && text !== "") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsSpeaking(false);
        synth.cancel();
      };

      synth.speak(utterance);
      setIsSpeaking(true);
    } else {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="container">
      <h2>Text to Speech Converter</h2>
      <br />

      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text to speak..."
        className="main-content"
        rows={4}
        cols={50}
      />

      <button onClick={toggleSpeak}>
        {isSpeaking ? "Stop Speaking" : "Start Speaking"}
      </button>
    </div>
  );
};

export default TextToSpeech;
