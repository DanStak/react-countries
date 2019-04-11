import React, { Component } from 'react';
import Country from '../components/Country.js';
import '../styles/ListOfCountries.css';

const API = 'https://restcountries.eu/rest/v2/all';


const filterButtons = [
  {
    id: 1,
    name: 'name A-Z',
  },

  {
    id: 2,
    name: 'name Z-A',
  },

  {
    id: 3,
    name: 'capital A-Z',
  },

  {
    id: 4,
    name: 'capital Z-A',
  },

  {
    id: 5,
    name: 'population -+',
  },

  {
    id: 6,
    name: 'population +-',
  },

  {
    id: 7,
    name: 'area -+',
  },

  {
    id: 8,
    name: 'area +-',
  },
]

class ListOfCountries extends Component {
  state = {
    mainData: [],
    data: [],
    isLoaded: false,
    value: ''
  }

  componentDidMount() {
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
          mainData: data,
          data,
          isLoaded: true
        })

      })
      .catch(err => {
        console.log('coś poszło nie tak');
      })

  }

  handleFilterChange = (e) => {

    const filter = e.target.name;
    console.log(filter)
    const data = this.state.mainData

    if (filter === 'name A-Z') {
      data.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }

        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    }

    if (filter === 'name Z-A') {
      data.sort((a, b) => {
        if (a.name < b.name) {
          return 1
        }

        if (a.name > b.name) {
          return -1
        }
        return 0
      })
    }

    if (filter === 'capital A-Z') {
      data.sort((a, b) => {
        if (a.capital < b.capital) {
          return -1
        }

        if (a.capital > b.capital) {
          return 1
        }
        return 0
      })
    }

    if (filter === 'capital Z-A') {
      data.sort((a, b) => {
        if (a.capital < b.capital) {
          return 1
        }

        if (a.capital > b.capital) {
          return -1
        }
        return 0
      })
    }

    if (filter === 'population -+') {
      data.sort((a, b) => {
        if (a.population < b.population) {
          return -1
        }

        if (a.population > b.population) {
          return 1
        }
        return 0
      })
    }

    if (filter === 'population +-') {
      data.sort((a, b) => {
        if (a.population < b.population) {
          return 1
        }

        if (a.population > b.population) {
          return -1
        }
        return 0
      })
    }

    if (filter === 'area -+') {
      data.sort((a, b) => {
        if (a.area < b.area) {
          return -1
        }

        if (a.area > b.area) {
          return 1
        }
        return 0
      })
    }

    if (filter === 'area +-') {
      data.sort((a, b) => {
        if (a.area < b.area) {
          return 1
        }

        if (a.area > b.area) {
          return -1
        }
        return 0
      })
    }

    this.setState({
      data,
      value: ''
    })
  }

  handleChange = (e) => {

    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = [...this.state.mainData];
    const value = this.state.value;

    if (value > 0 && value <= data.length) {
      this.setState({
        data: data.slice(0, (value * 1)),
      })
    } else console.log('unexpected number')

  }

  render() {
    const list = this.state.data.map(item => (
      <Country
        key={item.numericCode}
        name={item.name}
        capital={item.capital}
        region={item.region}
        subregion={item.subregion}
        population={item.population}
        area={item.area}
        currency={item.currencies[0].code}
        flag={item.flag}
        click={this.handleClick}
      />
    ))

    const buttons = filterButtons.map(item => (
      <button
        key={item.id}
        name={item.name}
        className='filterButtons'
        onClick={this.handleFilterChange}
      >
        {item.name}
      </button>
    ))

    return (
      <>
        <section
          className='listOfCountries'>
          {buttons}

          <form onSubmit={this.handleSubmit}>
            <input
              className='amount'
              type='number'
              value={this.state.value}
              placeholder='amount of country'
              onChange={this.handleChange}
            ></input>
          </form>

        </section>
        <main>
          {this.state.isLoaded ? list : <h1 className='loading'>Loading...</h1>}
        </main>
      </>
    );
  }
}

export default ListOfCountries;