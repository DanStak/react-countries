import React, { Component } from 'react';
import Country from '../components/Country';
import '../styles/SearchCountry.css';

class SearchCountry extends Component {
  state = {
    country: [],
    isFound: false,
    value: ''
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const API = `https://restcountries.eu/rest/v2/name/${this.state.value}?fullText=true`;


    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error(response.status)
      })

      .then(data => data.json())
      .then(country => {
        this.setState({
          country,
          isFound: true,
          value: ''
        })
      })

      .catch(err => {
        alert('Sorry, but there is no country with than name on Earth :(')
        this.setState({
          value: ''
        })
      })
  }


  render() {

    const found = this.state.country.map(item => (
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
      />
    ))


    return (
      <>
        <section className='search'>
          <h1 className='searchH1'>search for country</h1>
          <form className='searchForm' onSubmit={this.handleSubmit}>

            <input
              className='searchInput'
              placeholder='name of country'
              type='text'
              id='country'
              value={this.state.value}
              onChange={this.handleChange}
            />

            <button className='searchButton'>search</button>

            {/* <select value={this.state.number} onChange={this.handleVisitsNumberChange.bind(this)}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="more">więcej</option>
          </select> */}

          </form>
        </section>

        <main>

          {this.state.isFound && found}
        </main>

      </>
    );
  }
}

export default SearchCountry;