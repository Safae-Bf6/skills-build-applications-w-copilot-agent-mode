import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const normalizedData = Array.isArray(data) ? data : data?.results || data?.items || data?.data || [];

        if (!cancelled) {
          setActivities(normalizedData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      
      cancelled = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 fw-bold mb-1">Recent activity</h2>
            <p className="text-muted mb-0">Latest workouts and movement logs from the backend.</p>
          </div>
        </div>

        {loading && <p className="text-muted">Loading activities…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <>
            {activities.length === 0 ? (
              <p className="text-muted mb-0">No activities available yet.</p>
            ) : (
              <div className="list-group">
                {activities.map((activity) => (
              <div key={activity._id || activity.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <div className="fw-semibold text-capitalize">{activity.type || 'Activity'}</div>
                    <div className="text-muted small">{activity.user?.name || activity.userName || 'Unknown user'}</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-semibold">{activity.duration || 0} min</div>
                    <div className="text-muted small">{activity.calories || 0} kcal</div>
                  </div>
                </div>
              </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Activities;
