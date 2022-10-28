import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import { sortQuotes } from './sorting';

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const isAscending = queryParams.get('sort') === 'asc';
  const sortedQuotes = sortQuotes(props.quotes,isAscending);
  const sortingHandler = () =>{
    history.push(`/quotes?sort=`+(isAscending ? 'desc':'asc'));
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>Sort {isAscending ? 'desc':'asc'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
