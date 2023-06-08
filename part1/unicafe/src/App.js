import { useState } from "react";

function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [average, setAverage] = useState(0.0);
  


  const countGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);

    const updatedTotalFeedback = updatedGood + neutral + bad;
    setTotalFeedback(updatedTotalFeedback);
    setAverage(Number.parseFloat(updatedTotalFeedback / 3));
  }

  const countNeutral = () => {
    const updatedNeutral = neutral + 1;
    const updatedTotalFeedback = good + updatedNeutral + bad;
    setNeutral(updatedNeutral);

    setTotalFeedback(updatedTotalFeedback);
    setAverage(Number.parseFloat(updatedTotalFeedback / 3));

  }

  const countBad = () => {
    const updatedBad = bad + 1;
    const updatedTotalFeedback = good + neutral + updatedBad;
    setBad(updatedBad);
    setTotalFeedback(updatedTotalFeedback);
    setAverage(Number.parseFloat(updatedTotalFeedback / 3));

  }

 


  const handlers = { countGood, countNeutral, countBad };
  const positive = ((good / totalFeedback) * 100);


  const statisticLineData = [
    {
      text: 'good',
      value: good
    },
    {
      text: 'neutral',
      value: neutral
    },
    {
      text: 'bad',
      value: bad
    },

    {
      text: 'all',
      value: totalFeedback
    },

    {
      text: 'average',
      value: average
    },

    {
      text: 'positive',
      value: (positive > 0) ? (positive.toString().concat('%')) : positive
    }
  ];



  return (

    <div>
      <FeedBack {...handlers} />
      <Statistics totalFeedback={totalFeedback} statisticLineData={statisticLineData} />
    </div>

  );
}


function FeedBack({ countGood, countNeutral, countBad }) {

  return (
    <div>

      <h5>Give feedback</h5>

      <Button handler={countGood} option="good" />
      <Button handler={countNeutral} option="neutral" />
      <Button handler={countBad} option="bad" />


    </div>
  )

}

function Statistics({ totalFeedback, statisticLineData }) {

  if (totalFeedback > 0) {
   
    return (
      <div>

        <h5>Statistics</h5>

        <table>

          <tbody>


            {statisticLineData.map((statisticLine, key) => (

              <StatisticLine key={key} {...statisticLine} />
            ))}

          </tbody>

        </table>



      </div>
    )
  }

  return (
    <div>
      <h5>Statistics</h5>

      <p>No feedback given</p>
    </div>
  )

}

function StatisticLine({ text, value }) {

  return (

    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )

}

function Button({ option, handler }) {

  return (


    <button onClick={handler}>{option}</button>

  )

}



export default App;
