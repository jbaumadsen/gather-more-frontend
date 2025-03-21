// services/api/endpoints.ts

// Define all API endpoints in one place for easy maintenance
const endpoints = {
  // Admin endpoints
  admin: {
    sets: {
      update: (id: string) => `/admin/sets/${id}`,
      create: '/admin/sets',
      deleteCards: '/admin/sets/delete-cards',
      importCards: '/admin/sets/import-cards',
      delete: (id: string) => `/admin/sets/${id}`,
    },
    users: {
      updatePassword: (userId: string) => `/admin/users/${userId}/password`,
      getAll: '/admin/users'
    },

  },

  // Card Pool endpoints
  cardPools: {
    getAll: '/cardpool',
    getById: (id: string) => `/cardpool/${id}`,
    create: '/cardpool',
    update: (id: string) => `/cardpool/${id}`,
    delete: (id: string) => `/cardpool/${id}`,
    addCard: '/cardpool/addCard',
    removeCard: '/cardpool/card',
    addCards: (id: string) => `/cardpool/${id}/cards`,
  },

  // Set endpoints
  sets: {
    getAll: '/set',
    getById: (id: string) => `/set/${id}`,
  },

  // Card endpoints
  cards: {
    getAll: '/card',
    getById: (id: string) => `/card/${id}`,
    create: '/card',
    update: (id: string) => `/card/${id}`,
    delete: (id: string) => `/card/${id}`,
    deleteCards: '/card/deleteCards',
  },
  
  
  // Add other endpoint groups as needed
};

export default endpoints;