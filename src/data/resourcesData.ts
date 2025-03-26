
export interface Service {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  openingHours: string;
  description: string;
  lastUpdated: string;
  upvotes: number;
  downvotes: number;
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Hackney Food Bank',
    type: 'Food Bank',
    address: '25 Hackney Road, London E2 8GG',
    distance: '0.8 miles away',
    openingHours: 'Mon-Fri: 10am-4pm, Sat: 10am-1pm',
    description: 'Provides emergency food supplies to individuals and families in crisis. Referral may be required.',
    lastUpdated: '2 days ago',
    upvotes: 32,
    downvotes: 2
  },
  {
    id: '2',
    name: 'East London Job Centre Plus',
    type: 'Job Center',
    address: '14-18 Commercial Street, E1 6LP',
    distance: '1.2 miles away',
    openingHours: 'Mon-Fri: 9am-5pm',
    description: 'Government job center offering employment services, benefit claims and career advice.',
    lastUpdated: '1 week ago',
    upvotes: 18,
    downvotes: 5
  },
  {
    id: '3',
    name: 'Digital Skills Training Hub',
    type: 'Training Program',
    address: '36 Bethnal Green Road, E1 6GH',
    distance: '1.5 miles away',
    openingHours: 'Mon-Thu: 9am-7pm, Fri: 9am-5pm',
    description: 'Free digital skills courses for job seekers including web development, design and data analysis.',
    lastUpdated: '3 days ago',
    upvotes: 45,
    downvotes: 1
  },
  {
    id: '4',
    name: 'Tower Hamlets Housing Support',
    type: 'Housing Support',
    address: '45 Whitechapel Road, E1 1DU',
    distance: '1.8 miles away',
    openingHours: 'Mon-Fri: 9am-5pm',
    description: 'Provides housing advice, homelessness prevention services and temporary accommodation assistance.',
    lastUpdated: '5 days ago',
    upvotes: 29,
    downvotes: 3
  },
  {
    id: '5',
    name: 'East End Financial Advice Centre',
    type: 'Financial Aid',
    address: '12 Brick Lane, London E1 6RF',
    distance: '1.3 miles away',
    openingHours: 'Mon, Wed, Fri: 10am-4pm',
    description: 'Free financial advice, debt management support and benefits guidance for local residents.',
    lastUpdated: '1 day ago',
    upvotes: 37,
    downvotes: 2
  },
  {
    id: '6',
    name: 'Bethnal Green Community Health Centre',
    type: 'Healthcare',
    address: '27 Old Ford Road, E2 9PL',
    distance: '1.6 miles away',
    openingHours: 'Mon-Fri: 8am-6:30pm',
    description: 'Provides free healthcare services including mental health support and wellbeing programs.',
    lastUpdated: '4 days ago',
    upvotes: 51,
    downvotes: 4
  }
];
