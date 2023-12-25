import { useState } from "react";

const useClipboard = ({ timeout = 2000 } = {}) => {
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState(null);

  const handleCopyResult = (value) => {
    clearTimeout(copyTimeout);
    setCopyTimeout(setTimeout(() => setIsCopied(false), timeout));
    setIsCopied(value);
  };

  const copy = (valueToCopy) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err));
    } else {
      setError(new Error("useClipboard: navigator.clipboard is not supported"));
    }
  };

  const reset = () => {
    setIsCopied(false);
    setError(null);
    clearTimeout(copyTimeout);
  };

  return {
    copy,
    reset,
    error,
    isCopied,
  };
};

export default useClipboard;
