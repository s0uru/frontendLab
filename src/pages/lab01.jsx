import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import ProfileGrid from '../components/ProfileGrid';
import { people } from '../module-data.js';

function Lab01() {
  const [columns, setColumns] = useState(3);

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 text-primary mb-3">Profile Cards Grid</h1>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <label htmlFor="columns" className="form-label fw-bold">
                    Number of columns:
                  </label>
                  <select 
                    id="columns"
                    className="form-select mb-3"
                    value={columns} 
                    onChange={(e) => setColumns(Number(e.target.value))}
                  >
                    <option value={1}>1 Column</option>
                    <option value={2}>2 Columns</option>
                    <option value={3}>3 Columns</option>
                    <option value={4}>4 Columns</option>
                    <option value={5}>5 Columns</option>
                  </select>
                  <p className="text-muted mb-0">
                    Showing <span className="fw-bold text-primary">{people.length}</span> profiles in <span className="fw-bold text-primary">{columns}</span> column{columns !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProfileGrid people={people} columns={columns} />
      </div>
    </div>
  )
}

export default Lab01