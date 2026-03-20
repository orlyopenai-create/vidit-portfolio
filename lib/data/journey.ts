export interface JourneyCity {
  id: string
  name: string
  coordinates: [number, number]
  period: string
  role: string
  description: string
}

export const journeyCities: JourneyCity[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    coordinates: [72.8777, 19.076],
    period: '2016 – 2021',
    role: 'Student → IB Analyst · Nomura',
    description:
      'B.Sc Economics at NMIMS, then IB Analyst at Nomura — where the foundation was built.',
  },
  {
    id: 'london',
    name: 'London',
    coordinates: [-0.1278, 51.5074],
    period: '2021 – 2023',
    role: 'IB Associate, EMEA M&A · Nomura',
    description:
      'First time living abroad. 15-person team from 11 countries — immense personal growth. Top-ranked Analyst both years.',
  },
  {
    id: 'delhi',
    name: 'Delhi',
    coordinates: [77.209, 28.6139],
    period: '2023 – 2025',
    role: 'Chief of Staff & Head of Investments · BSC',
    description:
      'Joined BSC to learn at the intersection of investing, operating, and content. Learnt what I\'m made of.',
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    coordinates: [88.3639, 22.5726],
    period: '2025 – Present',
    role: 'Head of Business · Orly',
    description:
      'Moved home for family. Using every tool I\'d built to modernise Orly — our men\'s ethnicwear brand, est. 1989.',
  },
]
