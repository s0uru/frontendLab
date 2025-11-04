import { Link } from 'react-router';
import ProfileParagraph from './ProfileParagraph';
import RatingBar from './RatingBar';
import useDispatch from '../hooks/useDispatch';

function ProfileCardLab3(profile) {
  const { rating = 0, isChecked = false } = profile;
  const dispatch = useDispatch();

  const handleCheck = () => {
    dispatch({ type: 'check', id: profile.id });
    console.log('Zaznaczono osobę:', profile.name);
  };

  const handleDelete = () => {
    console.log('Usunięcie osoby:', profile.name);
    if (window.confirm(`Czy na pewno chcesz usunąć profil: ${profile.name}?`)) {
      dispatch({ type: 'delete', id: profile.id });
    }
  };

  const handleRate = () => {
    dispatch({ type: 'rate', id: profile.id });
    console.log('Zmiana ratingu dla:', profile.name);
  };

  return (
      <div className={`card shadow-sm h-100 ${isChecked ? 'border-success border-3' : ''}`}>
        {profile.photo && (
          <img 
            src={profile.photo} 
            className="card-img-top" 
            alt={profile.name}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h2 className="card-title h5 text-center text-dark border-bottom border-primary pb-2 mb-3">
            Profil użytkownika
          </h2>

          <ProfileParagraph label="Imię" title={profile.name}/>
          <ProfileParagraph label="Email" title={profile.email}/>
          <ProfileParagraph label="Telefon" title={profile.phone}/>
          <ProfileParagraph label="Data urodzin" title={profile.birthDate}/>
          
          {profile.url && (
            <div className="mb-3">
              <strong>URL:</strong>
              <div className="mt-1">
                <a 
                  href={profile.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-break"
                >
                  {profile.url}
                </a>
              </div>
            </div>
          )}
          
          <div className="mb-3">
            <strong>Rating:</strong>
            <div className="mt-1">
              <RatingBar rate={rating} />
            </div>
          </div>

          <div className="mt-auto pt-3">
            <div className="d-flex flex-wrap gap-2 mb-2">
              <Link 
                to={`/lab4/edit/${profile.id}`}
                className="btn btn-primary btn-sm flex-fill text-decoration-none"
              >
                Edit
              </Link>
              <button 
                className="btn btn-danger btn-sm flex-fill"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button 
                className={`btn btn-sm flex-fill ${isChecked ? 'btn-success' : 'btn-outline-success'}`}
                onClick={handleCheck}
              >
                {isChecked ? '✓ Checked' : 'Check'}
              </button>
              <button 
                className="btn btn-warning btn-sm flex-fill"
                onClick={handleRate}
              >
                Rate (+1)
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProfileCardLab3;