import { useEffect, useState } from 'react';
import { fetchCollection } from './api.js';

const USERS_ENDPOINT = '/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadUsers = async () => {
      try {
        const data = await fetchCollection(USERS_ENDPOINT);
        if (!cancelled) {
          setUsers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 fw-bold mb-1">Members</h2>
            <p className="text-muted mb-0">User records served by the Node.js API.</p>
          </div>
        </div>

        {loading && <p className="text-muted">Loading members…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="list-group">
            {users.map((user) => (
              <div key={user._id || user.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-semibold">{user.name || 'Member'}</div>
                  <div className="text-muted small">{user.email || 'No email provided'}</div>
                </div>
                <span className="badge bg-secondary">{user.fitnessLevel || 'active'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Users;
