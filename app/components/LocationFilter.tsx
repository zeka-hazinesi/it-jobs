'use client';

// Primary locations (always visible in one line)
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

const locations = [...primaryLocations, ...secondaryLocations];

interface LocationFilterProps {
  selectedLocation: string | null;
  onSelectLocation: (location: string | null) => void;
}

export default function LocationFilter({ selectedLocation, onSelectLocation }: LocationFilterProps) {
  const handleClick = (location: string) => {
    onSelectLocation(selectedLocation === location ? null : location);
  };

  return (
    <div className="location-filter-wrapper">
      <div className="location-filter">
        {primaryLocations.map((location) => (
          <button
            key={location}
            className={`location-btn ${selectedLocation === location ? 'active' : ''}`}
            onClick={() => handleClick(location)}
          >
            {location}
          </button>
        ))}
      </div>
      <div className="secondary-locations">
        {secondaryLocations.map((location) => (
          <button
            key={location}
            className={`location-btn ${selectedLocation === location ? 'active' : ''}`}
            onClick={() => handleClick(location)}
          >
            {location}
          </button>
        ))}
      </div>
    </div>
  );
}

export { locations };
