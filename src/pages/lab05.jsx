import React, { useEffect, useMemo, useReducer } from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup, Accordion } from 'react-bootstrap';
import TableDataReducer from '../data/TableDataReducer';

function TableHeader({ title, columnKey, dispatch }) {
  return (
    <th>
      <div className="d-flex align-items-center justify-content-between">
        <span>{title}</span>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${columnKey}`}>
            Sort
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatch({ type: 'sort', column: columnKey, order: 'asc' })}>Rosnąco</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch({ type: 'sort', column: columnKey, order: 'desc' })}>Malejąco</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch({ type: 'sort', column: columnKey, order: 'none' })}>Naturalnie</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </th>
  );
}

function Lab05() {
  const [posts] = useFetch('https://jsonplaceholder.typicode.com/posts');
  const [users] = useFetch('https://jsonplaceholder.typicode.com/users');
  const [comments] = useFetch('https://jsonplaceholder.typicode.com/comments');

  const tableData = useMemo(() => {
    return posts.map((p, index) => ({
      __index: index,
      user: users.find((u) => u.id === p.userId),
      post: p,
      comments: comments.filter((c) => c.postId === p.id),
    }));
  }, [posts, users, comments]);

  const [state, dispatch] = useReducer(TableDataReducer, { data: [], natural: [] });

  // initialize reducer with tableData
  useEffect(() => {
    if (tableData && tableData.length > 0) {
      dispatch({ type: 'init', payload: tableData });
    }
  }, [tableData]);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-5 text-primary">Laboratorium 5</h1>
        <p className="lead text-muted">Pobieranie danych z jsonplaceholder i budowanie tableData</p>
      </div>

      <div className="d-flex justify-content-center mb-5 gap-4">
        <div className="px-3 py-2 border rounded bg-light"><strong>Postów:</strong> {posts.length}</div>
        <div className="px-3 py-2 border rounded bg-light"><strong>Użytkowników:</strong> {users.length}</div>
        <div className="px-3 py-2 border rounded bg-light"><strong>Komentarzy:</strong> {comments.length}</div>
      </div>

      <div className="table-responsive mb-5">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <TableHeader title="User" columnKey="user" dispatch={dispatch} />
              <TableHeader title="Post title" columnKey="title" dispatch={dispatch} />
              <TableHeader title="Komentarze" columnKey="comments" dispatch={dispatch} />
            </tr>
          </thead>
          <tbody>
            {(state.data || []).map((row) => (
              <tr key={row.post.id} className="border-top">
                <td className="align-middle py-4">
                   {row.user ? (
                     <Link to={`/lab05/users/${row.user.id}`}>{row.user.name}</Link>
                   ) : (
                     <em>Loading...</em>
                   )}
                </td>
                <td className="py-4">
                  <Accordion>
                    <Accordion.Item eventKey={String(row.post.id)}>
                      <Accordion.Header className="fw-bold">{row.post.title}</Accordion.Header>
                      <Accordion.Body className="py-4">
                        {row.post.body}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </td>
                <td className="align-middle py-4">
                  <Link to={`/lab05/posts/${row.post.id}/comments`} className="text-primary">{`Komentarze ${ (row.comments || []).length }`}</Link>
                </td>
              </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   );
 }
 
 export default Lab05;
