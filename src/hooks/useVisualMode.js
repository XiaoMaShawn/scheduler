import { useState } from 'react';

const useVisualMode = (initialMode) => {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode])

  const transition = (newMode, replace = false) => {

    if (!replace) {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode])
    } else {
      setMode(newMode);
      //spread injects the values into array
      //no spread will inject array into array
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    }
  };

  const back = () => {

    if (history.length > 1) {
      const preHistory = history.slice(0, -1);
      setHistory(preHistory);
      setMode(preHistory[preHistory.length - 1])
    }
  };

  return ({ mode, transition, back });
};

export default useVisualMode;