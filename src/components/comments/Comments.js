import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList'

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addedComments = () => {
    setIsAddingComment(false)
  }
  let comments;
  const { sendRequest, status, data: allComments, error } = useHttp(getAllComments);
  useEffect(() => {
    sendRequest(params.quoteId)
  }, [sendRequest, params.quoteId])
  if (status === 'pending') {
    comments = <div className='centered'><LoadingSpinner /></div>
  }
  if (error) {
    comments = <p>{error}</p>
  }
  if (status === 'completed' && allComments && allComments.length > 0) {
    comments = <CommentsList comments={allComments} />
  }
  if (status === 'completed' && (!allComments || allComments.length === 0)) {
    comments = <p className='centered'>No Comments added yet</p>

    return (
      <section className={classes.comments}>
        <h2>User Comments</h2>
        {!isAddingComment && (
          <button className='btn' onClick={startAddCommentHandler}>
            Add a Comment
          </button>
        )}
        {isAddingComment && <NewCommentForm quoteId={params.quoteId} onAddedComment={addedComments} />}
        {comments}
      </section>
    );
  };
}
export default Comments;