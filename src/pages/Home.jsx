import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center">
          <h1 className="display-3 text-primary mb-4">Home</h1>
          <p className="lead text-muted">
            Witaj w aplikacji laboratoryjnej React
          </p>
          <div className="mt-5">
            <p>Wybierz laboratorium z menu nawigacji powyżej.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;