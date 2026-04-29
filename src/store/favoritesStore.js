// src/store/favoritesStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) =>
        set(state => ({
          ids: state.ids.includes(id)
            ? state.ids.filter(i => i !== id)
            : [...state.ids, id],
        })),

      isFavorited: (id) => get().ids.includes(id),

      getCount: () => get().ids.length,
    }),
    { name: 'sole-favorites' }
  )
)
