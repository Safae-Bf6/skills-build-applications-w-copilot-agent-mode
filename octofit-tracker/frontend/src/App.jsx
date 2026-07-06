import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './components/api.js';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const baseUrl = getApiBaseUrl();

  return (
    <main className="container py-4 py-lg-5">
      <header className="row align-items-center g-4 mb-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
          <h1 className="display-5 fw-bold">Train smarter with a connected fitness hub.</h1>
          <p className="lead text-muted mb-3">
            Explore activities, teams, leaderboard results, members, and workout ideas from the backend API.
          </p>
          <div className="alert alert-info mb-0" role="status">
            <strong>Tip:</strong> in GitHub Codespaces, the app derives the backend URL from the current browser address.
            For local development, it falls back to <code>{baseUrl}</code>.
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold">Navigation</h2>
              <nav className="list-group list-group-flush mt-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <section className="row g-4">
              <div className="col-lg-6">
                <Activities />
              </div>
              <div className="col-lg-6">
                <Leaderboard />
              </div>
              <div className="col-lg-6">
                <Teams />
              </div>
              <div className="col-lg-6">
                <Users />
              </div>
              <div className="col-lg-12">
                <Workouts />
              </div>
            </section>
          }
        />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  );
}

export default App;
