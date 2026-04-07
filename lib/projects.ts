export type ProjectCategory = 'Residential' | 'Commercial' | 'Interior';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  area: string;
  budget: string;
  tagline: string;
  description: string;
  overview: string;
  process: string;
  heroImage: string;
  images: string[];
  floorPlanImage: string;
  beforeImage: string;
  afterImage: string;
  testimonial: {
    name: string;
    role: string;
    quote: string;
  };
  features: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'skyline-residence',
    title: 'Skyline Residence',
    category: 'Residential',
    location: 'Mumbai, Maharashtra',
    year: 2024,
    area: '5,200 sq ft',
    budget: '₹4.2 Cr',
    tagline: 'Where luxury meets the horizon',
    description: 'A contemporary high-rise residence that redefines urban living with its seamless blend of indoor-outdoor spaces and breathtaking panoramic views.',
    overview:
      'Perched atop a prime Mumbai location, Skyline Residence was conceived as a sanctuary above the city. The design philosophy centered on maximizing natural light and views while creating distinct functional zones. Floor-to-ceiling glazing frames the Arabian Sea to the west, while a cantilevered terrace extends the living space into the open sky. Every material was selected for durability, sustainability, and visual harmony — from the hand-selected Italian marble to the custom-milled oak joinery.',
    process:
      'The design process began with an intensive site analysis spanning three months. We studied sun paths, prevailing winds, and visual corridors before arriving at the final form. Parametric modeling helped us optimize the façade shading system, reducing solar heat gain by 40% while preserving views. The structural solution — a post-tensioned slab system — allowed us to eliminate internal columns, creating the flowing open plan our clients envisioned.',
    heroImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    beforeImage:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    testimonial: {
      name: 'Raj & Priya Mehta',
      role: 'Homeowners',
      quote:
        'The team turned our dream of a floating home in the sky into reality. Every detail — from the sunrise we see through the bedroom glass to the way light plays across the marble floors — exceeds what we imagined possible.',
    },
    features: [
      'Double-height living room with panoramic glazing',
      'Cantilevered infinity terrace',
      'Smart home automation (lighting, climate, security)',
      'Private lift lobby',
      'Chef\'s kitchen with island bar',
      'Master suite with spa bathroom',
    ],
    tags: ['High-rise', 'Luxury', 'Sea view', 'Smart home'],
  },
  {
    id: '2',
    slug: 'meridian-tower',
    title: 'Meridian Tower',
    category: 'Commercial',
    location: 'Delhi, NCR',
    year: 2023,
    area: '1,20,000 sq ft',
    budget: '₹85 Cr',
    tagline: 'A landmark for the next century',
    description: 'A 24-story corporate headquarters that sets a new benchmark for sustainable commercial architecture in the capital, earning LEED Platinum certification.',
    overview:
      'Meridian Tower rises as a quiet authority in Delhi\'s rapidly evolving commercial landscape. The design responds to the harsh Delhi climate with a double-skin façade — an outer layer of perforated aluminium panels that filter solar radiation while creating a shimmering, ever-changing exterior expression. Behind the screen, high-performance glazing floods the interiors with diffused daylight. The podium houses retail and a public plaza that has become a beloved urban gathering space.',
    process:
      'Commissioned as a flagship headquarters for a Fortune 500 client, the brief demanded a building that would communicate strength, innovation, and responsibility. We engaged extensively with climate consultants, wind engineers, and sustainability experts throughout the design process. Advanced CFD simulations informed the building\'s orientation and massing, while BIM coordination ensured seamless integration of structural, mechanical, and electrical systems.',
    heroImage:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage:
      'https://images.unsplash.com/photo-1587301669167-29ed7ea2f32b?auto=format&fit=crop&w=1200&q=80',
    beforeImage:
      'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80',
    testimonial: {
      name: 'Vikram Nair',
      role: 'CEO, Meridian Group',
      quote:
        'Our new headquarters has transformed how our employees feel about coming to work. The quality of light, the thoughtful amenities, and the sheer beauty of the building have made it a source of genuine pride for everyone in our organization.',
    },
    features: [
      'LEED Platinum certified',
      'Double-skin perforated aluminium façade',
      '2,000-seat auditorium',
      'Sky gardens on alternate floors',
      'Triple-height entrance atrium',
      'EV charging and cycle hub',
    ],
    tags: ['LEED Platinum', 'Skyscraper', 'Corporate', 'Sustainable'],
  },
  {
    id: '3',
    slug: 'verdant-villa',
    title: 'Verdant Villa',
    category: 'Residential',
    location: 'Bangalore, Karnataka',
    year: 2024,
    area: '8,400 sq ft',
    budget: '₹6.8 Cr',
    tagline: 'Architecture rooted in nature',
    description: 'A sprawling villa on a tree-filled acre in Whitefield that draws the outside in through generous courtyards, water features, and living green walls.',
    overview:
      'Verdant Villa began with a simple directive: do not cut a single tree. Working around an extraordinary canopy of rain trees, we developed a plan that embraces the landscape as architecture. Three pavilions — living, sleeping, and leisure — are connected by sheltered walkways and open courtyards. Rainwater harvesting feeds the infinity pool and the irrigation system. Solar panels on the roof provide 80% of the home\'s energy needs. The result is a home that breathes with its landscape.',
    process:
      'The site presented us with both constraints and gifts. The 23 mature trees demanded a careful structural strategy — all foundations were engineered to avoid root zones. The building\'s footprint emerged directly from the tree positions, which in turn shaped the plan\'s organic geometry. We worked with a landscape architect, a water features designer, and a horticulturist as integral members of the design team from the very beginning.',
    heroImage:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    beforeImage:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    testimonial: {
      name: 'Ananya & Siddharth Rao',
      role: 'Homeowners',
      quote:
        'Waking up here feels like living inside a botanical garden. The architects understood that we did not want a house that dominated the land — we wanted one that belonged to it. They achieved something we did not think was possible.',
    },
    features: [
      'Three-pavilion layout around mature trees',
      'Living green walls and vertical gardens',
      'Rainwater harvesting system',
      '80% solar-powered',
      'Infinity pool with landscape integration',
      'Open-plan kitchen flowing to courtyard',
    ],
    tags: ['Biophilic', 'Sustainable', 'Villa', 'Green'],
  },
  {
    id: '4',
    slug: 'grove-interior',
    title: 'The Grove Interior',
    category: 'Interior',
    location: 'Hyderabad, Telangana',
    year: 2023,
    area: '3,100 sq ft',
    budget: '₹1.9 Cr',
    tagline: 'Warmth, texture, and timeless craft',
    description: 'A duplex penthouse interior that layers natural materials, curated art, and bespoke furniture into a deeply personal home with a hotel-like finish.',
    overview:
      'The clients — a couple with a deep love of travel, art, and gastronomy — wanted their penthouse to feel collected rather than designed. Our response was to build a material palette around natural textures: limewash walls, handmade terracotta tiles, rough-hewn travertine, and warm-toned American walnut joinery. Every piece of furniture was either custom-designed or sourced directly from artisan workshops. The art collection, built over years, guided many of our spatial decisions — rooms were planned around canvases rather than the reverse.',
    process:
      'We began with an extensive briefing process — three workshops over six weeks to understand how the clients actually live, entertain, and rest. Mood boards gave way to material sampling sessions, where textures and colors were auditioned in the actual light conditions of the space. Our designers visited artisan workshops in Rajasthan and Italy to source materials and commission custom pieces. The installation phase was orchestrated with the precision of a stage set.',
    heroImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    beforeImage:
      'https://images.unsplash.com/photo-1443383718081-763e1c660abe?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    testimonial: {
      name: 'Kavya & Arjun Sharma',
      role: 'Penthouse Owners',
      quote:
        'Every time we return home after a trip, we feel like we are checking into the world\'s best hotel. But it is ours, it is personal, and it tells our story. The team listened to us in a way no designer ever had before.',
    },
    features: [
      'Bespoke kitchen with La Cornue range',
      'Custom walnut library and reading nook',
      'Limewash plastered walls throughout',
      'Hand-knotted wool rugs (custom)',
      'Wine cellar and tasting room',
      'Double-height living room with mezzanine',
    ],
    tags: ['Bespoke', 'Artisan', 'Luxury Interior', 'Penthouse'],
  },
  {
    id: '5',
    slug: 'urban-nexus',
    title: 'Urban Nexus Office',
    category: 'Commercial',
    location: 'Mumbai, Maharashtra',
    year: 2023,
    area: '45,000 sq ft',
    budget: '₹22 Cr',
    tagline: 'Workspaces that inspire',
    description: 'A collaborative office campus for a tech unicorn that reimagines the workplace as a series of connected neighborhoods, each with its own character.',
    overview:
      'Urban Nexus was a post-pandemic brief: design an office that gives people a compelling reason to leave home. Our answer was to create a campus of neighborhoods — each floor organized around a distinct spatial identity and work culture. The ground floor functions as a public-facing innovation hub, with a café, event space, and maker lab open to the wider community. Upper floors transition from energetic collaborative zones to quiet focus environments, culminating in a rooftop garden and wellness center.',
    process:
      'We began with an employee survey of 800 people, which revealed a clear demand for variety — people wanted the ability to choose their environment based on their mood and task. This insight drove our programming and planning strategies. We integrated extensive biophilic elements, acoustic zoning, and a palette of furniture types across every floor. Wayfinding was designed as a discovery system — encouraging exploration rather than just navigation.',
    heroImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage:
      'https://images.unsplash.com/photo-1587301669167-29ed7ea2f32b?auto=format&fit=crop&w=1200&q=80',
    beforeImage:
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    testimonial: {
      name: 'Rohan Kapoor',
      role: 'Head of Operations, TechFlow',
      quote:
        'Our office attendance went from 35% to 72% after we moved in. The space has done what every article about the future of work promises but rarely delivers: it actually makes people want to be there.',
    },
    features: [
      'Activity-based working across 5 neighborhood zones',
      'Public innovation hub on ground floor',
      'Rooftop wellness center and garden',
      'Acoustically zoned focus pods',
      '600-person all-hands auditorium',
      'Circadian lighting throughout',
    ],
    tags: ['Tech', 'Collaborative', 'Activity-based', 'LEED Gold'],
  },
  {
    id: '6',
    slug: 'lakeside-retreat',
    title: 'Lakeside Retreat',
    category: 'Residential',
    location: 'Udaipur, Rajasthan',
    year: 2024,
    area: '12,000 sq ft',
    budget: '₹9.5 Cr',
    tagline: 'Serenity at the water\'s edge',
    description: 'A destination residence on the banks of Lake Pichola, drawing on the vernacular architecture of Rajasthan while embracing a clean, contemporary sensibility.',
    overview:
      'Lakeside Retreat sits at the intersection of heritage and modernity. On a site overlooking two of Rajasthan\'s most iconic landmarks, the building had to acknowledge its context without resorting to pastiche. We worked with local stone masons and craftspeople to create facades in hand-cut Makrana marble and Kota stone, combined with laser-cut jaali screens that filter the fierce Rajasthani light. The plan organizes around a central courtyard with a reflecting pool — a classical typology reinterpreted for contemporary living.',
    process:
      'The design process was inseparable from its cultural context. We spent months researching the architecture of havelis and palace complexes, understanding their spatial logic before abstracting it into our design language. Local craftspeople were engaged in the earliest design phases — their expertise shaped our understanding of what was possible in stone, plaster, and metalwork. The building\'s palette of materials was sourced entirely within Rajasthan.',
    heroImage:
      'https://images.unsplash.com/photo-1494526585095-c41746fe96b4?auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578645635768-8f3a8264f1e7?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    beforeImage:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1494526585095-c41746fe96b4?auto=format&fit=crop&w=1200&q=80',
    testimonial: {
      name: 'Ishaan Singhania',
      role: 'Homeowner',
      quote:
        'Standing on the terrace at sunset, looking out over the lake, I cannot believe this is home. The architects understood that the view was the real client here, and they designed everything to serve that moment.',
    },
    features: [
      'Hand-cut Makrana marble and Kota stone façade',
      'Laser-cut jaali screens throughout',
      'Central courtyard with reflecting pool',
      'Private ghats leading to the lake',
      'Rooftop observatory and telescope room',
      'Traditional fresco murals by Udaipur artists',
    ],
    tags: ['Heritage', 'Lakefront', 'Rajasthani', 'Bespoke Craft'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}
