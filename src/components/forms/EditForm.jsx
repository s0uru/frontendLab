import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useData from '../../hooks/useData';
import useDispatch from '../../hooks/useDispatch';


function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const items = useData();
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset } = useForm();

  // Znajdź osobę do edycji
  const person = items.find(p => p.id === parseInt(id));

  // Ustaw wartości początkowe formularza
  useEffect(() => {
    if (person) {
      setValue('name', person.name);
      setValue('email', person.email);
      setValue('phone', person.phone);
      setValue('birthDate', person.birthDate);
      setValue('url', person.url || '');
      setValue('photo', person.photo || '');
    }
  }, [person, setValue]);

  const onSubmit = async (data) => {
    console.log("Submitting edit...");
    
    // Symulacja wysyłania
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Wysłanie akcji do reducera
    dispatch({
      type: 'edit',
      person: {
        id: parseInt(id),
        ...data,
        rating: person.rating || 0,
        isChecked: person.isChecked || false
      }
    });
    
    console.log("Osoba zaktualizowana w stanie");

    // Przekierowanie do lab4
    navigate('/lab4');
  };

  // Jeśli nie znaleziono osoby
  if (!person) {
    return (
      <div className="bg-light py-5">
        <div className="container">
          <div className="text-center">
            <h1 className="display-3 text-danger mb-4">Błąd</h1>
            <p className="lead text-muted">
              Nie znaleziono osoby o ID: {id}
            </p>
            <Link to="/lab4" className="btn btn-primary mt-3">
              Powrót do Lab 4
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 text-primary mb-4">Edytuj osobę</h1>
          <p className="lead text-muted">
            Zmodyfikuj dane osoby: <strong>{person.name}</strong> (ID: {id})
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body">
                {Object.keys(errors).length > 0 && (
                  <div className="alert alert-danger">
                    <strong>Błędy walidacji:</strong>
                    <ul className="mb-0 mt-2">
                      {errors.name && <li>{errors.name.message}</li>}
                      {errors.email && <li>{errors.email.message}</li>}
                      {errors.phone && <li>{errors.phone.message}</li>}
                      {errors.birthDate && <li>{errors.birthDate.message}</li>}
                      {errors.url && <li>{errors.url.message}</li>}
                      {errors.photo && <li>{errors.photo.message}</li>}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="hidden" name="id" value={id} />

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Imię <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      placeholder="Wprowadź imię"
                      {...register('name', {
                        required: 'Imię jest wymagane',
                        minLength: {
                          value: 2,
                          message: 'Imię musi mieć co najmniej 2 znaki'
                        },
                        maxLength: {
                          value: 50,
                          message: 'Imię nie może być dłuższe niż 50 znaków'
                        }
                      })}
                    />
                    <small className="text-muted">2-50 znaków</small>
                    {errors.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      placeholder="przyklad@wsei.edu.pl"
                      {...register('email', {
                        required: 'Email jest wymagany',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Podaj poprawny adres email'
                        }
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Telefon <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="tel" 
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      placeholder="123-456-789"
                      {...register('phone', {
                        required: 'Telefon jest wymagany',
                        pattern: {
                          value: /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/,
                          message: 'Telefon musi być w formacie XXX-XXX-XXX'
                        }
                      })}
                    />
                    <small className="text-muted">Format: XXX-XXX-XXX</small>
                    {errors.phone && (
                      <div className="invalid-feedback d-block">
                        {errors.phone.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="birthDate" className="form-label">
                      Data urodzenia <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="date" 
                      className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                      id="birthDate"
                      {...register('birthDate', {
                        required: 'Data urodzenia jest wymagana',
                        validate: {
                          validYear: (value) => {
                            const year = new Date(value).getFullYear();
                            const currentYear = new Date().getFullYear();
                            return (year >= 1900 && year <= currentYear) || 'Podaj poprawną datę urodzenia';
                          }
                        }
                      })}
                    />
                    {errors.birthDate && (
                      <div className="invalid-feedback d-block">
                        {errors.birthDate.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="url" className="form-label">
                      URL (opcjonalnie)
                    </label>
                    <input 
                      type="url" 
                      className={`form-control ${errors.url ? 'is-invalid' : ''}`}
                      id="url"
                      placeholder="https://example.com"
                      {...register('url', {
                        maxLength: {
                          value: 200,
                          message: 'URL nie może być dłuższy niż 200 znaków'
                        },
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: 'URL musi zaczynać się od http:// lub https://'
                        }
                      })}
                    />
                    <small className="text-muted">Maksymalnie 200 znaków</small>
                    {errors.url && (
                      <div className="invalid-feedback d-block">
                        {errors.url.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="photo" className="form-label">
                      URL zdjęcia (opcjonalnie)
                    </label>
                    <input 
                      type="url" 
                      className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                      id="photo"
                      placeholder="https://example.com/photo.jpg"
                      {...register('photo', {
                        maxLength: {
                          value: 200,
                          message: 'URL zdjęcia nie może być dłuższy niż 200 znaków'
                        },
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: 'URL musi zaczynać się od http:// lub https://'
                        }
                      })}
                    />
                    <small className="text-muted">Maksymalnie 200 znaków</small>
                    {errors.photo && (
                      <div className="invalid-feedback d-block">
                        {errors.photo.message}
                      </div>
                    )}
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany'}
                    </button>
                    <Link to="/lab4" className="btn btn-secondary">
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

export default EditForm;