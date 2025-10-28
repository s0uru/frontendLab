import ProfileParagraph from './ProfileParagraph';
import { Link } from 'react-router-dom';

function ProfileCard({ id, name, email, phone, birthDate }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h2 className="card-title h5 text-center text-dark border-bottom border-primary pb-2 mb-3">
          Profil użytkownika
        </h2>

        <ProfileParagraph label="Imię" title={name}/>
        <ProfileParagraph label="Email" title={email}/>
        <ProfileParagraph label="Telefon" title={phone}/>
        <ProfileParagraph label="Data urodzin" title={birthDate}/>

        {/* Link do edycji Lab4 */}
        <Link to={`/lab4/edit/${id}`} className="btn btn-primary btn-sm mt-3">
          Edytuj
        </Link>
      </div>
    </div>
  );
}

export default ProfileCard;
