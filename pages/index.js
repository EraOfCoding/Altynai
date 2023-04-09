import { useState } from "react"

import { CopyBlock, dracula } from "react-code-blocks";

export default function Home() {
  const [input, setInput] = useState('');
  const [text, setText] = useState('')
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    console.log(text)

    const response = await fetch("/api/generate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: text,
      }),
    }).then((response) => response.json());
    setLoading(false);
    
    const responseBody = await response.text.content;
    setOutput(responseBody);
  };

  const changeInput = (e) => {
    setInput(e.target.value)
    setText(`Write an HTML/CSS code for animating ${e.target.value} in a single file using <style> tag.`)
  }

  return (
      <div className="home">
        <h1 className="title">AltynAI.css</h1>
        <p className="description">AI has a controll over this site 👀</p>
        <div className="prompt-box">
          <h2>Draw an animated: </h2>   
          <input className="input" typeof="text" placeholder="Circling box " value={input} onChange={changeInput} />
        </div>
        <button className="button" onClick={callApi}>{loading ? "Loading..." : "Send"}</button>
        <div className="area-box">
          <div className="area" dangerouslySetInnerHTML={{__html: trimString(output, "<!DOCTYPE", "</html>")}} />
        </div>
          <div className={`${loading ? "loading" : "none"}`}/>
        <div className="chat-code">
          <CopyBlock
            language={'html'}
            text={output}
            showLineNumbers={42}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      </div>
  );
}

function trimString(inputStr, startWord, endWord) {
  const startIndex = inputStr?.indexOf(startWord);
  if (startIndex === -1) {
    return inputStr;
  }
  const endIndex = inputStr?.indexOf(endWord, startIndex + startWord.length);
  if (endIndex === -1) {
    return inputStr;
  }
  return inputStr?.substring(startIndex, endIndex + endWord.length);
}
