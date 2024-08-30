import { useEffect, useState } from 'react'




function Line({currentGuess , guessChars  , i  , guesses , solution , CURRENT_ROW}) {



    return (
      <div className='line'>
      {
      guessChars.map((_ , index) => 
        {
    
          const isLine = CURRENT_ROW == i + 1
          const isGuess = guesses[i] 
          
          
          const handleClasss = ()=> {
          if (isGuess){
            if( guesses[i].at(index) == solution[0].at(index) ){
               return "tile correct"
            }else if (solution[0].includes(guesses[i].at(index))){
               return "tile misplaced"
            }else {
              
    
               return "tile wrong"
               
            }
            
          }else{
            return"tile"
          }
    
        }
    
    
    
    
          
    
          return ( <div key={index} className={handleClasss()} > { isGuess? guesses[i].at(index) : isLine ? currentGuess[index] : null}</div>)
        })
      }
      </div>
    )
    
    }
    export default Line