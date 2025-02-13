"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandRock,
  faHandScissors,
  faHandPaper,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

export default function Game() {
  const [compScore, setCompScore] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);
  const [playerValue, setPlayerValue] = useState(null);
  const [compValue, setCompValue] = useState(null);
  const [gameCount, setGameCount] = useState(0);
  const [winner, setWinner] = useState(null);

  const pointFlag = (key, color) => {
    return (
      <FontAwesomeIcon
        className="flag-icon"
        key={key}
        color={color}
        icon={faFlag}
        size="sm"
      ></FontAwesomeIcon>
    );
  };

  const logic = (playerValue, compValue) => {
    if (playerValue === compValue) {
      return 0;
    } else if (
      (playerValue == "ROCK" && compValue == "SCISSORS") ||
      (playerValue == "SCISSORS" && compValue == "PAPER") ||
      (playerValue == "PAPER" && compValue == "ROCK")
    ) {
      return 1;
    } else {
      return -1;
    }
  };

  const decision = (playerChoice) => {
    if (gameCount >= 5) {
      showResult();
      return;
    }
    setGameCount(gameCount + 1);
    console.log(`I am from game Count${gameCount}`);
    const choices = ["ROCK", "PAPER", "SCISSORS"];
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    const val = logic(playerChoice, compChoice);

    if (val === 1) {
      setPlayerScore([...playerScore, pointFlag(playerScore.length, "green")]);
      setPlayerValue(playerChoice);
      setCompValue(compValue);
      setCompValue(compChoice);
    } else if (val === -1) {
      setCompScore([...compScore, pointFlag(compScore.length, "yellow")]);
      setCompValue(compChoice);
      setPlayerScore(playerScore);
      setPlayerValue(playerChoice);
    } else {
      setCompValue(compChoice);
      setPlayerValue(playerChoice);
    }

    if (gameCount + 1 === 5) {
      setTimeout(() => showResult(), 500); // Delay to allow UI updates
    }
  };

  const showResult = () => {
    const playerResult = playerScore.length;
    const compResult = compScore.length;
    var resultMessage =
      playerResult > compResult
        ? "You won the game!!"
        : playerResult < compResult
        ? "You lost the game!"
        : "It's a tie!!";
    alert(resultMessage);
    resetResult();
  };

  const resetResult = () => {
    setPlayerScore([]);
    setCompScore([]);
    setPlayerValue(null);
    setCompValue(null);
    setGameCount(0);
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
        <h2>Your Score: {playerScore}</h2>
        <h2>Computer Score: {compScore}</h2>

        <button onClick={() => resetResult()}>Reset</button>
      </div>
    </div>
  );
}
