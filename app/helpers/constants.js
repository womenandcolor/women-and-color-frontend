export const registrationFlow = {
  'registration': {
    next: '/profile'
  },

  'profile': {
    next: '/work'
  },

  'work': {
    next: '/social'
  },

  'social': {
    next: '/'
  }
};

export const BASE_URL_PATH = "http://localhost:8000";

export const CITIES = [
  { label: 'all cities', value: {} },
  { label: 'montreal', value: { city: 'montreal'} },
  { label: 'ottawa', value: { city: 'ottawa'} },
  { label: 'toronto', value: { city: 'toronto'} },
  { label: 'vancouver', value: { city: 'vancouver'} },
  { label: 'waterloo', value: { city: 'waterloo'} },
];

export const IDENTITIES = [
  { label: 'all speakers', value: {} },
  { label: 'woman', value: { woman: true } },
  { label: 'woman of color', value: { woman: true, poc: true } },
  { label: 'person of color', value: { poc: true } },
];