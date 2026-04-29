// src/store/cartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      justAdded: false,

      addItem: (product, size) => {
        const existing = get().items.find(
          i => i.product.id === product.id && i.size === size
        )
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.product.id === product.id && i.size === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            justAdded: true,
          }))
        } else {
          set(state => ({
            items: [...state.items, { product, size, quantity: 1 }],
            justAdded: true,
          }))
        }
        setTimeout(() => set({ justAdded: false }), 2000)
      },

      removeItem: (productId, size) =>
        set(state => ({
          items: state.items.filter(
            i => !(i.product.id === productId && i.size === size)
          ),
        })),

      updateQuantity: (productId, size, quantity) =>
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      getTotal: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price_pkr * i.quantity,
          0
        ),

      getCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'sole-cart' }
  )
)
