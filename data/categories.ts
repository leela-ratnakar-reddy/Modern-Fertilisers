import { CategoryInfo } from '@/types/product';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'fertilisers',
    slug: 'fertilisers',
    name: 'Fertilisers',
    shortDescription: 'Core granular and soil-applied primary macronutrient inputs.',
    fullDescription: 'Essential macronutrient formulations designed to sustain robust root establishment, canopy vegetative vigor, and seasonal soil reserve replenishment. Engineered with controlled-release coatings and balanced N:P:K ratios for optimal seasonal uptake.',
    heroImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1400&q=80',
    keyBenefits: [
      'Balanced primary macronutrient architecture (N, P, K)',
      'High physical crush strength with minimal powder breakdown',
      'Enhanced root-zone cation exchange capacity',
      'Controlled dissolution rate reduces leaching losses'
    ],
    iconName: 'Sprout',
    productCount: 5,
  },
  {
    id: 'water-soluble',
    slug: 'water-soluble',
    name: 'Water Soluble',
    shortDescription: '100% drip-grade soluble crystal fertilizers for precision fertigation.',
    fullDescription: 'Ultra-pure, fully water-soluble nutrient crystals specifically milled for drip irrigation lines, micro-sprinklers, and foliar spray booms. Zero insoluble residues prevent emitter clogging while ensuring immediate cellular absorption.',
    heroImage: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=1400&q=80',
    keyBenefits: [
      '100% solubility with zero nozzle clogging guarantee',
      'Low salt index to avoid osmotic shock in sensitive roots',
      'Instant vegetative response within 48 to 72 hours',
      'Versatile compatibility with modern drip fertigation rigs'
    ],
    iconName: 'Droplets',
    productCount: 5,
  },
  {
    id: 'micronutrients',
    slug: 'micronutrients',
    name: 'Micronutrients',
    shortDescription: 'Chelated trace elements correcting sub-clinical deficiencies.',
    fullDescription: 'Precision chelated formulations (EDTA & amino complexes) delivering vital trace minerals: Zinc, Boron, Iron, Manganese, Copper, and Molybdenum. Protects against flower drop, interveinal chlorosis, and stunted apical bud development.',
    heroImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1400&q=80',
    keyBenefits: [
      'EDTA chelation prevents soil nutrient lock-up',
      'Stimulates enzyme activation and chlorophyll synthesis',
      'Prevents premature flower drop and enhances fruit setting',
      'Rapid cuticular penetration during foliar spraying'
    ],
    iconName: 'Atom',
    productCount: 5,
  },
  {
    id: 'bio-fertilisers',
    slug: 'bio-fertilisers',
    name: 'Bio Fertilisers',
    shortDescription: 'Microbial bio-inoculants and mycorrhizae activating living soil biology.',
    fullDescription: 'Beneficial consortium of endomycorrhizal spores, nitrogen-fixing bacteria, and phosphate-solubilizing microflora. Rebuilds degraded soil microbiology, unlocks fixed native soil phosphorus, and dramatically expands effective root surface area.',
    heroImage: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1400&q=80',
    keyBenefits: [
      'Multiplies root absorption surface area up to 100x via fungal hyphae',
      'Solubilizes locked-up soil phosphates naturally',
      'Enhances crop resilience against drought and soil salinity',
      'Zero chemical run-off, completely safe for soil ecology'
    ],
    iconName: 'Leaf',
    productCount: 4,
  },
  {
    id: 'plant-nutrition',
    slug: 'plant-nutrition',
    name: 'Plant Nutrition',
    shortDescription: 'Bio-stimulants, amino peptides, and marine kelp extracts.',
    fullDescription: 'Advanced metabolic boosters, enzymatic catalysts, and concentrated seaweed bio-extracts. Supplies ready-made L-amino acids, betaines, and cytokinins to alleviate abiotic stress (drought, excessive heat, cold snaps) and boost fruit sizing.',
    heroImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1400&q=80',
    keyBenefits: [
      'Alleviates abiotic stress from heatwaves and water deficit',
      'Enhances sugar translocation and brix levels in fruits',
      'Provides bio-available L-amino acid building blocks',
      'Improves post-harvest shelf life and produce firmness'
    ],
    iconName: 'Sparkles',
    productCount: 5,
  },
];
