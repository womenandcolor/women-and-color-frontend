export const registrationFlow = {
  registration: {
    next: '/get-started/profile',
  },

  profile: {
    next: '/get-started/work',
  },

  work: {
    next: '/get-started/social',
  },

  social: {
    next: '/',
  },
};

export const BASE_URL_PATH = process.env.production
  ? 'https://women-and-color-backend.herokuapp.com'
  : 'http://localhost:8000';

export const IDENTITIES = [
  { label: 'All speakers', value: { woman: null, poc: null } },
  { label: 'Woman', value: { woman: true, poc: null } },
  { label: 'Woman of color', value: { woman: true, poc: true } },
  { label: 'Person of color', value: { poc: true, woman: null } },
];
