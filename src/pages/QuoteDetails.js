import React, { Fragment } from 'react'
import { Link, Route, useParams } from 'react-router-dom';
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from '../components/quotes/NoQuotesFound'
const DUMMY_QUOTE = [
    { id: 'q1', author: 'Max', text: 'Enjoy Learning React' },
    { id: 'q2', author: 'Kaustav', text: 'React Done Successfully' },
    { id: 'q3', author: 'Rituparna', text: 'Coocking Done Successfully' },
]

function QuoteDetails() {
    const params = useParams();
    const desiredQuote = DUMMY_QUOTE.find(quote => quote.id === params.quoteId);

    return (
        <Fragment>
            {desiredQuote ? <HighlightedQuote text={desiredQuote.text} author={desiredQuote.author} /> : <NoQuotesFound />}
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