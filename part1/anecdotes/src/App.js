
import { useState } from 'react';
import './App.css';

function App() {

  const anecdotes = [

    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'

  ]

  const anecdotesVotes = Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [votesCount, setVotesCount] = useState(anecdotesVotes);
  const [anecdoteWithMostVotesInfo, setanecdoteWithMostVotesInfo] = useState(anecdoteWithMostVotes(votesCount))

  
  const voteHandler = () => {
    const tmp = [...votesCount];
    tmp[selected] += 1;
    setVotesCount(tmp);
    setanecdoteWithMostVotesInfo(anecdoteWithMostVotes(tmp));
    
  }

  const nextAnecdoteHandler = () => {
      setSelected(() => randomNumber(10));
  }

  return (
     
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votesCount[selected]} votes</p>


      <Button label='vote' handler={voteHandler} />
      <Button label='next anecdote' handler={nextAnecdoteHandler} />
      <h2>Anecdote with most votes</h2>

      {(anecdoteWithMostVotesInfo) ? <><p>{anecdotes[anecdoteWithMostVotesInfo.anecdoteIndex]}</p><p>has {anecdoteWithMostVotesInfo.votes} votes</p></> : null}
      
    </div>
  )

  

}

const randomNumber = (scale) => {

  return (Math.floor((Math.random() * scale)) % 8);

}

const anecdoteWithMostVotes = (voteCounts) => {

    let anecdoteWithMostVotes = voteCounts[0];
    let indexTrack = [0];

    for (let i = 0; i < voteCounts.length; i++){
          if (voteCounts[i] > anecdoteWithMostVotes){
            anecdoteWithMostVotes = voteCounts[i];
            indexTrack.push(i);
          }
    }

    if (voteCounts[indexTrack[indexTrack.length - 1]] === 0) return undefined;

    return {anecdoteIndex: indexTrack[indexTrack.length - 1], votes: voteCounts[indexTrack[indexTrack.length - 1]]};

}

const Button = ({label, handler}) => {

    return (
     <button onClick={handler}>{label}</button>
    )
}



export default App;
