import { useEffect, useState } from 'react'
import Line from './Line'
import texture from './assets/batthern-1920x1080.png'


const API_URL = "https://random-word-api.vercel.app/api?words=1&length=6"
let CURRENT_ROW = 1




function App() {



  const [solution , setSolution] = useState('')
  const [guesses , setGuesses] = useState(Array(6).fill(null))
  const [guessChars , setGuessChars] = useState(Array(6).fill(null))
  const [currentGuess , setCurrentGuess] = useState('')
  const [isGameOver , setIsGameOver] = useState(false)
  const [gameState , setGameState] = useState("Guess The Word!")
 

  useEffect( ()=> {
    
  const fetchData = async () => {
    const response = await fetch(API_URL)
    const data = await response.json()
    
    setSolution(data)
    
  }
  
  fetchData() 
  
  
   } , [])

  
  
  
  
 useEffect( () => { 
  if (CURRENT_ROW >= 7) {
    setGameState("You Lost! Refresh to start again.")
    setIsGameOver(true)
    return
  }

const handleType = (value) => {
  const key = value.key

 
if (!isGameOver){
  

  if (key == 'Backspace') {
    let newCurrentGuess
     newCurrentGuess = currentGuess.substring(0, currentGuess.length - 1)
    setCurrentGuess(newCurrentGuess)
    
  }
  if (key == 'Enter' && currentGuess.length === 6) {

    let newCurrentGuess
    newCurrentGuess = [...guesses]
    newCurrentGuess[guesses.findIndex(val => val == null)] = currentGuess
    setGuesses(newCurrentGuess)
    if (currentGuess == solution[0]){
      setIsGameOver(true)
      setGameState("Congratulation! You Guessed it Correctly.")
    }else(
      setCurrentGuess(''),
      CURRENT_ROW ++ ,
      setGameState("Try Another Guess!")
    )
  


  }
 

if ( key.length != 1 || !key.match(/[a-z]/i) ) {
return  
}


if (currentGuess.length === 6 || CURRENT_ROW >= 7){
  return
}


  setCurrentGuess(currentGuess + key)
  
      const newGuess = [...guessChars]
      newGuess[guessChars.findIndex(val => val == null)] = key
      setGuessChars(newGuess)
      
      

}}






window.addEventListener("keydown" , handleType)


return () =>  window.removeEventListener("keydown" , handleType)

  } , [currentGuess , guessChars, CURRENT_ROW ])





  return (
    <>
    <img src={texture} alt="" />
 <h1>Wordle!</h1>
<div className='board'>
{guesses.map((guess , i) => <Line CURRENT_ROW = {CURRENT_ROW} key={i} i = {i} solution = {solution} guess = {guess} currentGuess = {currentGuess} guesses = {guesses} guessChars = {guessChars} setGuessChars = {setGuessChars} />  )} 
</div>
{gameState}
<div>{ isGameOver? "The Solution Was "+ solution : null}</div>
</>

  )
}



export default App




