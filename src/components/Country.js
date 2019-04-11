import React from 'react';
import '../styles/Country.css'

const Country = props => {

  let { name, capital, region, subregion, population, area, currency, flag } = props
  const error = 'Lack of information';
  if (name === '') {
    name = error
  };
  if (capital === '') {
    capital = error
  };
  if (region === '') {
    region = error
  };
  if (subregion === '') {
    subregion = error
  };
  if (population === '') {
    population = error
  };
  if (area === null) {
    area = error
  };
  if (currency === '') {
    currency = error
  };




  return (
    <section className='countryInfo'>
      <div className='country'>
        <header className='flagAndName'>
          <img src={flag} alt={`flag of ${name}`} />
          <h1>{name}</h1>
        </header>
        <main>
          <div className='divCountry'><span className='property'>Area:</span><span className='value'>{area} {area === null && <sup>2</sup>}</span></div>
          <div className='divCountry'><span className='property'>Capital:</span><span className='value'>{capital}</span></div>
          <div className='divCountry'><span className='property'>Population:</span><span className='value'>{population}</span></div>
          <div className='divCountry'><span className='property'>Currency:</span><span className='value'>{currency}</span></div>
          <div className='divCountry'><span className='property'>Region:</span><span className='value'>{region}</span></div>
          <div className='divCountry'><span className='property'>Subregion:</span><span className='value'>{subregion}</span></div>
        </main>
      </div>
    </section>
  );
}

export default Country;