"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandRock,
  faHandScissors,
  faHandPaper,
  faStar,
  faLaugh,
  faFaceSadTear,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

export default function Game() {
  const [compScore, setCompScore] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);
  const [playerValue, setPlayerValue] = useState(null);
  const [compValue, setCompValue] = useState(null);
  const [gameCount, setGameCount] = useState(0);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const point = (key, color) => {
    return (
      <FontAwesomeIcon
        className="star-icon"
        key={key}
        color={color}
        icon={faStar}
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

    const choices = ["ROCK", "PAPER", "SCISSORS"];
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    const val = logic(playerChoice, compChoice);

    if (val === 1) {
      setPlayerScore([...playerScore, point(playerScore.length, "aqua")]);
      setPlayerValue(playerChoice);
      setCompValue(compValue);
      setCompValue(compChoice);
    } else if (val === -1) {
      setCompScore([...compScore, point(compScore.length, "yellow")]);
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

    playerResult > compResult
      ? setResult(
          <>
            You won the game!!{" "}
            <FontAwesomeIcon className="result-icon" icon={faLaugh} />
          </>
        )
      : playerResult < compResult
      ? setResult(
          <>
            You lost the game!{" "}
            <FontAwesomeIcon className="result-icon" icon={faFaceSadTear} />
          </>
        )
      : setResult(
          <>
            It's a tie!!{" "}
            <FontAwesomeIcon className="result-icon" icon={faHandshake} />
          </>
        );

    setShowModal(true);
    resetValues();
  };

  const resetValues = () => {
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
        {showModal ? (
          <>
            <h2>{result}</h2>
            <button onClick={() => setShowModal(false)}>Play again!</button>
          </>
        ) : (
          <>
            <p>Your choice: {playerValue}</p>
            <p>Computer's choice: {compValue}</p>
            <h2>Your Score: {playerScore}</h2>
            <h2>Computer Score: {compScore}</h2>
          </>
        )}
      </div>
    </div>
  );
}
