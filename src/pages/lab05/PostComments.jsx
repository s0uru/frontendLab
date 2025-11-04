import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams, Link } from 'react-router-dom';

function PostComments() {
  const { id } = useParams();
  const [posts] = useFetch('https://jsonplaceholder.typicode.com/posts');
  const [comments] = useFetch('https://jsonplaceholder.typicode.com/comments');
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const p = posts.find((x) => x.id === parseInt(id));
      setPost(p || null);
    }
  }, [posts, id]);

  useEffect(() => {
    if (comments && comments.length > 0) {
      setPostComments(comments.filter((c) => c.postId === parseInt(id)));
    }
  }, [comments, id]);

  if (!post) return (
    <div className="container py-5">
      <p className="lead">Loading post...</p>
      <Link to="/lab05">Back</Link>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="h4 mb-3">{post.title}</h1>
      <p className="mb-4">{post.body}</p>

      <h2 className="h5">Comments ({postComments.length})</h2>
      <ul className="list-group">
        {postComments.map(c => (
          <li key={c.id} className="list-group-item">
            <strong>{c.name}</strong>
            <div className="text-muted small">{c.email}</div>
            <p className="mt-2 mb-0">{c.body}</p>
          </li>
        ))}
      </ul>

      <Link to="/lab05" className="btn btn-secondary mt-3">Back</Link>
    </div>
  );
}

export default PostComments;
