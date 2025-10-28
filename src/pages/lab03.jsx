import 'bootstrap/dist/css/bootstrap.min.css';
import { people } from '../module-data.js';
import PersonCard from '../components/PersonCard';
import MyContainer from '../components/MyContainer';


function Lab3() {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-3 text-primary mb-4">Laboratorium 3</h1>
          <p className="lead text-muted">
            Nowy komponent profilu osoby
          </p>
        </div>

        <MyContainer element={PersonCard} data={people.slice(0, 6)} />
      </div>
    </div>
  );
}

export default Lab3;