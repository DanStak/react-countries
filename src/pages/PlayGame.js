import React, { Component } from 'react';
import Results from '../components/Results.js';
import { Prompt } from 'react-router-dom';
import '../styles/PlayGame.css';

const button = [
  {
    class: 'africa',
    id: 1
  },

  {
    class: 'asia',
    id: 2
  },

  {
    class: 'americas',
    id: 3
  },

  {
    class: 'europe',
    id: 4
  },

  {
    class: 'oceania',
    id: 5
  },
]

class PlayGame extends Component {
  state = {
    data: [],
    API: '',
    isLoaded: false,
    draw: [],
    disabled: false,
    isTrue: false,
    checked: false,
    value0: '',
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    well: null,
    wrong: null,
    showStats: false
  }

  handleSelect = (e) => {

    this.setState({
      data: [],
      API: '',
      isLoaded: false,
      draw: [],
      disabled: true,
      isTrue: false,
      value0: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
    })


    const region = e.target.className;
    const API = `https://restcountries.eu/rest/v2/region/${region}`
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error(response.status)
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          data,
          isLoaded: true
        })
      })

  }


  componentDidUpdate(prevProps, prevState) {

    if (prevState.draw === this.state.draw && !this.state.isTrue && this.state.isLoaded) {

      let draw = 0;
      draw = this.randomCountry();

      let capitals = [];
      for (let i = 0; i < draw.length; i++) capitals.push(draw[i].capital)

      console.log(capitals);

      this.setState({
        draw,
        isTrue: true,
        showStats: false
      })
    }
  }



  randomCountry = () => {
    const amount = this.state.data.length;

    const tab = [];

    for (let i = 0; i <= 4; i++) {
      const number = Math.floor(Math.random() * amount)
      tab.push(this.state.data[number])
    }
    return tab
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.formValidationCounter();
    const { well, wrong } = validation;

    this.setState({
      well,
      wrong,
      showStats: true,
      disabled: false,
    })

  }

  formValidationCounter = () => {
    const draw = this.state.draw;
    const capitals = [];
    const answerWell = [];
    const answerWrong = [];

    for (let i = 0; i < draw.length; i++) {
      capitals.push(draw[i].capital)
    }

    if (capitals[0].toLowerCase() === this.state.value0.toLowerCase()) {
      answerWell.push('1')
    } else if (capitals[0] !== this.state.value0) {
      answerWrong.push('0')
    }

    if (capitals[1].toLowerCase() === this.state.value1.toLowerCase()) {
      answerWell.push('1')
    } else if (capitals[1] !== this.state.value1) {
      answerWrong.push('0')
    }

    if (capitals[2].toLowerCase() === this.state.value2.toLowerCase()) {
      answerWell.push('1')
    } else if (capitals[2] !== this.state.value2) {
      answerWrong.push('0')
    }

    if (capitals[3].toLowerCase() === this.state.value3.toLowerCase()) {
      answerWell.push('1')
    } else if (capitals[3] !== this.state.value3) {
      answerWrong.push('0')
    }

    if (capitals[4].toLowerCase() === this.state.value4.toLowerCase()) {
      answerWell.push('1')
    } else if (capitals[4] !== this.state.value4) {
      answerWrong.push('0')
    }

    const well = answerWell.length;
    const wrong = answerWrong.length;

    return ({
      well,
      wrong
    })

  }

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }




  render() {

    const { isLoaded, disabled, value0, value1, value2, value3, value4, well, wrong, showStats } = this.state;

    const styleWrong = {
      backgroundColor: 'rgba(251, 5, 5, .3)',
      borderBottom: 'none'
    }

    const styleWell = {
      backgroundColor: 'rgba(30, 148, 0, .3)',
      borderBottom: 'none'
    }


    let questions = null;
    let state = null;
    if (isLoaded) {
      const draw = [...this.state.draw]
      questions = draw.map((item, index) => {

        if (index === 0) {
          state = value0;
        }
        if (index === 1) {
          state = value1
        }
        if (index === 2) {
          state = value2;
        }
        if (index === 3) {
          state = value3
        }
        if (index === 4) {
          state = value4
        }

        return (
          <div key={item.name}>
            <label htmlFor={item.capital} >
              {item.name}
            </label>
            <input
              type='text'
              id={item.capital}
              name={`value${index}`}
              value={state}
              onChange={this.handleChange}
              style={showStats ? state.toLowerCase() === item.capital.toLowerCase() ? styleWell : styleWrong : null}
            />
          </div>
        )
      }
      )
    }


    const buttons = button.map(item => (
      <button className={item.class} key={item.id} disabled={this.state.disabled} onClick={this.handleSelect}>{item.class.toUpperCase()}</button>
    ))

    return (
      <>

        <section className='search'>
          <h1 className='searchH1'>Chose region</h1>
          {buttons}
        </section>
        <main className='mainGame'>

          {this.state.showStats &&
            <Results
              well={well}
              wrong={wrong} />}

          {isLoaded ?
            <div>
              <h3 className='gameH3' >What's the capital city of?</h3>
              <form onSubmit={this.handleSubmit}>
                {questions}
                {!showStats && <button>check</button>}
              </form>
              {!showStats && <p>TIP: look at the console (F12)</p>}
            </div> : null}


        </main>
        <Prompt
          when={disabled}
          message='You are already in the game, would you like to continue?'
        />
      </>

    );
  }
}


export default PlayGame;