import { createContext } from "react";
import runChat from "../Config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPromt, setrecentPromt] = useState("");
  const [prevPromts, setprevPromts] = useState("");
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delaypara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newchat = () => {
    setloading(false);
    setshowResult(false);
  };

  const onsent = async (prompt) => {
    setresultData("");
    setloading(true);
    setshowResult(true);
    let response;

    if (prompt !== undefined) {
      response = await runChat(prompt);
      setrecentPromt(prompt);
    } else {
      setprevPromts((prev) => [...prev, input]);
      setrecentPromt(input);
      response = await runChat(input);
    }

    let responseArray = response.split("**");
    let newResponse = " ";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delaypara(i, nextWord + " ");
    }

    setresultData(newResponse2);
    setloading(false);
    setinput("");
  };
  const contextValue = {
    prevPromts,
    setprevPromts,
    onsent,
    setrecentPromt,
    recentPromt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
    newchat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
