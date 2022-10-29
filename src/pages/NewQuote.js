import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

function NewQuote() {
  const {sendRequest, status} = useHttp(addQuote)
  const history = useHistory();
  useEffect(()=>{
    if(status === 'completed'){
      history.push(`/quotes`)
    }
  },[status,history])
  const addQuoteHandler = (data) =>{
    sendRequest(data);
    start++;
  }
  return (
    <QuoteForm onAddQuote={addQuoteHandler} isLoading={status === 'pending'}/>
  )
}

export default NewQuote