import { useEffect, useState } from 'react';
import { fetchCollection } from './api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('workouts');
        if (!cancelled) {
          setWorkouts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 fw-bold mb-1">Workout suggestions</h2>
            <p className="text-muted mb-0">Personalized programs generated from the backend data.</p>
          </div>
        </div>

        {loading && <p className="text-muted">Loading workouts…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout._id || workout.id} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <div className="fw-semibold">{workout.title || workout.name || 'Workout'}</div>
                  <p className="text-muted small mb-2">{workout.description || 'A structured plan for your next session.'}</p>
                  <div className="small text-muted">Focus: {workout.focus || 'General fitness'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
