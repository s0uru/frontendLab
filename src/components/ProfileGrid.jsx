import ProfileCard from './ProfileCard';
import { Link } from 'react-router';

function ProfileGrid({ people, columns = 3 }) {
  // Calculate Bootstrap column classes based on the number of columns
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
            <Link to={`/lab02/${person.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProfileCard 
                name={person.name}
                email={person.email}
                birthDate={person.birthDate}
                phone={person.phone}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileGrid;