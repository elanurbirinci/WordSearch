
"use client"
import React, {useState, createContext, useEffect} from 'react'
import Board from './component/Board';
import { boardDefault, generateWordSet  } from './word'
import Keyboard from './component/Keyboard';
import GameOver from "./component/GameOver";

// Uygulama bağlamını tanımlayan tür ve özellikler.
interface AppContextProps {
  board: any[][]; 
  setBoard: React.Dispatch<React.SetStateAction<any[][]>>;
  currAttempt: { attempt: number; letter: number };
  setCurrAttempt: React.Dispatch<React.SetStateAction<{ attempt: number; letter: number }>>;
  correctWord: string;
  onSelectLetter: (keyVal: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  setDisabledLetters: React.Dispatch<React.SetStateAction<any[]>>;  
  disabledLetters: any[]; 
  gameOver: {
    gameOver: boolean;
    guessedWord: boolean;
  };
  setGameOver: React.Dispatch<React.SetStateAction<{ gameOver: boolean; guessedWord: boolean }>>;
}

// Uygulama bağlamı oluşturulur ve varsayılan değerler atanır.
export const AppContext = createContext<AppContextProps>({
  board: [[]],  
  setBoard: () => {},
  currAttempt: {
    attempt: 0,
    letter: 0
  },
  setCurrAttempt: (value: React.SetStateAction<{ attempt: number; letter: number }>) => {},
  correctWord: '',
  onSelectLetter: (keyVal: string) => {},  
  onDelete: () => {}, 
  onEnter: () => {},
  setDisabledLetters: () => [], 
  disabledLetters: [],
  gameOver: { gameOver: false, guessedWord: false },
  setGameOver: (value: React.SetStateAction<{ gameOver: boolean; guessedWord: boolean }>) => {},
});
// Ana uygulama bileşeni
export default function App(){
  // Durum değişkenleri tanımlanır
  const [board, setBoard] = useState(boardDefault)
  const[currAttempt, setCurrAttempt]= useState({ attempt:0, letter:0});
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [disabledLetters, setDisabledLetters] = useState<any[]>([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
// Komponentin oluşturulması sırasında bir kelime seti oluşturulur ve rastgele bir kelime seçilir.
  useEffect(() => {
    generateWordSet().then((words) => {
      if (words && words.wordSet) {
        setWordSet(words.wordSet);
        const randomIndex = Math.floor(Math.random() * words.wordSet.size);
        const randomWord = Array.from(words.wordSet)[randomIndex];
        setCorrectWord(randomWord);
      } else {
        console.error("hata");
      }
    })
  }, []);
  
  
// Harf seçme, silme ve kelimeyi kontrol etme fonksiyonları tanımlanır
  const onSelectLetter = (keyVal:string) =>{
    if(currAttempt.letter>4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letter]=keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letter: currAttempt.letter+1})

  }

  const onDelete =() => {
    if(currAttempt.letter ===0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letter-1]=""
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letter: currAttempt.letter - 1})
                

  }
  const onEnter = () => {
    if(currAttempt.letter !==5) return;
    let currWord ="";
    for(let i=0; i<5; i++) {
      currWord +=board[currAttempt.attempt][i];
    }

    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({attempt: currAttempt.attempt +1 , letter:0});
    }else{
      alert("Kelime Bulunamadı.Lütfen başka bir kelime deneyin!")
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
  
    if (currAttempt.attempt + 1 === 6) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
   
  }
  return(
    <div className="App">
      <nav>
        <h1>Kelime Bulmaca</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter,correctWord,setDisabledLetters,disabledLetters,setGameOver,gameOver}}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}