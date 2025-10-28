import { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router';
import AppContext from '../../data/AppContext';

function AddForm() {
  const [errors, setErrors] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  
  // Pobierz kontekst i dispatch
  const context = useContext(AppContext);
  const dispatch = context.dispatch;

  const onSubmitFunction = async (e) => {
    e.preventDefault();
    console.log("Submitting...");
    
    const data = new FormData(e.target);
    const newErrors = [];

    // Walidacja programowa
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const birthDate = data.get('birthDate');
    const url = data.get('url');
    const photo = data.get('photo');

    // Walidacja imienia
    if (!name || name.length < 2) {
      newErrors.push("Imię musi mieć co najmniej 2 znaki");
    }
    if (name && name.length > 50) {
      newErrors.push("Imię nie może być dłuższe niż 50 znaków");
    }

    // Walidacja email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.push("Podaj poprawny adres email");
    }

    // Walidacja telefonu
    const phoneRegex = /^\d{3}-\d{3}-\d{3}$/;
    if (!phone || !phoneRegex.test(phone)) {
      newErrors.push("Telefon musi być w formacie XXX-XXX-XXX");
    }

    // Walidacja daty urodzenia
    if (!birthDate) {
      newErrors.push("Data urodzenia jest wymagana");
    } else {
      const birthYear = new Date(birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (birthYear < 1900 || birthYear > currentYear) {
        newErrors.push("Podaj poprawną datę urodzenia");
      }
    }

    // Walidacja URL
    if (url && url.length > 200) {
      newErrors.push("URL nie może być dłuższy niż 200 znaków");
    }
    if (url) {
      try {
        new URL(url);
      } catch {
        newErrors.push("Podaj poprawny URL (z http:// lub https://)");
      }
    }

    // Walidacja photo
    if (photo && photo.length > 200) {
      newErrors.push("URL zdjęcia nie może być dłuższy niż 200 znaków");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Czyszczenie błędów
    setErrors([]);
    
    // Symulacja wysyłania
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Wysłanie akcji do reducera
    dispatch({
      type: 'add',
      person: {
        name,
        email,
        phone,
        birthDate,
        url: url || '',
        photo: photo || '',
        rating: 0,
        isChecked: false
      }
    });
    
    console.log("Osoba dodana do stanu");

    setIsSending(false);
    
    // Reset formularza
    e.target.reset();
    
    // Przekierowanie do lab4
    navigate('/lab04');
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 text-primary mb-4">Dodaj nową osobę</h1>
          <p className="lead text-muted">
            Wypełnij formularz, aby dodać nową osobę do listy
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body">
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <strong>Błędy walidacji:</strong>
                    <ul className="mb-0 mt-2">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={onSubmitFunction}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Imię <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name"
                      name="name"
                      placeholder="Wprowadź imię"
                      required
                      minLength={2}
                      maxLength={50}
                    />
                    <small className="text-muted">2-50 znaków</small>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email"
                      name="email"
                      placeholder="przyklad@wsei.edu.pl"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Telefon <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone"
                      name="phone"
                      placeholder="123-456-789"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                      required
                    />
                    <small className="text-muted">Format: XXX-XXX-XXX</small>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="birthDate" className="form-label">
                      Data urodzenia <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="birthDate"
                      name="birthDate"
                      required
                      min="1900-01-01"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="url" className="form-label">
                      URL (opcjonalnie)
                    </label>
                    <input 
                      type="url" 
                      className="form-control" 
                      id="url"
                      name="url"
                      placeholder="https://example.com"
                      maxLength={200}
                    />
                    <small className="text-muted">Maksymalnie 200 znaków</small>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="photo" className="form-label">
                      URL zdjęcia (opcjonalnie)
                    </label>
                    <input 
                      type="url" 
                      className="form-control" 
                      id="photo"
                      name="photo"
                      placeholder="https://example.com/photo.jpg"
                      maxLength={200}
                    />
                    <small className="text-muted">Maksymalnie 200 znaków</small>
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isSending}
                    >
                      {isSending ? 'Dodawanie...' : 'Dodaj osobę'}
                    </button>
                    <Link to="/lab04" className="btn btn-secondary">
                      Anuluj
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddForm;