import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';


function Lab04() {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-3 text-primary mb-4">Laboratorium 4</h1>
          <p className="lead text-muted">
            Praca z formularzami i walidacją
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title">Zarządzanie danymi</h5>
                <p className="card-text text-muted">
                  Wybierz operację, którą chcesz wykonać:
                </p>
                <div className="d-grid gap-2">
                  <Link to="/lab04/add" className="btn btn-success btn-lg">
                    Dodaj nową osobę
                  </Link>
                  <Link to="/lab04/edit/1" className="btn btn-primary btn-lg">
                    Edytuj osobę
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lab04;