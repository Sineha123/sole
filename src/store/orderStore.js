// src/store/orderStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useOrderStore = create(
  persist(
    (set) => ({
      orders: [],
      addresses: [],

      placeOrder: (orderData) => {
        const order = {
          id: `SOLE-${Date.now()}`,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          ...orderData,
        }
        set(state => ({ orders: [...state.orders, order] }))
        return order.id
      },

      saveAddress: (address) =>
        set(state => ({
          addresses: [
            ...state.addresses,
            { id: Date.now(), ...address },
          ],
        })),

      getOrderById: (id) => {
        // This is a store method called from outside
        return undefined
      },
    }),
    { name: 'sole-orders' }
  )
)
