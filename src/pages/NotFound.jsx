import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center">
          <h1 className="display-1 text-danger mb-4">404</h1>
          <h2 className="mb-3">Brak strony</h2>
          <p className="lead text-muted">
            Przepraszamy, strona której szukasz nie istnieje.
          </p>
          <Link to="/home" className="btn btn-primary mt-3">
            Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;