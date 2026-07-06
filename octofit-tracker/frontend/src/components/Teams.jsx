import { useEffect, useState } from 'react';
import { fetchCollection } from './api.js';

const TEAMS_ENDPOINT = '/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadTeams = async () => {
      try {
        const data = await fetchCollection(TEAMS_ENDPOINT);
        if (!cancelled) {
          setTeams(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 fw-bold mb-1">Teams</h2>
            <p className="text-muted mb-0">Collaboration groups and squad activity.</p>
          </div>
        </div>

        {loading && <p className="text-muted">Loading teams…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team._id || team.id} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <div className="fw-semibold">{team.name || team.teamName || 'Team'}</div>
                  <p className="text-muted small mb-2">{team.description || 'A focused fitness team.'}</p>
                  <div className="small text-muted">Members: {team.members?.length || 0}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
