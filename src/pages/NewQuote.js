import React from 'react'
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm'

function NewQuote() {
  const history = useHistory();
  const addQuoteHandler = (data) =>{
    console.log(data);
    history.push(`/quotes`)
  }
  return (
    <QuoteForm onAddQuote={addQuoteHandler} isLoading={false}/>
  )
}

export default NewQuote