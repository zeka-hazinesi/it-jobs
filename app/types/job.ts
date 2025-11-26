export interface Job {
  _id: string;
  jobUrl: string;
  isPartner: boolean;
  isPaused: boolean;
  companyId: string;
  longitude: number;
  latitude: number;
  cityCategory: string;
  logoImg: string;
  activeFrom: string;
  company: string;
  address: string;
  actualCity: string;
  postalCode: string;
  companyType: string;
  companySize: string;
  hasVisaSponsorship: string;
  language: string;
  perkKeys: string[];
  name: string;
  jobType: string;
  expLevel: string;
  annualSalaryFrom: number;
  annualSalaryTo: number;
  techCategory: string;
  technologies: string[];
  filterTags: string[];
  workplace: string;
  redirectJobUrl?: string;
  companyWebsiteLink?: string;
  candidateContactWay?: string;
  applyQuestions?: string[];
}

export type TechCategory = 
  | 'C#/.NET' | 'Data' | 'Golang' | 'Java' | 'JavaScript' | 'Mobile' 
  | 'PHP' | 'Python' | 'Ruby' | 'SAP' | 'System' | 'DevOps' | 'IT' 
  | 'Database' | 'QA, Test' | 'ML, AI' | 'Security' | 'Network' 
  | 'GameDev' | 'Blockchain';

export type LocationCategory = 
  | 'remote' | 'Zürich' | 'Aarau' | 'Baden' | 'Basel' | 'Bern' 
  | 'Biel' | 'Chur' | 'Freiburg' | 'Genf' | 'Olten' | 'Lausanne' 
  | 'Liechtenstein' | 'Lugano' | 'Luzern' | 'Schaffhausen';

