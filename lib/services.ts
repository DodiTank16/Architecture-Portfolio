export interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  startingAt: string;
}

export const services: Service[] = [
  {
    id: 'architecture',
    icon: 'Building2',
    title: 'Architecture',
    subtitle: 'New builds & extensions',
    description:
      'From concept to completion, we design buildings that balance beauty, function, and longevity. Our architectural services span residential villas, commercial towers, institutional buildings, and mixed-use developments — each approached with the same rigour and craft.',
    features: [
      'Concept design and feasibility studies',
      'Schematic and developed design',
      'Construction documentation',
      'Permit and regulatory submissions',
      'Tender management and contractor selection',
      'Site supervision and quality assurance',
    ],
    startingAt: '₹80/sq ft',
  },
  {
    id: 'interior',
    icon: 'Sofa',
    title: 'Interior Design',
    subtitle: 'Spaces that tell your story',
    description:
      'Our interior design practice creates environments with a strong sense of identity and purpose. From the selection of materials and finishes to the commissioning of bespoke furniture and art curation, every interior we design is a total work. We work closely with clients to understand their lifestyle, aesthetics, and aspirations.',
    features: [
      'Space planning and layout optimization',
      'Material and finish specification',
      'Bespoke furniture design and sourcing',
      'Lighting design (ambient, task, accent)',
      'Art curation and styling',
      'Project management and site installation',
    ],
    startingAt: '₹1,200/sq ft',
  },
  {
    id: 'planning',
    icon: 'Map',
    title: 'Urban Planning',
    subtitle: 'Master plans & townships',
    description:
      'At the urban scale, we plan communities, campuses, and master developments that prioritize human experience, ecological resilience, and long-term value. Our urban planning work integrates transportation, open space, mixed uses, and infrastructure into coherent, liveable environments.',
    features: [
      'Master planning and land use studies',
      'Zoning and regulatory frameworks',
      'Mobility and infrastructure planning',
      'Open space and landscape strategy',
      'Phasing and implementation strategy',
      'Community and stakeholder consultation',
    ],
    startingAt: 'Custom pricing',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin with a deep listening session to understand your vision, lifestyle, budget, and timeline. No assumptions, no shortcuts.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'Our designers translate your brief into spatial concepts — exploring ideas through sketches, diagrams, and 3D models before committing to a direction.',
  },
  {
    number: '03',
    title: 'Design Development',
    description: 'The chosen concept is developed in detail: every space, material, and detail is resolved through an iterative process of design and client feedback.',
  },
  {
    number: '04',
    title: 'Execution',
    description: 'We coordinate contractors, manage procurement, and supervise construction to ensure your project is delivered on time, on budget, and to the highest standard.',
  },
];
