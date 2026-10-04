export interface SampleFruit {
  id: string;
  name: string;
  category: string;
  scientificName: string;
  color: string;
  svgDataUri: string;
  defaultData: {
    family: string;
    variety: string;
    confidence: number;
    benefits: string[];
    information: string;
    origin: string;
    ripeness: {
      stage: string;
      colorIndicator: string;
      shelfLife: string;
      firmness: string;
    };
    nutrition: {
      calories: string;
      vitaminC: string;
      dietaryFiber: string;
      potassium: string;
      naturalSugars: string;
      hydration: string;
    };
    imageProcessingData: {
      dominantColorHex: string[];
      colorSpace: string;
      textureDescription: string;
      shapeEccentricity: string;
      edgeProfile: string;
      suggestedFilters: string[];
    };
  };
}

// Generate stylized SVG Data URI for quick and reliable rendering
function createFruitSvg(type: 'mango' | 'apple' | 'banana' | 'orange' | 'strawberry' | 'dragonfruit'): string {
  let content = '';

  if (type === 'mango') {
    content = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <radialGradient id="mangoGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FEF08A" />
            <stop offset="35%" stop-color="#FBBF24" />
            <stop offset="70%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#EA580C" />
          </radialGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4ADE80" />
            <stop offset="100%" stop-color="#15803D" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="#F8FAFC"/>
        <!-- Shadow -->
        <ellipse cx="200" cy="340" rx="110" ry="25" fill="#E2E8F0" opacity="0.8"/>
        <!-- Stem -->
        <path d="M190 95 Q195 65 175 45" stroke="#78350F" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- Leaf -->
        <path d="M195 85 Q260 50 280 90 Q240 120 195 85 Z" fill="url(#leafGrad)"/>
        <!-- Mango Body -->
        <path d="M190 95 C270 95 310 160 300 240 C290 310 210 330 160 300 C110 270 90 190 120 135 C140 100 165 95 190 95 Z" fill="url(#mangoGrad)"/>
        <!-- Highlight -->
        <ellipse cx="160" cy="150" rx="35" ry="50" transform="rotate(-25 160 150)" fill="#FFFFFF" opacity="0.35"/>
      </svg>
    `;
  } else if (type === 'apple') {
    content = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <radialGradient id="appleGrad" cx="30%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#FCA5A5" />
            <stop offset="30%" stop-color="#EF4444" />
            <stop offset="75%" stop-color="#B91C1C" />
            <stop offset="100%" stop-color="#7F1D1D" />
          </radialGradient>
          <linearGradient id="appleLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#86EFAC" />
            <stop offset="100%" stop-color="#166534" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="#F8FAFC"/>
        <ellipse cx="200" cy="345" rx="100" ry="22" fill="#E2E8F0" opacity="0.8"/>
        <!-- Stem -->
        <path d="M200 110 Q205 60 230 40" stroke="#713F12" stroke-width="7" stroke-linecap="round" fill="none"/>
        <!-- Leaf -->
        <path d="M205 85 Q265 60 275 95 Q235 115 205 85 Z" fill="url(#appleLeaf)"/>
        <!-- Apple shape -->
        <path d="M200 115 C230 90 295 95 300 170 C305 240 265 315 200 325 C135 315 95 240 100 170 C105 95 170 90 200 115 Z" fill="url(#appleGrad)"/>
        <!-- Gloss -->
        <ellipse cx="150" cy="160" rx="30" ry="45" transform="rotate(-30 150 160)" fill="#FFFFFF" opacity="0.3"/>
      </svg>
    `;
  } else if (type === 'banana') {
    content = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FEF08A" />
            <stop offset="40%" stop-color="#FACC15" />
            <stop offset="85%" stop-color="#EAB308" />
            <stop offset="100%" stop-color="#CA8A04" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="#F8FAFC"/>
        <ellipse cx="200" cy="330" rx="130" ry="24" fill="#E2E8F0" opacity="0.8"/>
        <!-- Stem tip -->
        <path d="M70 120 L95 145" stroke="#4D7C0F" stroke-width="12" stroke-linecap="round"/>
        <!-- Banana body -->
        <path d="M85 135 C140 240 250 290 325 210 C290 280 180 280 85 135 Z" fill="url(#bananaGrad)"/>
        <path d="M85 135 C170 210 270 240 325 210 C265 245 160 230 85 135 Z" fill="#CA8A04" opacity="0.25"/>
        <circle cx="325" cy="210" r="5" fill="#713F12"/>
      </svg>
    `;
  } else if (type === 'orange') {
    content = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FED7AA" />
            <stop offset="35%" stop-color="#FB923C" />
            <stop offset="80%" stop-color="#F97316" />
            <stop offset="100%" stop-color="#C2410C" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="#F8FAFC"/>
        <ellipse cx="200" cy="340" rx="95" ry="22" fill="#E2E8F0" opacity="0.8"/>
        <!-- Leaf & Stem -->
        <path d="M200 95 L200 70" stroke="#713F12" stroke-width="6" stroke-linecap="round"/>
        <path d="M200 80 Q250 65 260 90 Q225 105 200 80 Z" fill="#22C55E"/>
        <!-- Orange Circle -->
        <circle cx="200" cy="210" r="120" fill="url(#orangeGrad)"/>
        <ellipse cx="160" cy="165" rx="35" ry="40" transform="rotate(-30 160 165)" fill="#FFFFFF" opacity="0.3"/>
      </svg>
    `;
  } else if (type === 'strawberry') {
    content = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <radialGradient id="strawGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FECDD3" />
            <stop offset="35%" stop-color="#F43F5E" />
            <stop offset="80%" stop-color="#E11D48" />
            <stop offset="100%" stop-color="#9F1239" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="#F8FAFC"/>
        <ellipse cx="200" cy="345" rx="85" ry="20" fill="#E2E8F0" opacity="0.8"/>
        <!-- Leaves -->
        <path d="M200 100 L200 65" stroke="#15803D" stroke-width="6" stroke-linecap="round"/>
        <path d="M200 95 C170 70 140 85 150 110 C175 110 190 105 200 95 Z" fill="#22C55E"/>
        <path d="M200 95 C230 70 260 85 250 110 C225 110 210 105 200 95 Z" fill="#16A34A"/>
        <path d="M190 95 C200 80 210 80 220 95 C210 115 200 115 190 95 Z" fill="#4ADE80"/>
        <!-- Heart / Berry Shape -->
        <path d="M200 100 C270 100 290 180 230 290 C210 325 190 325 170 290 C110 180 130 100 200 100 Z" fill="url(#strawGrad)"/>
        <!-- Seeds -->
        <circle cx="180" cy="140" r="3" fill="#FEF08A"/>
        <circle cx="220" cy="145" r="3" fill="#FEF08A"/>
        <circle cx="160" cy="190" r="3" fill="#FEF08A"/>
        <circle cx="200" cy="195" r="3" fill="#FEF08A"/>
        <circle cx="240" cy="190" r="3" fill="#FEF08A"/>
        <circle cx="180" cy="245" r="3" fill="#FEF08A"/>
        <circle cx="215" cy="250" r="3" fill="#FEF08A"/>
        <circle cx="195" cy="285" r="2.5" fill="#FEF08A"/>
      </svg>
    `;
  } else {
    // dragonfruit
    content = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <defs>
          <radialGradient id="dragonGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#F472B6" />
            <stop offset="40%" stop-color="#EC4899" />
            <stop offset="85%" stop-color="#BE185D" />
            <stop offset="100%" stop-color="#831843" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="#F8FAFC"/>
        <ellipse cx="200" cy="340" rx="90" ry="22" fill="#E2E8F0" opacity="0.8"/>
        <!-- Body -->
        <ellipse cx="200" cy="210" rx="90" ry="115" fill="url(#dragonGrad)"/>
        <!-- Scales (green tips) -->
        <path d="M150 140 Q130 110 120 130 Q140 160 150 140 Z" fill="#84CC16"/>
        <path d="M250 140 Q270 110 280 130 Q260 160 250 140 Z" fill="#84CC16"/>
        <path d="M130 200 Q100 190 105 215 Q130 220 130 200 Z" fill="#84CC16"/>
        <path d="M270 200 Q300 190 295 215 Q270 220 270 200 Z" fill="#84CC16"/>
        <path d="M145 270 Q130 290 145 300 Q165 290 145 270 Z" fill="#84CC16"/>
        <path d="M255 270 Q270 290 255 300 Q235 290 255 270 Z" fill="#84CC16"/>
        <path d="M200 95 Q200 65 215 70 Q210 100 200 95 Z" fill="#84CC16"/>
      </svg>
    `;
  }

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(content.trim());
}

export const SAMPLE_FRUITS: SampleFruit[] = [
  {
    id: 'sample-mango',
    name: 'Mango',
    category: 'Tropical Stone Fruit',
    scientificName: 'Mangifera indica',
    color: '#F59E0B',
    svgDataUri: createFruitSvg('mango'),
    defaultData: {
      family: 'Anacardiaceae',
      variety: 'Carabao / Alphonso',
      confidence: 98.4,
      benefits: [
        'Exceptional Vitamin C content boosting immune response and collagen integrity',
        'Rich in bioactive mangiferin, an antioxidant known as a "super-antioxidant"',
        'Contains amylase enzymes which aid carbohydrate breakdown and gut motility',
        'High in lutein and zeaxanthin protecting retinal cells against blue light damage',
        'Abundant dietary fiber supporting heart health and steady blood sugar balance'
      ],
      information: 'The mango is a succulent tropical drupe characterized by sweet, aromatic golden pulp. Considered the national fruit of the Philippines, India, and Pakistan, mangoes contain over 20 different vitamins and minerals. The outer peel protects a thick edible mesocarp surrounding a fibrous woody endocarp enclosing a solitary seed.',
      origin: 'Indo-Burma region (northeastern India, Bangladesh, and Myanmar). Cultivated in South Asia for over 4,000 years and carried to Southeast Asia, East Africa, and South America by maritime trade routes.',
      ripeness: {
        stage: 'Peak Ripe',
        colorIndicator: 'Golden yellow skin with orange blush and floral stem aroma',
        shelfLife: '3 to 5 days at room temperature',
        firmness: 'Yields slightly to gentle pressure at the stem shoulder'
      },
      nutrition: {
        calories: '99 kcal per cup (165g)',
        vitaminC: '67% daily value',
        dietaryFiber: '2.6 g',
        potassium: '277 mg',
        naturalSugars: '22.5 g',
        hydration: '83% moisture'
      },
      imageProcessingData: {
        dominantColorHex: ['#F59E0B', '#FCD34D', '#EA580C'],
        colorSpace: 'Cadmium Yellow & Amber Spectrum (HSV: 42°, 84%, 96%)',
        textureDescription: 'Smooth epidermal surface with fine microscopic lenticel pore dispersion',
        shapeEccentricity: 'Reniform ovoid silhouette with asymmetrical apex beak',
        edgeProfile: 'Distinct high-gradient continuous outer perimeter contour',
        suggestedFilters: ['Grayscale Equalization', 'Sobel Gradient', 'HSV Mask', 'Canny Boundary']
      }
    }
  },
  {
    id: 'sample-apple',
    name: 'Apple',
    category: 'Temperate Pome',
    scientificName: 'Malus domestica',
    color: '#EF4444',
    svgDataUri: createFruitSvg('apple'),
    defaultData: {
      family: 'Rosaceae',
      variety: 'Honeycrisp',
      confidence: 99.1,
      benefits: [
        'High pectin fiber binds dietary cholesterol and supports gut microbiota',
        'Rich in quercetin flavonoid that mitigates allergic response and inflammation',
        'Low glycemic load helps sustain balanced insulin and blood glucose levels',
        'Chlorogenic acid and epicatechin promote vascular endothelial elasticity',
        'Promotes dental health by stimulating saliva flow during mastication'
      ],
      information: 'Apples are pome fruits of the Malus domestica tree in the rose family. Highly versatile and globally cultivated in temperate zones, apples have a firm parenchymatous flesh rich in malic acid, encased in a glossy epicuticular wax cuticle.',
      origin: 'Central Asia, in the foothills of the Tian Shan mountains in modern Kazakhstan (Malus sieversii ancestor). Transported along ancient Silk Road corridors into Europe and the Mediterranean.',
      ripeness: {
        stage: 'Crisp & Optimal',
        colorIndicator: 'Vibrant crimson red with golden lenticel speckles',
        shelfLife: '1 to 2 weeks at room temperature, 2 months chilled',
        firmness: 'Firm with dense turgor pressure and acoustic crunch'
      },
      nutrition: {
        calories: '95 kcal (medium 182g)',
        vitaminC: '14% daily value',
        dietaryFiber: '4.4 g',
        potassium: '195 mg',
        naturalSugars: '19.0 g',
        hydration: '86% moisture'
      },
      imageProcessingData: {
        dominantColorHex: ['#EF4444', '#B91C1C', '#15803D'],
        colorSpace: 'Spectral Crimson & Deep Burgundy (RGB: 239, 68, 68)',
        textureDescription: 'Glossy epicuticular wax layer with subtle radial striations',
        shapeEccentricity: 'Sub-globose to oblate spheroid with bilateral symmetry',
        edgeProfile: 'Smooth high-contrast circular contour with apical stem depression',
        suggestedFilters: ['Red Channel Extraction', 'Sobel Edge Filter', 'Otsu Threshold', 'Centroid Finder']
      }
    }
  },
  {
    id: 'sample-banana',
    name: 'Banana',
    category: 'Tropical Berry',
    scientificName: 'Musa acuminata',
    color: '#EAB308',
    svgDataUri: createFruitSvg('banana'),
    defaultData: {
      family: 'Musaceae',
      variety: 'Cavendish',
      confidence: 97.6,
      benefits: [
        'Vital source of bioavailable potassium for cardiac rhythm and osmotic balance',
        'High Vitamin B6 content crucial for hemoglobin synthesis and immune vigor',
        'Resistant starch in ripe bananas acts as prebiotic fuel for colonocytes',
        'Fast-acting natural carbohydrates ideal for athletic pre- and post-workout fuel',
        'Natural antacid effect calming gastroesophageal acidity and protecting stomach lining'
      ],
      information: 'Botanically a false berry, bananas grow in hanging clusters known as tiers or "hands" from the giant herb Musa. The peel is a fibrous exocarp protecting soft, creamy starch-to-sugar converted pulp rich in pectin and essential minerals.',
      origin: 'Indo-Malesia and Australasia, earliest archaeological evidence traced to Kuk Swamp in Papua New Guinea around 8000 BCE, before dispersing through oceanic voyagers to Southeast Asia and Africa.',
      ripeness: {
        stage: 'Ripe',
        colorIndicator: 'Uniform golden yellow peel with minor micro-freckles',
        shelfLife: '3 to 6 days at room temperature',
        firmness: 'Supple and tender without soft bruising'
      },
      nutrition: {
        calories: '105 kcal (medium 118g)',
        vitaminC: '11% daily value',
        dietaryFiber: '3.1 g',
        potassium: '422 mg',
        naturalSugars: '14.4 g',
        hydration: '75% moisture'
      },
      imageProcessingData: {
        dominantColorHex: ['#FACC15', '#EAB308', '#713F12'],
        colorSpace: 'High Luminance Yellow & Ochre (HSV: 50°, 85%, 98%)',
        textureDescription: 'Longitudinal ridged fibrous exocarp with matte epidermal sheen',
        shapeEccentricity: 'Highly elongated curvilinear profile with aspect ratio > 3.8',
        edgeProfile: 'Distinct arching boundary easily isolated via skeletonization',
        suggestedFilters: ['Curvature Transform', 'Yellow Threshold', 'Morphological Thinning', 'Convex Hull']
      }
    }
  },
  {
    id: 'sample-orange',
    name: 'Orange',
    category: 'Citrus Hesperidium',
    scientificName: 'Citrus × sinensis',
    color: '#F97316',
    svgDataUri: createFruitSvg('orange'),
    defaultData: {
      family: 'Rutaceae',
      variety: 'Valencia / Navel',
      confidence: 98.7,
      benefits: [
        'Superb Vitamin C density meeting over 90% of recommended daily intake',
        'Hesperidin flavonoid reinforces capillary wall integrity and lowers blood pressure',
        'Citric acid stimulates digestive secretions and helps inhibit kidney stone formation',
        'Abundant beta-cryptoxanthin supports pulmonary function and cell defense',
        'High natural water and electrolyte content provides cellular rehydration'
      ],
      information: 'The sweet orange is a hybrid between pomelo (Citrus maxima) and mandarin (Citrus reticulata). Anatomically a hesperidium, its outer leathery flavedo contains oil glands emitting limonene, covering a spongy white albedo and juicy vesicle segments.',
      origin: 'Southern China, Northeast India, and Myanmar. Earliest mention in Chinese literature dates to 314 BCE; introduced to Europe by Italian and Portuguese merchants during the 15th century.',
      ripeness: {
        stage: 'Optimal Ripe',
        colorIndicator: 'Deep saturated orange peel with aromatic oil gland gloss',
        shelfLife: '1 to 2 weeks at ambient room temperature, 1 month refrigerated',
        firmness: 'Solid, plump and heavy for its size with slight give'
      },
      nutrition: {
        calories: '62 kcal (medium 131g)',
        vitaminC: '92% daily value',
        dietaryFiber: '3.1 g',
        potassium: '237 mg',
        naturalSugars: '12.2 g',
        hydration: '87% moisture'
      },
      imageProcessingData: {
        dominantColorHex: ['#FB923C', '#F97316', '#C2410C'],
        colorSpace: 'Deep Tangerine & Saturated Amber (RGB: 249, 115, 22)',
        textureDescription: 'Porous pebbled flavedo surface with visible micro-oil gland cavities',
        shapeEccentricity: 'Spherical to slightly oblate with roundness metric > 0.92',
        edgeProfile: 'Smooth circular boundary with minimal geometric variance',
        suggestedFilters: ['Hough Circle Transform', 'Orange Chrominance Mask', 'Sobel Filter', 'Texture Entropy']
      }
    }
  },
  {
    id: 'sample-strawberry',
    name: 'Strawberry',
    category: 'Aggregate Accessory',
    scientificName: 'Fragaria × ananassa',
    color: '#E11D48',
    svgDataUri: createFruitSvg('strawberry'),
    defaultData: {
      family: 'Rosaceae',
      variety: 'Garden Strawberry',
      confidence: 97.9,
      benefits: [
        'Extremely potent anthocyanins provide deep antioxidant defense',
        'Supports cognitive resilience and memory retention through fisetin',
        'Ellagic acid protects against skin photodamage and prevents elastase breakdown',
        'Low calorie and glycemic index making it ideal for metabolic health',
        'Folate content contributes to normal blood formation and cell division'
      ],
      information: 'Botanically an aggregate accessory fruit, the fleshy edible part is an enlarged receptacle rather than an ovary. The true fruits are the numerous tiny achenes (seed-like dots) speckling the outer scarlet surface.',
      origin: 'Bred in Brittany, France in the 1750s through crossbreeding of Fragaria virginiana (eastern North America) and Fragaria chiloensis (Chile).',
      ripeness: {
        stage: 'Full Red Ripe',
        colorIndicator: 'Uniform glossy scarlet red with fresh green calyx leaves',
        shelfLife: '2 to 4 days refrigerated (highly perishable)',
        firmness: 'Delicately firm and plump with sweet fragrance'
      },
      nutrition: {
        calories: '49 kcal per cup (150g)',
        vitaminC: '99% daily value',
        dietaryFiber: '3.0 g',
        potassium: '220 mg',
        naturalSugars: '7.4 g',
        hydration: '91% moisture'
      },
      imageProcessingData: {
        dominantColorHex: ['#F43F5E', '#E11D48', '#22C55E'],
        colorSpace: 'Vibrant Magenta-Red & Chlorophyll Green (HSV: 345°, 86%, 88%)',
        textureDescription: 'Textured epidermis with periodic achene seed depressions',
        shapeEccentricity: 'Conical to cordate (heart-shaped) tapering toward distal apex',
        edgeProfile: 'Scalloped surface contour due to achene indentations',
        suggestedFilters: ['Achene Spot Detection', 'Red Mask Segmentation', 'Laplacian Edge Filter', 'Calyx Separation']
      }
    }
  },
  {
    id: 'sample-dragonfruit',
    name: 'Dragon Fruit',
    category: 'Cactus Berry (Pitaya)',
    scientificName: 'Selenicereus undatus',
    color: '#EC4899',
    svgDataUri: createFruitSvg('dragonfruit'),
    defaultData: {
      family: 'Cactaceae',
      variety: 'White-Fleshed Pitaya',
      confidence: 98.1,
      benefits: [
        'Rich in prebiotic oligosaccharides that nourish Bifidobacteria and Lactobacilli',
        'High in betalains and betacyanins with robust free-radical scavenging capacity',
        'Seeds contain monounsaturated omega-3 and omega-9 fatty acids',
        'Supports iron absorption with synergistic natural Vitamin C',
        'High dietary water and soluble fiber promotes optimal digestion'
      ],
      information: 'Dragon fruit or pitaya is the fruit of several climbing cactus species. Known for its exotic leather-like vibrant pink skin with protruding green bract scales, its interior houses translucent white flesh filled with tiny crunchable black seeds.',
      origin: 'Native to Southern Mexico, Central America, and northern South America. Introduced by the French to Southeast Asia (notably Vietnam, Thailand, and the Philippines) where it thrives in tropical orchards.',
      ripeness: {
        stage: 'Ripe',
        colorIndicator: 'Bright magenta skin with pliable green-yellow tipped bracts',
        shelfLife: '4 to 7 days refrigerated',
        firmness: 'Slightly soft give when pressed, comparable to ripe avocado'
      },
      nutrition: {
        calories: '60 kcal (100g)',
        vitaminC: '34% daily value',
        dietaryFiber: '2.9 g',
        potassium: '190 mg',
        naturalSugars: '8.0 g',
        hydration: '87% moisture'
      },
      imageProcessingData: {
        dominantColorHex: ['#EC4899', '#BE185D', '#84CC16'],
        colorSpace: 'Vivid Fuchsia & Chartreuse Green (HSV: 330°, 70%, 92%)',
        textureDescription: 'Smooth fleshy bracts radiating from an ovate cactus berry body',
        shapeEccentricity: 'Ovate with leafy foliar scales creating multi-lobed contour boundary',
        edgeProfile: 'High-frequency complex contour with protruding phylloclade scale tips',
        suggestedFilters: ['Contour Complexity Metric', 'Pink/Green Bimodal Mask', 'Fourier Descriptor', 'Sobel Filter']
      }
    }
  }
];
