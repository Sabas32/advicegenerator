import "./App.css";
import patterndividerdesktop from "./images/pattern-divider-desktop.svg";
import patterndividermobile from "./images/pattern-divider-mobile.svg";
import diceIcon from "./images/icon-dice.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tilt } from "react-tilt";

function App() {
  const [adviceText, setadviceText] = useState("good");
  const [adviceId, setadviceId] = useState("");
  const [dataFetched, setdataFetched] = useState(true);
  const speech = new SpeechSynthesisUtterance();
  speech.rate = 0.9;
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        setdataFetched(false);
        setadviceText("Click the green button bellow To to get advice");
        setadviceId("");
      });
  }, []);





  speech.onstart = function() {
    setDisabled(true);
    
};

// Event listener for when speech ends
speech.onend = function() {
  setDisabled(false);
    
};
  function changeAdvice() {
    if (window.speechSynthesis.speaking) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        setdataFetched(false);
        setadviceText(data.slip.advice);
        setadviceId(data.slip.id);
        speech.text = `Advice ${data.slip.id}. ' ', ${data.slip.advice}`;
        window.speechSynthesis.speak(speech);
      });
    setdataFetched(true);
  }


  const defaultOptions = {
    reverse:        false,  // reverse the tilt direction
    max:            35,     // max tilt rotation (degrees)
    perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:          1,    // 2 = 200%, 1.5 = 150%, etc..
    speed:          1000,   // Speed of the enter/exit transition
    transition:     true,   // Set a transition on enter/exit.
    axis:           null,   // What axis should be disabled. Can be X or Y.
    reset:          true,    // If the tilt effect has to be reset on exit.
    easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  }
  
  return (
    <div className="App">
      <p className="header">This was created by <br />Masaba ian Samuel(Ian rush)</p>
      <Tilt options={defaultOptions} style={{ height: 'max-height', width: 'max-width' }}>
      <div className="advice">
        
        <p>ADVICE {adviceId}</p>

        <p>
          {dataFetched ? "Loading..." : `"${adviceText}"`}
          {/* “It is easy to sit up and take notice, what’s difficult is getting up
          and taking action.” */}
        </p>

        <div className="divider">
          <img className="forPc" src={patterndividerdesktop} alt="" />
          <img className="forAndroid" src={patterndividermobile} alt="" />
        </div>

        {disabled ? (
          <span  className="dice diabled">
          <img src={diceIcon} alt="" />
        </span>
        ) : (
          <span onClick={changeAdvice} className="dice">
            <img src={diceIcon} alt="" />
          </span>
        )}
      </div>
      
    </Tilt>
    </div>
  );
}

export default App;
