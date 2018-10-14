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
    next: '/get-started/email-settings',
  },

  email_settings: {
    next: '/',
  },

};

export const pronounDict = {
  she: 'She, her, hers',
  he: 'He, him, his',
  they: 'They, them, their',
};

export const BASE_URL_PATH = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:8000'

export const IDENTITIES = [
  { label: 'All speakers', value: { woman: null, poc: null } },
  { label: 'Women', value: { woman: true, poc: null } },
  { label: 'Women of color', value: { woman: true, poc: true } },
  { label: 'People of color', value: { poc: true, woman: null } },
];

export const MAXIMUM_IMAGE_SIZE = 2 * 1024 * 1024; //less than 2MB in bytes
export const DEFAULT_SPEAKER_LIMIT = 20;
export const VALID_PARAMS = [
  'location',
  'poc',
  'woman',
  'q',
  'limit',
  'offset',
];
