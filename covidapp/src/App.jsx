import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  const [data, setData] = useState([]);
  const getCoviddata = async () => {
    try {
      const res = await fetch('https://data.covid19india.org/data.json');
      const actualData = await res.json();
      setData(actualData.statewise[0]);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCoviddata()
  }, []);

  return (
    <>
      <div class="main">
        <h1 className='head'>Live Covid-19 Cases Updates</h1>
        <ul class="cards">
          <li class="cards_item">
            <div class="card">
              <div class="card_content text-center text-center">
                <h2 class="card_title">Country</h2>
                <p class="card_text">INDIA</p>
              </div>
            </div>
          </li>
          <li class="cards_item">
            <div class="card">
              <div class="card_content text-center">
                <h2 class="card_title">Recovered</h2>
                <p class="card_text">{data.recovered}</p>
              </div>
            </div>
          </li>
          <li class="cards_item">
            <div class="card">
              <div class="card_content text-center">
                <h2 class="card_title">Confirmed</h2>
                <p class="card_text">{data.confirmed}</p>
              </div>
            </div>
          </li>
          <li class="cards_item">
            <div class="card">
              <div class="card_content text-center">
                <h2 class="card_title">Deaths</h2>
                <p class="card_text">{data.deaths}</p>
              </div>
            </div>
          </li>
          <li class="cards_item">
            <div class="card">
              <div class="card_content text-center">
                <h2 class="card_title">Active</h2>
                <p class="card_text">{data.active}</p>
              </div>
            </div>
          </li>
          <li class="cards_item">
            <div class="card">
              <div class="card_content text-center">
                <h2 class="card_title">Updated</h2>
                <p class="card_text">{data.lastupdatedtime}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <h1 class="made_by">Made With ❤️ By AmanPathan</h1>
    </>
  );
}

export default App;
