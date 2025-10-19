function FooterApp() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <img 
              src="https://wsei.edu.pl/wp-content/uploads/2019/03/wsei-logo-svg.svg" 
              alt="WSEI Logo" 
              style={{ height: '40px' }}
              className="mb-2"
            />
            <p className="mb-0 small">
              Wyższa Szkoła Ekonomii i Informatyki w Krakowie
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-1">
              <strong>Autor aplikacji:</strong>
            </p>
            <p className="mb-0">
              <a href="mailto:jakub.pietrusiak@microsoft.wsei.edu.pl" className="text-light text-decoration-none">
                jakub.pietrusiak@microsoft.wsei.edu.pl
              </a>
            </p>
            <p className="mb-0 small text-muted mt-2">
              © 2025 Wszystkie prawa zastrzeżone
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterApp;