import ProfileParagraph from './ProfileParagraph';

function ProfileCard(profile) {
  return (
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h2 className="card-title h5 text-center text-dark border-bottom border-primary pb-2 mb-3">
            Profil użytkownika
          </h2>

          <ProfileParagraph label="Imię" title={profile.name}/>
          <ProfileParagraph label="Email" title={profile.email}/>
          <ProfileParagraph label="Telefon" title={profile.phone}/>
          <ProfileParagraph label="Data urodzin" title={profile.birthDate}/>
        </div>
      </div>
  );
}

export default ProfileCard;