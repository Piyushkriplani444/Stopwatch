import './App.css';
import { useState, useEffect } from 'react';


const Timer = (props) =>{
  return (
    <div>
      <span>{("0" + Math.floor(props.time/(1000*60))).slice(-2)}: </span>
      <span>{("0" + Math.floor((props.time % (1000 * 60)) / 1000)).slice(-2)}:</span>
      <span>{("0" + Math.floor((props.time/10)%100)).slice(-2)}</span>

    </div>

  )
};

const Lap  = ({laps}) =>{
  console.log("in lapssss")
  const calculateTimeDifference = (timeString1,timeString2) =>{
    const time1 = new Date(`1970-01-01T${timeString1}Z`); 
    const time2 = new Date(`1970-01-01T${timeString2}Z`); 
    const timeDiff = Math.abs(time2 - time1); 
    const hours = Math.floor(timeDiff / 3600000).toString().padStart(2, '0'); 
    const minutes = Math.floor((timeDiff % 3600000) / 60000).toString().padStart(2, '0'); 
    const seconds = Math.floor((timeDiff % 60000) / 1000).toString().padStart(2, '0'); 
    const milliseconds = ((timeDiff % 1000) / 10).toString().padStart(2, '0'); 
    const resultString = `${hours}:${minutes}:${seconds}.${milliseconds}`; 
    return resultString; 
  }
   return (
    <div className='laps' >
      <h3><span>Lap </span><span>Time </span><span>Total Time </span></h3>
      <ul>
        {laps.map((lap, index)=>(
          <li key={index}>
            <span>{`Lap ${index +1}`}</span>
            <span>{calculateTimeDifference(lap, (index !==0) ? laps[index -1]: "00:00:00" )}</span>
            <span>{lap}</span>
          </li>
        ))}
      </ul>


    </div>
   )
}

function App() {
  const [time, setTime] = useState(0);
  const [isActive,setIsActive] = useState(false);
  const [isPaused,setIsPaused] = useState(false);
  const [laps,setLaps] = useState([]);
  
  useEffect(()=>{
    let timer = null;
    if(isActive && isPaused === false){
    
     timer = setInterval(()=>{
      setTime((time)=>time+10);
    },10);
  }else{
    clearInterval(timer)
  }
  return () =>{
  clearInterval(timer);
  }
  },[isActive,isPaused])

  const handleLap = () => { 
    const lapTime = 
       "00"+ 
        ":" + 
        ("0" + Math.floor(time/(1000*60))).slice(-2) + 
        ":" + 
        ("0" + Math.floor((time % (1000 * 60)) / 1000)).slice(-2) + 
        "." + 
        ("0" + Math.floor((time/10)%100)).slice(-2) 

    setLaps((prevLaps) => [...prevLaps, lapTime]); 
}; 
  return (
    <div className="container">
      <Timer time={time} />
      {isActive ?
             <>
             <button onClick={()=> {
            handleLap();
            }
              }>LAP</button>
             <button className='buttons' onClick={()=> { setIsActive(false); setIsPaused(true);}}>STOP</button>
             </>
             :
             isPaused ?
              <>
              <button className='buttons' onClick={()=> { setIsActive(false); setIsPaused(false); setTime(0); setLaps([]); }}>RESET</button> 
              <button className='buttons' onClick={()=> {setIsActive(true); setIsPaused(false) }}>RESUME</button>
              </> :
               <>
              <button className='buttons' onClick={()=> setIsActive(true)}>START</button>
              </>
                }
            <Lap laps={laps} />
       
             
    </div>
  );
}

export default App;
