'use client';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo">
          <span className="logo-sd">SD</span>
          <span className="logo-colon">:&gt;_</span>
        </a>
        <nav className="nav-links">
          <a href="#" className="nav-link">Jobs</a>
          <a href="#" className="nav-link">Transparente Arbeitgeber</a>
          <a href="#" className="nav-link dropdown">Gehälter <span className="arrow">▾</span></a>
          <a href="#" className="nav-link dropdown">Für Jobsuchende <span className="arrow">▾</span></a>
        </nav>
      </div>
      <div className="header-right">
        <a href="#" className="nav-link dropdown">Andere Länder <span className="arrow">▾</span></a>
        <a href="#" className="nav-link">Über uns</a>
        <a href="#" className="nav-link dropdown">Für Arbeitgeber <span className="arrow">▾</span></a>
        <button className="post-job-btn">Job veröffentlichen / Einloggen</button>
        <div className="language-flags">
          <span className="flag">🇬🇧</span>
          <span className="flag">🇩🇪</span>
          <span className="flag">🇮🇹</span>
        </div>
      </div>
    </header>
  );
}

