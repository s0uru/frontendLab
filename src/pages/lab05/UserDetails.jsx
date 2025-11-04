import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const [users] = useFetch('https://jsonplaceholder.typicode.com/users');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (users && users.length > 0) {
      const u = users.find((x) => x.id === parseInt(id));
      setUser(u || null);
    }
  }, [users, id]);

  if (!user) return (
    <div className="container py-5">
      <p className="lead">Loading user...</p>
      <Link to="/lab05">Back</Link>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="h4 mb-3">{user.name}</h1>
      <ul className="list-group mb-3">
        <li className="list-group-item"><strong>Username:</strong> {user.username}</li>
        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
        <li className="list-group-item"><strong>Phone:</strong> {user.phone}</li>
        <li className="list-group-item"><strong>Website:</strong> {user.website}</li>
        <li className="list-group-item"><strong>Company:</strong> {user.company?.name}</li>
        <li className="list-group-item"><strong>Address:</strong> {user.address?.street}, {user.address?.city}</li>
      </ul>
      <Link to="/lab05" className="btn btn-secondary">Back</Link>
    </div>
  );
}

export default UserDetails;
