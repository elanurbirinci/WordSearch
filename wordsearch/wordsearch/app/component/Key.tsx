import React, {useContext} from 'react'
import { AppContext } from "../page";

// Key bileşenine geçirilen özelliklerin tipini belirten interface.
interface KeyProps {
    keyVal: string;
    bigKey?:boolean;
    disabled?: boolean;
  }

function Key({ keyVal, bigKey, disabled}: KeyProps) {
  // AppContext'ten gelen değerlere erişim için useContext kullanılır.
    const {board, setBoard, currAttempt, setCurrAttempt, onDelete, onSelectLetter, onEnter } = useContext(AppContext)
    const selectLetter= () => {
            if(keyVal === "ENTER"){
                onEnter()
            }else if(keyVal === "DELETE"){
                onDelete()

            }else{
                onSelectLetter(keyVal)
        if(currAttempt.letter>4) return; // Harfi tahtaya eklemek için kontrol ve güncelleme işlemleri yapılır.
        const newBoard = [...board]
        newBoard[currAttempt.attempt][currAttempt.letter]=keyVal
        setBoard(newBoard)
        setCurrAttempt({...currAttempt, letter: currAttempt.letter+1})
    }
    }
  return (
    <div className='key' id={bigKey ? "big" : disabled ? "disabled" : undefined} onClick={selectLetter}>{keyVal}</div>

  )
}

export default Key