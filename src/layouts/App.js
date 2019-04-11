import React, { Component } from 'react';
import '../styles/App.css';
import AllCountries from './AllCountries.js';
import FindCountry from './FindCountry.js';
import Game from './Game.js';
import Pages from './Pages.js';
import Main from './Main.js';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {

  handleClick = () => {
    console.log('działa');
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li className='main'><Main /></li>

              <li className='all'><AllCountries /></li>

              <li className='find'><FindCountry /></li>

              <li className='game'><Game /></li>

              {/* <li className='liked'><Liked /></li> */}
            </ul>
          </nav>
          <article>
            <Pages />
          </article>

          <footer>© Damian Stasiak 2019</footer>
        </div>
      </Router>

    );
  }
}

export default App;
