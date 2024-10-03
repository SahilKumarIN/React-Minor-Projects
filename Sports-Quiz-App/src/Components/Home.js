import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Home() {

  const api = "https://the-trivia-api.com/v2/questions";

  const [question, setQuestion] = useState();
  const [option, setOption] = useState(new Array(4));
  const [checkedValue, setcheckedValue] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [marks, setMarks] = useState(0);
  const [totalques, setTotalques] = useState(0);
  const [testEnd, settestEnd] = useState(false);

  async function apiCall() {
    setcheckedValue("");
    const resp = await fetch(api);
    const data = await resp.json();
    // console.log(data);
    const main = data[0].question;
    // console.log(main);
    setQuestion(main.text);
    setTotalques(totalques + 1);
    // console.log(question);
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        option[i] = data[0].correctAnswer;
        setCorrectOption(data[0].correctAnswer)
      }
      else {
        option[i] = data[0].incorrectAnswers[i - 1];
      }
    }
    // console.log(option);
    // correctOption = option[0];
    shuffleArray(option);
    // console.log(option);
    // console.log(correctOption);
  }

  function shuffleArray(arr) {
    let currentIndex = arr.length;

    while (currentIndex !== 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
  }

  function check(val) {
    return (val === checkedValue);
  }

  function checkAnswer(opt) {
    // console.log(correctOption);
    // console.log(opt);
    if (!checkedValue) {
      setcheckedValue(opt)
      if (correctOption == opt) {
        setMarks(marks + 1);
        toast.success("Correct Answer");
        return true;
      }
    }
    toast.error("Wrong Answer");
    return false;
  }


  return (
    <>
      <div className='head'>{!testEnd ?
        <div className='main'>
          <h1>Welcome To Quiz Game</h1>
          {/* {console.log(marks, correctOption)} */}
          {!question ?
            <button onClick={apiCall}>Start The Game</button> :
            <div className='question'>
              <p>{question}</p>
              <form action="/">
                <span>
                  <input checked={check(option[0])} onChange={() => !checkedValue ? checkAnswer(option[0]) : ""} type="radio" id="option1" name="name" value={option[0]} />
                  <label htmlFor="option1">{option[0]}</label>
                </span>
                <span>
                  <input checked={check(option[1])} onChange={() => !checkedValue ? checkAnswer(option[1]) : ""} type="radio" id="option2" name="name" value={option[1]} />
                  <label htmlFor="option2">{option[1]}</label>
                </span>
                <span>
                  <input checked={check(option[2])} onChange={() => !checkedValue ? checkAnswer(option[2]) : ""} type="radio" id="option3" name="name" value={option[2]} />
                  <label htmlFor="option3">{option[2]}</label>
                </span>
                <span>
                  <input checked={check(option[3])} onChange={() => !checkedValue ? checkAnswer(option[3]) : ""} type="radio" id="option4" name="name" value={option[3]} />
                  <label htmlFor="option4">{option[3]}</label>
                </span>
              </form>
              <div className='btns'>
                <button onClick={apiCall}>Next</button>
                <button onClick={() => settestEnd(true)}>End Test</button>
              </div>
            </div>}
        </div> : <>
            <h1 className='over'>Game Over Your marks is {marks} out of {totalques}</h1>
          <div>
            <button className='btnslast' onClick={() => { window.location.reload() }}>Start Again</button>
          </div>
        </>}
      </div>
    </>
  )
}
