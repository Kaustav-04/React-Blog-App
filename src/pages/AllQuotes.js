import React, { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import NoQuotesFound from '../components/quotes/NoQuotesFound'

export const DUMMY_QUOTE = [
  {id: 'q1', author:'Max', text: 'Enjoy Learning React'},
  {id: 'q2', author:'Kaustav', text: 'React Done Successfully'},
  {id: 'q3', author:'Rituparna', text: 'Coocking Done Successfully'},
]

function AllQuotes() {
  const {sendRequest, status, data: loadingQuotes, error} = useHttp(getAllQuotes, true)
  useEffect(()=>{
    sendRequest()
  },[sendRequest])
  if(status === 'pending'){
    <div className='centered'>
      <LoadingSpinner/>
    </div>
  }
  if(error){
    return(<p>{error}</p>)
  }
  if(status === 'completed' && (!loadingQuotes || loadingQuotes.length === 0)){
    return(
      <NoQuotesFound />
    )
  }
  return (
    <QuoteList quotes={loadingQuotes}/>
  )
}

export default AllQuotes