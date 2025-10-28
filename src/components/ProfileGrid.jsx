import ProfileCard from './ProfileCard';

function ProfileGrid({ people, columns = 3 }) {
  // Bootstrap classes based on number of columns
  const getColumnClass = () => {
    switch(columns) {
      case 1: return 'col-12';
      case 2: return 'col-md-6';
      case 3: return 'col-lg-4 col-md-6';
      case 4: return 'col-xl-3 col-lg-4 col-md-6';
      case 5: return 'col-xl-2 col-lg-3 col-md-4 col-sm-6';
      default: return 'col-lg-4 col-md-6';
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="row g-3">
        {people.map(person => (
          <div key={person.id} className={getColumnClass()}>
            {/* Nie owijamy całej karty w Link */}
            <ProfileCard {...person} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileGrid;
