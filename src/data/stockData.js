// src/data/stockData.js — Drop schedule and stock info

// Next drop date: set 3 days from now dynamically
const nextDrop = new Date()
nextDrop.setDate(nextDrop.getDate() + 3)
nextDrop.setHours(18, 0, 0, 0)

export const nextDropDate = nextDrop.toISOString()

export const dropHistory = [
  { date: '2024-11-01', title: 'Bred Pack', soldOut: true },
  { date: '2024-10-15', title: 'Yeezy Wave', soldOut: true },
  { date: '2024-09-30', title: 'Nike Classics', soldOut: false },
]
