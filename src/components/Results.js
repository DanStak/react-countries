import React from 'react';
import '../styles/Result.css';

const Results = props => {

  const { well, wrong } = props
  return (
    <section className='result'>
      <h1>Gratulation! You have reached</h1>
      <div>
        <span className='label'>Well answers: </span>
        <span style={{ color: 'green' }}>
          {well}
        </span>
        <br />
        <span className='label'>Wrong answers: </span>
        <span style={{ color: 'red' }}>
          {wrong}
        </span>
      </div>
    </section>
  );
}

export default Results;