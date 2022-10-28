import React from 'react';
import QuoteList from '../components/quotes/QuoteList';

export const DUMMY_QUOTE = [
  {id: 'q1', author:'Max', text: 'Enjoy Learning React'},
  {id: 'q2', author:'Kaustav', text: 'React Done Successfully'},
  {id: 'q3', author:'Rituparna', text: 'Coocking Done Successfully'},
]

function AllQuotes() {
  return (
    <QuoteList quotes={DUMMY_QUOTE}/>
  )
}

export default AllQuotes