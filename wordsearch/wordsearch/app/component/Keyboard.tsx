import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../page";

function Keyboard() {
  // AppContext'ten gelen değerlere erişim için useContext kullanılır.
  const {onEnter,onDelete,onSelectLetter, disabledLetters} = useContext(AppContext)
  // Klavye tuşlarının grupları tanımlanır.
  const keys1= ["Q","W","E","R","T","Y","U","I","O","P","Ğ","Ü"];
  const keys2= ["A","S","D","F","G","H","J","K","L","Ş","İ"];
  const keys3= ["Z","X","C","V","B","N","M","Ö","Ç"];
// Klavye olaylarına tepki veren fonksiyon. useCallback ile performans iyileştirmesi sağlanır.
  const handleKeyboard = useCallback((event:any) => {
    if(event.key === "Enter"){
      onEnter()// Enter tuşuna basıldığında onEnter fonksiyonu çağrılır.
    }else if (event.key === "Backspace"){
      onDelete() // Backspace tuşuna basıldığında onDelete fonksiyonu çağrılır.
    }else {
      // Klavye tuşlarına basıldığında, onSelectLetter fonksiyonu çağrılır.
      keys1.forEach((key) => {
        if(event.key.toLowerCase() ===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
      keys2.forEach((key) => {
        if(event.key.toLowerCase() ===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
      keys3.forEach((key) => {
        if(event.key.toLowerCase() ===key.toLowerCase()){
          onSelectLetter(key)
        }
      })
      if (event.key.toLowerCase() === "ı") {
        onSelectLetter("I");
      }
    }

  },[[onEnter, onDelete, onSelectLetter, keys1, keys2, keys3]])

// useEffect kullanarak komponentin oluşturulması ve temizlenmesi sırasında klavye olaylarına tepki verilir.
  useEffect(()=> {
    document.addEventListener("keydown",handleKeyboard)
    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }

  }, [handleKeyboard])
// JSX içinde klavye tuşlarını render eden kısım.
  return (
    <div className="keyboard" onKeyDown={handleKeyboard} >
      <div className="line1">
        {keys1.map((key) => {
      return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>;
      })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
      return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>;
      })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey={true}></Key>
        {keys3.map((key) => {
      return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>;
      })}
      <Key keyVal={"DELETE"} bigKey={true}></Key>
      </div>
      </div>
  )
}

export default Keyboard