import { useState } from 'react';

const useVisualMode = (initialMode) => {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode])

  const transition = (newMode, replace = false) => {

    //you could never change state directly, when you use array.push/pop, you actually change the original array. use array.concat/slice will work.

    //this part works
    // const newHistory = history.concat(value)
    // setHistory(newHistory);

    //this part doesn't work
    // const newHistory = history.push(value);
    // setHistory(newHistory);

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