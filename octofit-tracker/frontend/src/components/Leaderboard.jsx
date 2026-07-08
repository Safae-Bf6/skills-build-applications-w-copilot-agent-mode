import { useEffect, useState } from 'react';
import { fetchCollection } from './api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadEntries = async () => {
      try {
        const data = await fetchCollection('/api/leaderboard/');
        if (!cancelled) {
          setEntries(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadEntries();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 fw-bold mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">See how members are ranking across your fitness community.</p>
          </div>
        </div>

        {loading && <p className="text-muted">Loading leaderboard…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <>
            {entries.length === 0 ? (
              <p className="text-muted mb-0">No leaderboard entries yet.</p>
            ) : (
              <div className="list-group">
                {entries.map((entry, index) => (
              <div key={entry._id || entry.id || `${entry.user?.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">#{index + 1} {entry.user?.name || entry.name || 'Member'}</div>
                  <div className="text-muted small">{entry.score || entry.points || 0} points</div>
                </div>
                <span className="badge bg-primary rounded-pill">{entry.rank || index + 1}</span>
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

export default Leaderboard;
