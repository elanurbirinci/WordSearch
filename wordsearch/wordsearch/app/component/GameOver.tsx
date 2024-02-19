import React, { useContext } from "react";
import { AppContext } from "../page";

function GameOver() {
  const {gameOver,currAttempt,correctWord} = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord // kelimenin dğru veya yanlış olması durumu için başlık yazıldı
          ? "Kelimeyi Doğru Tahmin Ettiniz"
          : "Kelimeyi Tahmin Edemediniz"}
      </h3>
      <h1>Doğru kelime: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>{currAttempt.attempt} denemede tahmin ettin</h3>
      )}
    </div>
  );
}

export default GameOver;