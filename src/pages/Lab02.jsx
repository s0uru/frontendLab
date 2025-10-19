import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Alert, Button } from 'react-bootstrap';
import { people } from '../module-data.js';

function Lab02() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          Brak identyfikatora osoby.
          <div className="mt-3">
            <Link to="/" className="btn btn-primary">Powrót do strony głównej</Link>
          </div>
        </Alert>
      </Container>
    );
  }

  const idNumber = parseInt(id, 10);
  if (isNaN(idNumber)) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Nieprawidłowy format identyfikatora.
          <div className="mt-3">
            <Link to="/" className="btn btn-primary">Powrót do strony głównej</Link>
          </div>
        </Alert>
      </Container>
    );
  }

  const person = people.find(p => p.id === idNumber);
  if (!person) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Nie znaleziono osoby o identyfikatorze: {id}
          <div className="mt-3">
            <Link to="/" className="btn btn-primary">Powrót do strony głównej</Link>
          </div>
        </Alert>
      </Container>
    );
  }

  const currentIndex = people.findIndex(p => p.id === idNumber);
  const prevPerson = currentIndex > 0 ? people[currentIndex - 1] : null;
  const nextPerson = currentIndex < people.length - 1 ? people[currentIndex + 1] : null;

  const goToPrev = () => { if (prevPerson) navigate(`/lab02/${prevPerson.id}`); };
  const goToNext = () => { if (nextPerson) navigate(`/lab02/${nextPerson.id}`); };

  return (
    <Container className="mt-4">
      {/* Tylko profil osoby z podanym id */}
      <Card>
        <Card.Header as="h5">Profil osoby #{person.id}</Card.Header>
        <Card.Body>
          <Card.Title>{person.name}</Card.Title>
          <Card.Text>{person.description}</Card.Text>
          <Card.Text>
            <small className="text-muted">
              Email: {person.email}<br />
              Telefon: {person.phone}<br />
              Data urodzenia: {person.birthDate}
            </small>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Przyciski nawigacji poniżej profilu */}
      <div className="d-flex gap-2 justify-content-center mt-3">
        <Button variant="secondary" onClick={goToPrev} disabled={!prevPerson}>
          ← Poprzednia osoba
        </Button>

        <Button variant="secondary" onClick={goToNext} disabled={!nextPerson}>
          Następna osoba →
        </Button>
      </div>

      {/* Przycisk "Zobacz wszystkie profile" pod przyciskami nawigacji */}
      <div className="d-flex justify-content-center mt-2">
        <Button as={Link} to="/lab01" variant="primary">
          Zobacz wszystkie profile
        </Button>
      </div>
    </Container>
  );
}

export default Lab02;
