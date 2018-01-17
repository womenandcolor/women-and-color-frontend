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
