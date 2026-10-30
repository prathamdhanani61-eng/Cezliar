// Gift finder answers and the products each mood suggests.
// Product ids come from products.json; list them in the order you'd recommend them.
export const GIFT_WHO = [
  { id: 'him', label: 'For him', hint: 'Partner, father, brother', text: 'him' },
  { id: 'her', label: 'For her', hint: 'Partner, mother, sister', text: 'her' },
  { id: 'home', label: 'For the home', hint: 'Family, housewarming', text: 'the home' },
  { id: 'me', label: 'For myself', hint: 'A little treat', text: 'you' },
];

export const GIFT_MOODS = [
  { id: 'warm', label: 'Warm & woody', hint: 'Musk, oud, sandal' },
  { id: 'floral', label: 'Floral & sweet', hint: 'Rose, mogra, florals' },
  { id: 'fresh', label: 'Fresh & fruity', hint: 'Berries, camphor' },
  { id: 'calm', label: 'Calm & spiritual', hint: 'Dhoop for prayer' },
];

// The 'custom' budget's max is the amount the visitor types in.
export const GIFT_BUDGETS = [
  { id: 'low', label: 'Under ₹400', max: 400 },
  { id: 'mid', label: 'Up to ₹800', max: 800 },
  { id: 'any', label: 'Any budget', max: Infinity },
  { id: 'custom', label: 'Your budget', hint: 'Enter an amount' },
];

export const GIFT_PRODUCT_MOODS = {
  'attar-1': ['warm'],
  'attar-3': ['floral'],
  'attar-2': ['fresh'],
  'White oudh': ['warm'],
  Shanaya: ['floral'],
  'SandalwoodDhoop-1': ['warm', 'calm'],
  'MograDhoop-3': ['floral', 'calm'],
  Gulab: ['floral', 'calm'],
  'LobanDhoop-2': ['calm', 'warm'],
  'KapurDhoop-4': ['calm', 'fresh'],
  'Cedar Wood': ['warm', 'calm'],
};
