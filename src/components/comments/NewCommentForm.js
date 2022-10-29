import { useEffect, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './NewCommentForm.module.css';
import { addComment } from '../../lib/api';

const NewCommentForm = (props) => {
  const { sendRequest, status, error } = useHttp(addComment);
  const commentTextRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value
    sendRequest({commentData:{ text: enteredText },quoteId: props.quoteId})

  };
  const {onAddedComment} = props
  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment()
    }
  }, [status, error, onAddedComment])


  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
