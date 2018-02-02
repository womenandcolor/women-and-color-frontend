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
}

export const BASE_URL_PATH = "http://localhost:8000";
