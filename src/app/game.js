"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandRock,
  faHandScissors,
  faHandPaper,
} from "@fortawesome/free-solid-svg-icons";

export default function Game() {
  const [compScore, setCompScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerValue, setPlayerValue] = useState(null);
  const [compValue, setCompValue] = useState(null);

  const logic = (playerValue, compValue) => {
    if (playerValue === compValue) {
      return 0;
    } else if (
      (playerValue == "ROCK" && compValue == "SCISSORS") ||
      (playerValue == "SCISSORS" && compValue == "PAPER") ||
      (playerValue == "PAPER" && compValue == "ROCKS")
    ) {
      return 1;
    } else {
      return -1;
    }
  };

  const decision = (playerChoice) => {
    const choices = ["ROCK", "PAPER", "SCISSORS"];
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    const val = logic(playerChoice, compChoice);
    if (val === 1) {
      setPlayerScore(playerScore + 1);
      setPlayerValue(playerChoice);
      setCompValue(compChoice);
    } else if (val === -1) {
      setCompScore(compScore + 1);
      setPlayerValue(playerChoice);
      setCompValue(compChoice);
    } else {
      setCompValue(compChoice);
      setPlayerValue(playerChoice);
    }
  };

  const resetResult = () => {
    setPlayerScore(0);
    setCompScore(0);
  };

  return (
    <div className="container">
      <h1 className="h1">Welcome to Rock, Paper, Scissors Game.</h1>
      <div>
        <button onClick={() => decision("ROCK")}>
          <FontAwesomeIcon icon={faHandRock}></FontAwesomeIcon>
        </button>
        <button onClick={() => decision("PAPER")}>
          <FontAwesomeIcon icon={faHandPaper}></FontAwesomeIcon>
        </button>
        <button onClick={() => decision("SCISSORS")}>
          <FontAwesomeIcon icon={faHandScissors}></FontAwesomeIcon>
        </button>
      </div>
      <div className="content">
        <p>Your choice: {playerValue}</p>
        <p>Computer's choice: {compValue}</p>
        <h2>Your Score:{playerScore}</h2>
        <h2>Computer Score: {compScore}</h2>
        <button onClick={() => resetResult()}>Reset</button>
      </div>
    </div>
  );
}
