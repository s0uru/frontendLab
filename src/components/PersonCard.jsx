import ProfileParagraph from './ProfileParagraph';
import RatingBar from './RatingBar';

function PersonCard(profile) {
  const { dispatch, rating = 0, isChecked = false } = profile;

  const handleEdit = () => {
    console.log('Edycja profilu:', profile.name);
    alert(`Edycja profilu: ${profile.name}`);
  };

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
        <div className="card-body d-flex flex-column">
          <h2 className="card-title h5 text-center text-dark border-bottom border-primary pb-2 mb-3">
            Profil użytkownika
          </h2>

          <ProfileParagraph label="Imię" title={profile.name}/>
          <ProfileParagraph label="Email" title={profile.email}/>
          <ProfileParagraph label="Telefon" title={profile.phone}/>
          <ProfileParagraph label="Data urodzin" title={profile.birthDate}/>
          
          <div className="mb-3">
            <strong>Rating:</strong>
            <div className="mt-1">
              <RatingBar rate={rating} />
            </div>
          </div>

          <div className="mt-auto pt-3">
            <div className="d-flex flex-wrap gap-2 mb-2">
              <button 
                className="btn btn-primary btn-sm flex-fill"
                onClick={handleEdit}
              >
                Edit
              </button>
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

export default PersonCard;