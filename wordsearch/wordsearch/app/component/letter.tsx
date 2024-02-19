import React, { useContext, useEffect} from "react";
import { AppContext } from "../page";

interface LetterProps {
  letterPos: number;
  attemptVal: number;
}

function Letter({letterPos, attemptVal}:LetterProps) {
  const {board, correctWord, currAttempt,setDisabledLetters} = useContext(AppContext)//board kımından bilgiler çekildi
  const letter = board[attemptVal][letterPos]//harfin konumu ve değeri alındı
  
  const correct = correctWord.toUpperCase()[letterPos] === letter
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter)
  const letterState: string | false = currAttempt.attempt > attemptVal && //harfin durumu belirlendi
      (correct ? "correct" : almost ? "almost" : "error");//Harfin doğruluğunu kontrol etmek

  useEffect(() =>{
    if(letter !== "" && !correct && !almost){
      setDisabledLetters((prev) => ([...prev, letter]));//girilen harf yanlış ise harfi devre dışı bıraktırır

    }
  }, [currAttempt.attempt])

  return (
  <div className="letter" id={letterState ? letterState.toString() : undefined}>
  {" "}
  {letter}
  </div>
)
}

export default Letter