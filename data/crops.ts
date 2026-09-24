import { CropInfo } from '@/types/product';

export const CROPS_DATA: CropInfo[] = [
  {
    id: 'chilli',
    name: 'Chilli',
    slug: 'chilli',
    tagline: 'High-pungency, uniform fruit set, and disease-resilient canopy nutrition.',
    icon: '🌶️',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80',
    scientificName: 'Capsicum annuum',
    season: 'Kharif & Rabi (Transplanted)',
    soilPreference: 'Well-drained sandy loam or black soils with pH 6.0 - 7.5',
    description: 'Chilli crops require targeted nutrient delivery across vegetative flushes and continuous flowering flushes. Deficiencies in Calcium and Boron lead to blossom-end rot and heavy flower drop, while balanced Potassium is critical for vibrant pod color and capsaicin development.',
    keyNutrientNeeds: [
      'Chelated Zinc & Boron during pre-bloom to minimize flower drop',
      'Calcium-Boron synergists to avoid fruit cracking and blossom-end rot',
      'High-potassium water soluble nutrition during pod elongation',
      'Seaweed bio-stimulants during moisture and temperature stress flushes'
    ],
    stages: [
      {
        stage: 'Nursery / Early Growth',
        duration: 'Days 1 - 25 post-transplant',
        description: 'Focus on root branching, mycorrhizal establishment, and seedling acclimatization.',
        recommendedNutrients: 'High Phosphorus starter + Bio-inoculants (MycoGrow Matrix, 12-61-00)',
        keyRisk: 'Transplant shock and damping off'
      },
      {
        stage: 'Vegetative Stage',
        duration: 'Days 25 - 55',
        description: 'Rapid foliage development, lateral branch formation, and canopy expansion.',
        recommendedNutrients: 'Balanced 19-19-19 crystal fertigation + Magnesium Sulphate + Zinc EDTA',
        keyRisk: 'Stunted branching and pale yellowing'
      },
      {
        stage: 'Flowering & Blooming',
        duration: 'Days 55 - 85',
        description: 'First and second reproductive flush; heavy pollen production and ovary set.',
        recommendedNutrients: '00-52-34 Mono Potassium Phosphate + Boron 20% foliar spray + Cal-Mag',
        keyRisk: 'Severe flower drop due to temperature fluctuations'
      },
      {
        stage: 'Fruit & Grain Setting',
        duration: 'Days 85 - 120',
        description: 'Pod elongation, capsaicin synthesis, fruit wall thickening, and color development.',
        recommendedNutrients: 'Potassium Nitrate 13-00-45 + Amino Acid Booster + Potassium Silicate',
        keyRisk: 'Fruit cracking, sunscald, and sub-optimal pungency'
      },
      {
        stage: 'Maturity & Harvest',
        duration: 'Days 120 - 150+',
        description: 'Uniform ripening, red pigmentation development, and post-picking firmness.',
        recommendedNutrients: 'SOP (Sulphate of Potash 00-00-50) + Seaweed tonic',
        keyRisk: 'Uneven drying and post-harvest weight loss'
      }
    ],
    productCount: 12,
  },
  {
    id: 'rice',
    name: 'Rice',
    slug: 'rice',
    tagline: 'High tillering, strong panicle initiation, and robust grain weight density.',
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1600&q=80',
    scientificName: 'Oryza sativa',
    season: 'Kharif, Rabi & Boro seasons',
    soilPreference: 'Clay loam or heavy clay soils capable of water retention (pH 5.5 - 7.0)',
    description: 'Paddy is a heavy feeder of nitrogen, potassium, silicon, and zinc. Modern high-yielding paddy varieties face widespread "Khaira disease" due to submerged soil zinc immobilization. Timely zinc chelation and late-stage potassium top dressing ensure maximum thousand-grain weight.',
    keyNutrientNeeds: [
      'Basal Zinc EDTA chelation to prevent early submerged Khaira chlorosis',
      'Split nitrogen management coupled with humic matrix to minimize leaching',
      'Silicate cell-wall strengtheners to prevent lodging during wind and rain storms',
      'Potassium foliar feed at boot leaf stage to eliminate chaffy / empty grains'
    ],
    stages: [
      {
        stage: 'Nursery / Early Growth',
        duration: 'Days 1 - 21 (Nursery to Transplanting)',
        description: 'Nursery root vigor and root seedling resilience before puddle transplanting.',
        recommendedNutrients: 'Zinc EDTA 12% + Seaweed root dip + Phosphate culture',
        keyRisk: 'Weak root crowns and poor stand establishment'
      },
      {
        stage: 'Vegetative Stage',
        duration: 'Days 21 - 50 (Active Tillering)',
        description: 'Production of maximum productive tillers per hill and leaf area index.',
        recommendedNutrients: 'Granular NPK + Humic Acid Matrix + Chelated Iron & Zinc',
        keyRisk: 'Low productive tiller count and submerged weed competition'
      },
      {
        stage: 'Flowering & Blooming',
        duration: 'Days 50 - 75 (Panicle Primordium to Anthesis)',
        description: 'Flag leaf photosynthesis optimization, boot leaf emergence, and pollen viability.',
        recommendedNutrients: '00-52-34 Foliar + Soluble Boron 20% + Potassium Silicate Shield',
        keyRisk: 'Lodging and bacterial leaf blight vulnerability'
      },
      {
        stage: 'Fruit & Grain Setting',
        duration: 'Days 75 - 105 (Milking & Dough Stage)',
        description: 'Translocation of carbohydrates into the grain cavity; filling from tip to base.',
        recommendedNutrients: '13-00-45 (Potassium Nitrate) foliar spray + Amino Acid booster',
        keyRisk: 'Chaffy grain percentage and incomplete tip filling'
      },
      {
        stage: 'Maturity & Harvest',
        duration: 'Days 105 - 125',
        description: 'Grain drying, golden husk color development, and moisture equilibrium.',
        recommendedNutrients: 'No chemical input; maintain clean moisture draining',
        keyRisk: 'Grain shattering and lodging prior to combine harvesting'
      }
    ],
    productCount: 11,
  },
  {
    id: 'cotton',
    name: 'Cotton',
    slug: 'cotton',
    tagline: 'Vigorous sympodial branching, boll retention, and staple fiber length.',
    icon: '🌿',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1595856428453-27757ee92501?auto=format&fit=crop&w=1600&q=80',
    scientificName: 'Gossypium hirsutum',
    season: 'Kharif (Monsoon sown)',
    soilPreference: 'Deep black cotton soils (Vertisols) or fertile alluvial loam',
    description: 'Cotton exhibits indeterminate growth where vegetative and reproductive flushes compete simultaneously for photoassimilates. Square and boll shedding is heavily driven by nutrient competition, magnesium deficiency (leaf reddening), and boron deficits. Targeted foliar nutrition controls shedding.',
    keyNutrientNeeds: [
      'Magnesium Sulphate supplementation to arrest premature leaf reddening',
      'Boron 20% to ensure pollen tube growth and reduce square shedding',
      'Potassium dominance during boll filling to enhance fiber strength & micronaire',
      'Bio-stimulant humic matrix to extend taproot into deeper soil moisture profiles'
    ],
    stages: [
      {
        stage: 'Nursery / Early Growth',
        duration: 'Days 1 - 30 (Seedling & Square Formation)',
        description: 'Deep taproot penetration and early sympodial fruiting branch initiation.',
        recommendedNutrients: 'MycoGrow biological granules + 12-61-00 Drip fertigation',
        keyRisk: 'Root rot and sucking pest vulnerability on tender leaves'
      },
      {
        stage: 'Vegetative Stage',
        duration: 'Days 30 - 65',
        description: 'Formation of main stem nodes and rapid expansion of fruiting branches.',
        recommendedNutrients: '19-19-19 Crystal + Zinc EDTA + Magnesium Sulphate spray',
        keyRisk: 'Excessive vegetative rank growth with low squaring'
      },
      {
        stage: 'Flowering & Blooming',
        duration: 'Days 65 - 95 (Peak Flowering & Early Boll Set)',
        description: 'White to pink flower transformation, fertilized boll retention, and shedding prevention.',
        recommendedNutrients: '00-52-34 MKP + Chelated Boron 20% + Marine Seaweed Extract',
        keyRisk: 'Catastrophic square and young boll drop due to moisture stress'
      },
      {
        stage: 'Fruit & Grain Setting',
        duration: 'Days 95 - 130 (Boll Development & Sizing)',
        description: 'Internal lint formation, seed oil synthesis, and boll diameter expansion.',
        recommendedNutrients: '13-00-45 (Potassium Nitrate) foliar + Potassium Silicate canopy spray',
        keyRisk: 'Late-season leaf reddening and premature crop senescence'
      },
      {
        stage: 'Maturity & Harvest',
        duration: 'Days 130 - 165+',
        description: 'Boll cracking, uniform fluffy white boll bursting, and picking rounds.',
        recommendedNutrients: 'SOP 00-00-50 foliar spray for uniform bursting',
        keyRisk: 'Hard boll rot and lint yellowing from unseasonal rains'
      }
    ],
    productCount: 10,
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    slug: 'vegetables',
    tagline: 'High-density yields, commercial luster, and premium post-harvest shelf life.',
    icon: '🥬',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1600&q=80',
    scientificName: 'Solanaceae & Cucurbitaceae',
    season: 'Year-round under open field and protected polyhouse conditions',
    soilPreference: 'Loamy, organic-matter rich soils with pH 6.2 - 6.8',
    description: 'Intensive commercial vegetable cultivation (Tomato, Brinjal, Okra, Cucurbits, Cabbage) operates on rapid turnover schedules. Precision fertigation prevents blossom-end rot, fruit deformation, and chlorosis, ensuring Grade-A produce with high market price realization.',
    keyNutrientNeeds: [
      'Frequent, low-EC water-soluble fertigation (19:19:19 & 13:40:13)',
      'Bio-available Calcium & Boron synergy for thick fruit skin and zero cracking',
      'Micro-chelate packages (Zn, Fe, Mn, Cu, B, Mo) to maintain lush dark foliage',
      'Enzymatic amino acid formulations to overcome high summer polyhouse heat'
    ],
    stages: [
      {
        stage: 'Nursery / Early Growth',
        duration: 'Days 1 - 20',
        description: 'Plug-tray nursery hardening and establishment of white fibrous feeder roots.',
        recommendedNutrients: 'Humic Root Gel + 12-61-00 starter soluble feed',
        keyRisk: 'Transplant wilting and root nematode damage'
      },
      {
        stage: 'Vegetative Stage',
        duration: 'Days 20 - 45',
        description: 'Vigorous leaf canopy formation capable of driving heavy photosynthetic loads.',
        recommendedNutrients: '19-19-19 All-Purpose Soluble + Multi-Micronutrient Combo',
        keyRisk: 'Interveinal yellowing and thin stem calipers'
      },
      {
        stage: 'Flowering & Blooming',
        duration: 'Days 45 - 70',
        description: 'Cluster flowering, high female flower ratio, and optimal pollinator activity.',
        recommendedNutrients: '00-52-34 MKP + Chelated Boron 20% + Cal-Boron cell wall builder',
        keyRisk: 'Flower blossom abortion and poor fruit set'
      },
      {
        stage: 'Fruit & Grain Setting',
        duration: 'Days 70 - 110',
        description: 'Multi-pick continuous fruit bulking, skin glossiness, and firm fleshy pulp.',
        recommendedNutrients: '13-00-45 Potassium Nitrate + L-Amino Acid booster + Drip fertigation',
        keyRisk: 'Fruit cracking, blotchy ripening, and rapid softening'
      },
      {
        stage: 'Maturity & Harvest',
        duration: 'Days 110 - 150+',
        description: 'Staggered harvest flushes, continuous rejuvenation, and high brix retention.',
        recommendedNutrients: '00-00-50 Sulphate of Potash + Seaweed bio-extract',
        keyRisk: 'Drop in size during subsequent harvest pickings'
      }
    ],
    productCount: 14,
  },
];
