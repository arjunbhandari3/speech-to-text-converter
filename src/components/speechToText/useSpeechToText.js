import { useEffect, useState } from "react";

const useSpeechToText = () => {
  const [transcribeText, setTranscribeText] = useState(null);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [speechRecognizing, setSpeechRecognizing] = useState(false);

  const createSpeechRecognition = () => {
    if (
      !("SpeechRecognition" in window) &&
      !("webkitSpeechRecognition" in window)
    ) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition =
      "SpeechRecognition" in window
        ? new window.SpeechRecognition()
        : new window.webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setSpeechRecognizing(true);
    };

    recognition.onresult = (event) => {
      const result = event?.results?.[event?.resultIndex]?.[0]?.transcript;
      setTranscribeText(result);
    };

    recognition.onerror = (event) => {
      if (event?.error === "network") {
        alert("Speech recognition is not supported in this browser");
      } else if (event?.error === "audio-capture") {
        alert("Microphone is not available or does not have permissions.");
      } else {
        alert("Error occurred during speech recognition.");
      }

      setSpeechRecognizing(false);
      if (recognition) {
        recognition.stop();
      }
    };

    recognition.onend = () => {
      recognition.stop();
      setSpeechRecognizing(false);
      setSpeechRecognition(null);
    };

    return recognition;
  };

  const toggleSpeechRecognition = () => {
    if (!speechRecognition) {
      const recognition = createSpeechRecognition();
      if (recognition) {
        setSpeechRecognition(recognition);
        recognition.start();
      }
    } else {
      speechRecognition.stop();
      setSpeechRecognizing(false);
      setSpeechRecognition(null);
    }
  };

  useEffect(() => {
    return () => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
      setSpeechRecognizing(false);
      setSpeechRecognition(null);
    };
  }, [speechRecognition]);

  return {
    transcribeText,
    speechRecognizing,
    speechRecognition,
    toggleSpeechRecognition,
  };
};

export default useSpeechToText;
