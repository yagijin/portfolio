import React , { useState, useEffect, useRef } from "react";
import './Cmd.css';
import content from '../assets/content.json';
import OldCommands from "./OldCommands";
import SL from "./SL";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

export default function Cmd() {

  const [input, setInput] = useState("");
  const [history, setHistory] = useState("");
  const [commands, setCommands] = useState([]);
  const [stateSL, setStateSL] = useState(0);

  const refStateSL = useRef(stateSL);

  useEffect(() => {
    refStateSL.current = stateSL;
  }, [stateSL]);

  function keyPress(e) {
    let judgeCommand = false;
    
    if(e.key === "ArrowUp" || e.key === "ArrowDown"){
      if(history.length>2){
        setInput(history.slice(2));
      }
    }else if(e.key === "Enter"){
      for(let i=0;i<content.length;i++){
        let commandsWithArgs = input.split([" "]);
        
        if(commandsWithArgs[0]===""){
          judgeCommand = true;
          break;
        }else if(commandsWithArgs.length > 2 && (commandsWithArgs[0] === content[i].command)){
          judgeCommand = true;
          setHistory("$ " + input);
          setCommands(["too many arguments."]);

        }else if(commandsWithArgs.length < 2 && (commandsWithArgs[0] === content[i].command)){
          judgeCommand = true;
          setHistory("$ " + input);
          setCommands(content[i].body[0].text);

          switch(content[i].command){
            case "github":
            case "github.app":
              window.open('https://github.com/yagijin');
              break;
            case "portfolio":
            case "portfolio.app":
              window.open('https://portfolio.yagijin.com/#/profile');
              break;
            case "products":
            case "products.app":
              window.open('https://portfolio.yagijin.com/#/products');
              break;
            case "sl":
              const doSL = setInterval(() => { 
                setStateSL(refStateSL.current+1);
                if(refStateSL.current>120){
                  clearInterval(doSL);
                  setStateSL(0);
                }
               }, 20);
              break;
            default:
          }
          break;
        }else if(commandsWithArgs[0] === content[i].command){
          judgeCommand = true;
          for(let j=0;j<content[i].body.length;j++){
            if(commandsWithArgs[1]===content[i].body[j].argument){
              setHistory("$ " + input);
              setCommands(content[i].body[j].text);
              break;
            }else{
              setHistory("$ " + input);
              setCommands(["incorrect argument."]);
            }
          }
          break;
        }
      }
      if(!judgeCommand){
        setHistory("$ " + input);
        setCommands(["command not found."]);
      }
      setInput("");
    };
  }

  function toPortfolio() {
    window.open("https://portfolio.yagijin.com/#/profile");
  }
  function consoleClicked() {
    document.getElementById("inputCommand").focus();
  }

  return (
    <div className="background">
      <div className="portfolio-box">
        <button className="portfolio-button" onClick={() => toPortfolio()}><FontAwesomeIcon size="lg" icon={faAngleDoubleRight}/> 通常のポートフォリオは<br/>こちらから</button>
      </div>
      <div className='cmd-background'>
          <div className="cmd-console" onClick={() => consoleClicked()}>
            <div className="cmd-header">
              <div className="cmd-circle1"></div>
              <div className="cmd-circle2"></div>
              <div className="cmd-circle3"></div>
              <div className="cmd-title">
                yagijin -- portfolio
              </div>
            </div>
            <div className="cmd-welcome">Welcome to Yagijin's Portfolio!! Type "<span className="cmd-help">help</span>" to show commands.</div>
            <OldCommands commands={commands} history={history}/>
            <SL do={stateSL}/>
            <div className="cmd-commandline">
              <div className="cmd-rootpath">
                $
              </div>
              <input type="text" id="inputCommand" value={input} autoFocus onChange={(e) => setInput(e.target.value)} className="cmd-command" onKeyDown={(e) => keyPress(e)} >
              </input>
            </div>
          </div>
      </div>
    </div>
  );
}