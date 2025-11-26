'use client';

// Primary filters (always visible in one line)
const primaryCategories = [
  { id: 'cplusplus', label: 'C / C++', icon: 'C++', color: '#00599c' },
  { id: 'csharp', label: 'C#/.NET', icon: 'N', color: '#68217a' },
  { id: 'data', label: 'Data', icon: '📊', color: '#3b82f6' },
  { id: 'golang', label: 'Golang', icon: 'Go', color: '#00add8' },
  { id: 'java', label: 'Java', icon: '☕', color: '#ed8b00' },
  { id: 'javascript', label: 'JavaScript', icon: 'JS', color: '#f7df1e' },
  { id: 'mobile', label: 'Mobile', icon: '📱', color: '#34d399' },
  { id: 'php', label: 'PHP', icon: 'PHP', color: '#777bb4' },
  { id: 'python', label: 'Python', icon: '🐍', color: '#3776ab' },
  { id: 'ruby', label: 'Ruby', icon: '💎', color: '#cc342d' },
  { id: 'sap', label: 'SAP', icon: 'SAP', color: '#0faaff' },
  { id: 'system', label: 'System', icon: '⚙️', color: '#6b7280' },
  { id: 'devops', label: 'DevOps', icon: '🔄', color: '#22c55e' },
  { id: 'it', label: 'IT', icon: '💻', color: '#8b5cf6' },
  { id: 'database', label: 'Database', icon: '🗄️', color: '#f59e0b' },
  { id: 'qa', label: 'QA, Test', icon: '🔍', color: '#10b981' },
  { id: 'ml', label: 'ML, AI', icon: '🤖', color: '#ec4899' },
  { id: 'security', label: 'Security', icon: '🔒', color: '#ef4444' },
  { id: 'network', label: 'Network', icon: '🌐', color: '#06b6d4' },
  { id: 'gamedev', label: 'GameDev', icon: '🎮', color: '#a855f7' },
  { id: 'blockchain', label: 'Blockchain', icon: '⛓️', color: '#f97316' },
];

// Secondary filters (revealed on hover)
const secondaryCategories = [
  { id: 'uxui', label: 'UX, UI', icon: '🎨', color: '#06b6d4' },
  { id: 'architect', label: 'Architect', icon: '👤', color: '#3b82f6' },
  { id: 'business', label: 'Business', icon: 'B', color: '#6b7280' },
  { id: 'manager', label: 'Manager', icon: '👔', color: '#6b7280' },
  { id: 'support', label: 'Support', icon: '🎧', color: '#6b7280' },
  { id: 'rust', label: 'Rust', icon: '🦀', color: '#b7410e' },
  { id: 'hardware', label: 'Hardware', icon: '🔧', color: '#22c55e' },
  { id: 'nocode', label: 'No-Code', icon: '✨', color: '#8b5cf6' },
];

const techCategories = [...primaryCategories, ...secondaryCategories];

interface TechFilterProps {
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
}

export default function TechFilter({ selectedTech, onSelectTech }: TechFilterProps) {
  const handleClick = (techId: string) => {
    onSelectTech(selectedTech === techId ? null : techId);
  };

  return (
    <div className="tech-filter-wrapper">
      <div className="tech-filter">
        {primaryCategories.map((tech) => (
          <button
            key={tech.id}
            className={`tech-btn ${selectedTech === tech.id ? 'active' : ''}`}
            onClick={() => handleClick(tech.id)}
            title={tech.label}
          >
            <span className="tech-icon">{tech.icon}</span>
            <span className="tech-label">{tech.label}</span>
          </button>
        ))}
        <div className="more-filters-container">
          <button className="more-filters-btn">
            <span>☰</span> Weitere Filter
          </button>
        </div>
      </div>
      <div className="secondary-filters">
        {secondaryCategories.map((tech) => (
          <button
            key={tech.id}
            className={`tech-btn ${selectedTech === tech.id ? 'active' : ''}`}
            onClick={() => handleClick(tech.id)}
            title={tech.label}
          >
            <span className="tech-icon">{tech.icon}</span>
            <span className="tech-label">{tech.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { techCategories };
