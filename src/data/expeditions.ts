export interface Expedition {
  id: string;
  region: string;
  title: string;
  maxDepth: string;
  duration: string;
  description: string;
  waterTemp: string;
  certification: string;
  price: number;
  image: string;
  imageAlt: string;
  dossier: {
    tag: string;
    body: string;
    meta: [string, string][];
  };
}

export interface CalendarDeparture {
  id: string;
  dates: string;
  title: string;
  vesselInfo: string;
  category: 'submersible' | 'ccr';
  berthsRemaining: number;
  pricePerGuest: number;
}

export interface FleetVessel {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  specs: [string, string][];
}

export interface RentalEquipment {
  id: string;
  category: 'rebreather' | 'telemetry' | 'cinema';
  categoryLabel: string;
  name: string;
  dailyRate: number;
  description: string;
  defaultSelected?: boolean;
}

export interface LogbookEntry {
  id: string;
  logNumber: string;
  depthMeters: number;
  title: string;
  gps: string;
  image: string;
  imageAlt: string;
  accentColor: 'jelly' | 'biolum';
  body: string;
  meta: [string, string][];
}

export interface ModalDetail {
  tag: string;
  title: string;
  body: string;
  meta: [string, string][];
}

export const HERO_REEF_IMAGE = '/assets/aistudio/1794827664680_3e82f09b.png';

export const EXPEDITIONS: Expedition[] = [
  {
    id: 'mariana',
    region: 'Guam · Challenger Basalt Rim',
    title: 'Mariana Bathypelagic Descent',
    maxDepth: '1,000m',
    duration: '7 Days',
    description:
      'Board our 3-person acrylic-hulled Triton submersible for an unhurried six-hour benthic survey across hydrothermal chimneys and six-gill shark hunting grounds.',
    waterTemp: '2.4°C – 4.1°C',
    certification: 'Sub-Pilot / Any',
    price: 48500,
    image: '/src/assets/images/expedition_mariana_submersible_1794828174756.jpg',
    imageAlt: 'Acrylic-hulled manned submersible hovering above volcanic basalt ridge',
    dossier: {
      tag: 'Expedition Dossier · 1,000m Submersible',
      body: 'Day 1–2: Embarkation in Guam aboard M/Y Abyssal Sovereign and multi-beam sonar mapping. Day 3–6: Four 6-hour dives inside our Triton 3300/3 acrylic sphere down basalt walls, collecting xenophyophore samples with robotic manipulator arms.',
      meta: [
        ['Max Pressure', '101 ATM (Inside: 1 ATM)'],
        ['Support Vessel', 'M/Y Abyssal Sovereign'],
        ['Life Support', '96-Hour O2 Reserve'],
        ['Pilot Crew', 'Ex-Navy Deep Submariner'],
      ],
    },
  },
  {
    id: 'raja-ampat',
    region: 'Indonesia · Dampier Strait',
    title: 'Raja Ampat Nocturnal Drift',
    maxDepth: '115m',
    duration: '10 Days',
    description:
      'Silent closed-circuit rebreather (CCR) night descents along vertical seamounts illuminated entirely by blue-wavelength fluor-excitation filters and bioluminescent medusae.',
    waterTemp: '21.0°C – 26.5°C',
    certification: 'TDI / GUE CCR',
    price: 24900,
    image: '/src/assets/images/expedition_biolum_drift_1794828173487.jpg',
    imageAlt: 'Bioluminescent jellyfish drifting through midnight ocean water',
    dossier: {
      tag: 'Expedition Dossier · 115m CCR Drift',
      body: 'Explore the nutrient-rich upwellings of the Dampier Strait after dusk. Using 450nm royal-blue excitation torches and yellow barrier filters, witness deep gorgonian walls, walking epaulette sharks, and glowing pelagic jellyfish.',
      meta: [
        ['Gas Blend', 'Trimix 12/60 Diluent'],
        ['Deco Habitat', 'Submerged 6m O2 Station'],
        ['Water Visibility', '35m – 50m'],
        ['Max Group Size', '4 CCR Divers'],
      ],
    },
  },
  {
    id: 'dahab-arch',
    region: 'Red Sea · Dahab Arch',
    title: 'Benthic Sinkhole & Arch',
    maxDepth: '145m',
    duration: '6 Days',
    description:
      'Penetrate the legendary cathedral arch on custom heliox mixes with staged decompression habitats, personal DPV propulsion scooters, and surface-to-diver optical comms.',
    waterTemp: '18.5°C – 22.0°C',
    certification: 'PADI Tec 100 / Cave',
    price: 19200,
    image: '/src/assets/images/expedition_blue_hole_arch_1794828174454.jpg',
    imageAlt: 'Technical rebreather diver on propulsion scooter entering deep limestone arch',
    dossier: {
      tag: 'Expedition Dossier · 145m Technical Arch',
      body: "A precision technical progression culminating in the 145-meter canyon floor below the Red Sea's famous Blue Hole Arch. Full surface-supplied oxygen decompression stations and dedicated safety scooter teams.",
      meta: [
        ['Gas Blend', 'Heliox 10/70'],
        ['Run Time', '210 Minutes Total'],
        ['Chamber Proximity', 'On-Site Mobile Unit'],
        ['Guide Ratio', '1:1 Technical Trainer'],
      ],
    },
  },
];

export const CALENDAR_DEPARTURES: CalendarDeparture[] = [
  {
    id: 'dep-mariana-dec',
    dates: 'Dec 14 – Dec 20, 2026',
    title: 'Mariana Bathypelagic Descent (Leg I)',
    vesselInfo: 'M/Y Abyssal Sovereign · Triton 3300/3 MKII',
    category: 'submersible',
    berthsRemaining: 2,
    pricePerGuest: 48500,
  },
  {
    id: 'dep-raja-jan',
    dates: 'Jan 08 – Jan 17, 2027',
    title: 'Raja Ampat Nocturnal Fluor-Drift',
    vesselInfo: 'M/Y Abyssal Sovereign · Closed-Circuit Rebreather',
    category: 'ccr',
    berthsRemaining: 1,
    pricePerGuest: 24900,
  },
  {
    id: 'dep-dahab-feb',
    dates: 'Feb 19 – Feb 24, 2027',
    title: 'Dahab Benthic Sinkhole & Arch',
    vesselInfo: 'Red Sea Technical Base · Heliox Trimix & Habitat',
    category: 'ccr',
    berthsRemaining: 4,
    pricePerGuest: 19200,
  },
  {
    id: 'dep-tonga-mar',
    dates: 'Mar 11 – Mar 18, 2027',
    title: 'Tonga Trench Hadal Rim Survey',
    vesselInfo: 'M/Y Abyssal Sovereign · Triton 3300/3 MKII',
    category: 'submersible',
    berthsRemaining: 3,
    pricePerGuest: 52000,
  },
];

export const FLEET_VESSELS: FleetVessel[] = [
  {
    id: 'sovereign',
    tabLabel: '01. Flagship Yacht — M/Y Abyssal Sovereign',
    badge: '68-Meter Ice-Class Support Yacht',
    title: 'M/Y Abyssal Sovereign',
    description:
      'Custom-built in Norway and refitted for ultra-luxury oceanographic exploration. Features dynamic positioning (DP2), an A-frame hydraulic submersible launch hangar, a wet-porch trimix blending lab, and six panoramic owner-grade staterooms.',
    image: '/src/assets/images/fleet_expedition_yacht_1794828176112.jpg',
    imageAlt: 'M/Y Abyssal Sovereign expedition superyacht at twilight',
    specs: [
      ['Cruising Range', '6,500 Nautical Miles'],
      ['Guest Capacity', '12 Guests · 22 Crew'],
      ['Gas Blending', 'Continuous Heliox / O2'],
      ['Sonar Array', 'Kongsberg EM 2040'],
    ],
  },
  {
    id: 'triton',
    tabLabel: '02. Submersible — Triton 3300/3 MKII',
    badge: '1,000-Meter Acrylic-Hulled Submersible',
    title: 'Triton 3300/3 MKII',
    description:
      "Featuring the world's thickest distortion-free 360-degree spherical acrylic pressure hull. Guests descend in climate-controlled leather seating at 1 ATM pressure with 7-function Schilling robotic sampling arms and 120,000 lumens of LED cinema lighting.",
    image: '/src/assets/images/expedition_mariana_submersible_1794828174756.jpg',
    imageAlt: 'Triton 3300/3 MKII spherical acrylic submersible at depth',
    specs: [
      ['Operating Depth', '1,000 Meters (3,300 ft)'],
      ['Complement', '1 Pilot + 2 Observers'],
      ['Endurance', '12 Hours + 96h Reserve'],
      ['Lighting Array', '6 × 40,000lm Matrix LED'],
    ],
  },
];

export const RENTAL_EQUIPMENT: RentalEquipment[] = [
  {
    id: 'ccr-evo',
    category: 'rebreather',
    categoryLabel: 'Closed-Circuit CCR',
    name: 'AP Inspiration Evo+ CCR',
    dailyRate: 220,
    description:
      'Dual Vision electronics with Head-Up Display, radial CO2 scrubber, and 3L carbon-wrapped diluent/oxygen cylinders pre-packed with Sofnolime 797.',
  },
  {
    id: 'shearwater',
    category: 'telemetry',
    categoryLabel: 'Decompression Computer',
    name: 'Shearwater Perdix 2 Ti',
    dailyRate: 65,
    description:
      'Titanium bezel multi-gas trimix decompression computer featuring Bühlmann ZHL-16C with Gradient Factors and quad wireless Swift AI transmitters.',
    defaultSelected: true,
  },
  {
    id: 'suex-dpv',
    category: 'telemetry',
    categoryLabel: 'DPV Propulsion Scooter',
    name: 'Suex XK1 Abyssal DPV',
    dailyRate: 180,
    description:
      '200m depth-rated technical scooter with 330-minute Li-Ion runtime, Calypso navigation dashboard, and dead-man magnetic trigger.',
  },
  {
    id: 'red-raptor',
    category: 'cinema',
    categoryLabel: '8K Digital Cinema Rig',
    name: 'RED V-Raptor + Gates Deep',
    dailyRate: 390,
    description:
      'Machined aluminum housing with glass dome port and dual 15,000-lumen Keldan CRI-96 ambient spectrum strobes and fluor-blue excitation arrays.',
  },
];

export const LOGBOOK_ENTRIES: LogbookEntry[] = [
  {
    id: 'log-424',
    logNumber: 'Log #424',
    depthMeters: 95,
    title: 'Coral Sea Bioluminescent Wall',
    gps: '23.44° S, 151.91° E · Great Barrier Drop-Off',
    image: '/src/assets/images/deep_ocean_expedition_photo_1794843575939.jpg',
    imageAlt: 'Technical rebreather diver illuminating sea fans and anthias along a deep coral wall',
    accentColor: 'biolum',
    body: 'Twilight CCR descent along the outer shelf drop-off. Volumetric surface shafts met electric-blue torch beams across dense orange gorgonian sea fans and schooling anthias at 95 meters.',
    meta: [
      ['Depth Recorded', '95.4 Meters'],
      ['Water Temp', '20.6°C'],
      ['Gas Mix', 'Trimix 15/55'],
      ['Visibility', '45.0 Meters'],
    ],
  },
  {
    id: 'log-404',
    logNumber: 'Log #404',
    depthMeters: 30,
    title: 'Capricorn Reef Sunburst',
    gps: '23.44° S, 151.91° E · Australia',
    image: HERO_REEF_IMAGE,
    imageAlt: 'Sunlit coral reef plateau with schools of anthias and distant diver',
    accentColor: 'biolum',
    body: 'Shallow-slope orientation dive off Heron Island prior to offshore abyssal transits. High visibility allowed wide-angle calibration of ambient CRI-96 optics across staghorn and table coral formations.',
    meta: [
      ['Depth Recorded', '28.6 Meters'],
      ['Water Temp', '24.8°C'],
      ['Gas Mix', 'Nitrox EAN32'],
      ['Visibility', '48.0 Meters'],
    ],
  },
  {
    id: 'log-409',
    logNumber: 'Log #409',
    depthMeters: 180,
    title: 'Chrysaora Bioluminescence',
    gps: '00°32′S, 130°28′E · Dampier Strait',
    image: '/src/assets/images/expedition_biolum_drift_1794828173487.jpg',
    imageAlt: 'Bioluminescent jellyfish drifting in mesopelagic darkness',
    accentColor: 'jelly',
    body: 'Captured during slack tide on a closed-circuit rebreather with zero bubble acoustics. Specimen exhibited rhythmic bioluminescent cascades along its marginal tentacles when stimulated by mesopelagic copepod swarms.',
    meta: [
      ['Depth Recorded', '180.4 Meters'],
      ['Water Temp', '15.2°C'],
      ['Gas Mix', 'Heliox 11/65'],
      ['Lead Biologist', 'Dr. Aris Thorne'],
    ],
  },
  {
    id: 'log-412',
    logNumber: 'Log #412',
    depthMeters: 145,
    title: 'Dahab Cathedral Halocline',
    gps: '28°34′N, 34°32′E · Red Sea',
    image: '/src/assets/images/expedition_blue_hole_arch_1794828174454.jpg',
    imageAlt: 'Diver gliding through limestone arch beneath shafts of sunlight',
    accentColor: 'biolum',
    body: 'Executed clean DPV transit beneath the seaward limestone arch. Sharp temperature and salinity interface recorded at 112 meters with crystal-clear vertical sightlines toward the upper reef shelf.',
    meta: [
      ['Depth Recorded', '145.0 Meters'],
      ['Water Temp', '19.4°C'],
      ['Gas Mix', 'Trimix 10/70'],
      ['Total Run Time', '195 Minutes'],
    ],
  },
  {
    id: 'log-419',
    logNumber: 'Log #419',
    depthMeters: 890,
    title: 'Mariana Basalt Ridge',
    gps: '11°21′N, 142°12′E · Mariana Trench',
    image: '/src/assets/images/expedition_mariana_submersible_1794828174756.jpg',
    imageAlt: 'Submersible lighting up volcanic basalt sea floor at 890 meters',
    accentColor: 'biolum',
    body: 'Benthic touchdown along volcanic pillow basalts inside the Triton 3300/3 MKII. Observed two 4-meter bluntnose sixgill sharks circling our bait lander alongside translucent holothurians.',
    meta: [
      ['Depth Recorded', '890.2 Meters'],
      ['Water Temp', '3.1°C'],
      ['Cabin Pressure', '1.0 ATM Constant'],
      ['Bottom Time', '245 Minutes'],
    ],
  },
];
