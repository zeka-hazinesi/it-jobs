'use client';

// Primary tech filters (always visible)
const primaryTechCategories = [
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
];

// Hidden tech filters (revealed on hover)
const hiddenPrimaryTechCategories = [
  { id: 'qa', label: 'QA, Test', icon: '🔍', color: '#10b981' },
  { id: 'ml', label: 'ML, AI', icon: '🤖', color: '#ec4899' },
  { id: 'security', label: 'Security', icon: '🔒', color: '#ef4444' },
  { id: 'network', label: 'Network', icon: '🌐', color: '#06b6d4' },
  { id: 'gamedev', label: 'GameDev', icon: '🎮', color: '#a855f7' },
  { id: 'blockchain', label: 'Blockchain', icon: '⛓️', color: '#f97316' },
];

// Secondary tech filters (revealed on hover)
const secondaryTechCategories = [
  { id: 'uxui', label: 'UX, UI', icon: '🎨', color: '#06b6d4' },
  { id: 'architect', label: 'Architect', icon: '👤', color: '#3b82f6' },
  { id: 'business', label: 'Business', icon: 'B', color: '#6b7280' },
  { id: 'manager', label: 'Manager', icon: '👔', color: '#6b7280' },
  { id: 'support', label: 'Support', icon: '🎧', color: '#6b7280' },
  { id: 'rust', label: 'Rust', icon: '🦀', color: '#b7410e' },
  { id: 'hardware', label: 'Hardware', icon: '🔧', color: '#22c55e' },
  { id: 'nocode', label: 'No-Code', icon: '✨', color: '#8b5cf6' },
];

// Primary locations (always visible)
const primaryLocations = [
  'remote',
  'Zürich',
  'Aarau',
  'Baden',
  'Basel',
  'Bern',
  'Biel',
  'Chur',
  'Freiburg',
  'Genf',
  'Olten',
  'Lausanne',
];

// Hidden primary locations (revealed on hover)
const hiddenPrimaryLocations = [
  'Liechtenstein',
  'Lugano',
  'Luzern',
  'Schaffhausen',
];

// Secondary locations (revealed on hover)
const secondaryLocations = [
  'Sitten',
  'Solothurn',
  'St. Gallen',
  'Thun',
  'Winterthur',
  'Zug',
];

const expandedTechCategories = [
  ...hiddenPrimaryTechCategories,
  ...secondaryTechCategories,
];

const expandedLocations = [
  ...hiddenPrimaryLocations,
  ...secondaryLocations,
];

export const techCategories = [
  ...primaryTechCategories,
  ...hiddenPrimaryTechCategories,
  ...secondaryTechCategories,
];

export const locations = [
  ...primaryLocations,
  ...hiddenPrimaryLocations,
  ...secondaryLocations,
];

interface FilterBarProps {
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  selectedLocation: string | null;
  onSelectLocation: (location: string | null) => void;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  onLocationFocus: (location: string | null) => void;
}

export default function FilterBar({
  selectedTech,
  onSelectTech,
  selectedLocation,
  onSelectLocation,
  isExpanded,
  onExpandChange,
  onLocationFocus,
}: FilterBarProps) {

  const handleTechClick = (techId: string) => {
    onSelectTech(selectedTech === techId ? null : techId);
  };

  const handleLocationClick = (location: string) => {
    const nextLocation = selectedLocation === location ? null : location;
    onSelectLocation(nextLocation);
    onLocationFocus(nextLocation);
  };

  return (
    <div
      className={`filter-bar-wrapper ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => onExpandChange(true)}
      onMouseLeave={() => onExpandChange(false)}
    >
      {/* Tech Filter Row */}
      <div className="tech-filter-wrapper">
        <div className="tech-filter-header">
          <div className="tech-filter">
            {primaryTechCategories.map((tech) => (
              <button
                key={tech.id}
                className={`tech-btn ${selectedTech === tech.id ? 'active' : ''}`}
                onClick={() => handleTechClick(tech.id)}
                title={tech.label}
              >
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-label">{tech.label}</span>
              </button>
            ))}
          </div>
          <div className="filter-bar-actions">
            <button className="more-filters-btn">
              <span>☰</span> Weitere Filter
            </button>
          </div>
        </div>
        <div className={`secondary-filters ${isExpanded ? 'expanded' : ''}`}>
          {expandedTechCategories.map((tech) => (
            <button
              key={tech.id}
              className={`tech-btn ${selectedTech === tech.id ? 'active' : ''}`}
              onClick={() => handleTechClick(tech.id)}
              title={tech.label}
            >
              <span className="tech-icon">{tech.icon}</span>
              <span className="tech-label">{tech.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Location Filter Row */}
      <div className="location-filter-wrapper">
        <div className="location-filter">
          {primaryLocations.map((location) => (
            <button
              key={location}
              className={`location-btn ${selectedLocation === location ? 'active' : ''}`}
              onClick={() => handleLocationClick(location)}
            >
              {location}
            </button>
          ))}
        </div>
        <div className={`secondary-locations ${isExpanded ? 'expanded' : ''}`}>
          {expandedLocations.map((location) => (
            <button
              key={location}
              className={`location-btn ${selectedLocation === location ? 'active' : ''}`}
              onClick={() => handleLocationClick(location)}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
