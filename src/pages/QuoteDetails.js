import React, { Fragment, useEffect } from 'react'
import { Link, Route, useParams } from 'react-router-dom';
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

function QuoteDetails() {
    const params = useParams();
    const {sendRequest,status, data: desiredQuote, error} = useHttp(getSingleQuote)
    useEffect(()=>{
        sendRequest(params.quoteId)
    },[sendRequest,params.quoteId])
    if(status === 'pending'){
        return(
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }
    if(error){
        return(<p>{error}</p>)
    }
    if(!desiredQuote.text){
        return(<p>No Quote Found</p>)
    }

    return (
        <Fragment>
            <HighlightedQuote text={desiredQuote.text} author={desiredQuote.author} />
            <Route path={`/quotes/${params.quoteId}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`/quotes/:quoteId/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}

export default QuoteDetails