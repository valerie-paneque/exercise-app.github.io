import './App.css';
import {useCallback, useState} from 'react'
import  DurationExercise  from './components/DurationExercise';
import RunningExercise from './components/runningExercise';
// stopwatch.js is imported to durationexercise.js

const MENU_SCREEN = "menu"
const EXERCISE_SCREEN = "exercise"
const DURATION_EXERCISE = "duration"
const REPETITION_EXERCISE = "repetition"
const RUNNING_EXERCISE = "running"

// repetition function 
function RepetitionExercise({exercise, setMenuScreen}) {
  let [count, setCount] = useState(0)
  return <div>
    <p>{exercise.name}</p>
    <p style={{fontSize:"5em"}}>{count}</p>
    <button style={{fontSize:"2em"}}
      onClick={() => setCount(count=>count+1)}>Reps</button>
    <button style={{fontSize:"2em"}}
      onClick={() => setCount(0)}>Reset</button><br/>
      <button style={{fontSize:"1em"}} onClick={setMenuScreen}>Return to Menu</button>
  </div>
}

let exerciseList = [
  {type: DURATION_EXERCISE, name: "Jumping Jacks"},
  {type: DURATION_EXERCISE, name: "Planking"},
  {type: DURATION_EXERCISE, name: "Swimming"},
  {type: REPETITION_EXERCISE, name: "Push Ups"},
  {type: RUNNING_EXERCISE, name: "Running Exercise"}
]

// screen component is assigned a menu component 
// useState changes value
//variables to display whatever component i want to display// menu screen is default
function App() {
  let [currentScreen, setCurrentScreen] = useState(MENU_SCREEN)
  // (MENU_SCREEN)
  let [currentExercise, setCurrentExercise] = useState({})
  // ({})
  let screenComponent = undefined
  let buttonClick = useCallback((exercise) => {
    setCurrentExercise(exercise)
    setCurrentScreen(EXERCISE_SCREEN)
  }, [])

  //click button to go to new screen 
  //unordered list for exercises buttons
  //use map function to recieve type and name from array
  //use object that has currentExercise .name  
  if(currentScreen === MENU_SCREEN) {
    screenComponent = <div>
    <p>Exercise Menu</p>
   <ul> 
    
    {exerciseList.map((exercise)=> {
      //assign key for exercise
      return <li key={exercise.name}>
        <button onClick={()=> buttonClick(exercise)}> {exercise.name} </button>  
      </li> 
    })}
    </ul>
  </div> 

  // duration exercise takes user to stopwatch
  //setCurrentScreen to menu screen for back buttons
  //passes in exercise object into duration exercise through the attribute exercise 
  } else if (currentScreen === EXERCISE_SCREEN) {
    //switch statement to compare one value to 3 or more values
    // compare type to duration exercise, if type = duration then : execute code 
    switch(currentExercise.type) {
      case DURATION_EXERCISE :
        screenComponent = <DurationExercise 
        exercise = {currentExercise}
    setMenuScreen={()=>setCurrentScreen(MENU_SCREEN)}
  /> 
  break;  //do not execute anymore code

      case REPETITION_EXERCISE :
        screenComponent = <RepetitionExercise 
        exercise = {currentExercise}
    setMenuScreen={()=>setCurrentScreen(MENU_SCREEN)}
  /> 
  break;

      case RUNNING_EXERCISE :
       screenComponent = (
       <RunningExercise 
        exercise = {currentExercise}
    setMenuScreen={()=>setCurrentScreen(MENU_SCREEN)}
  /> );
  break;  
  default: //required incase nothing happens
  screenComponent = undefined
    }
  }

  return (
    <div className="App">
      <header className='App-header'>
        {screenComponent} 
      </header>
      </div>
  );
}

export default App;
