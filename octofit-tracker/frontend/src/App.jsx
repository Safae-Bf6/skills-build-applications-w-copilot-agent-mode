import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Train smarter with a connected fitness hub.</h1>
          <p className="lead text-muted">
            Track workouts, manage teams, and stay motivated with a modern multi-tier app.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="/">Get started</a>
            <a className="btn btn-outline-secondary btn-lg" href="/">View dashboard</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold">What’s included</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0">Activity logging</li>
                <li className="list-group-item px-0">Team management</li>
                <li className="list-group-item px-0">Leaderboard insights</li>
                <li className="list-group-item px-0">Personalized suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
