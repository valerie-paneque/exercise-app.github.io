import StopWatch from "./stopWatch"

export default function DurationExercise({exercise, setMenuScreen}) {
    let {name} = exercise
    return <div>
        <p>{name}</p>
        <StopWatch/>
        <button onClick={setMenuScreen}>Back to menu</button>
    </div>
}
