// src/pages/Vouchers.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCopy, FiCheck, FiTag, FiShoppingBag, FiArrowRight, FiShield, FiPercent, FiGift } from 'react-icons/fi'
import Footer from '../components/layout/Footer'

const VOUCHER_LIST = [
  {
    id: 'first10',
    code: 'FIRST10',
    title: 'New Customer Welcome',
    discount: '10% OFF',
    type: 'percentage',
    minSpend: 'No minimum spend',
    description: 'Enjoy 10% off your very first order across all sneaker and footwear collections at SOLE.',
    badge: 'Popular for New Users',
    expiry: 'Valid all year',
    terms: 'Valid on first order only. One use per customer.',
    featured: true
  },
  {
    id: 'sole15',
    code: 'SOLE15',
    title: 'Sole Lifestyle Upgrade',
    discount: '15% OFF',
    type: 'percentage',
    minSpend: 'Min. spend PKR 8,000',
    description: 'Get 15% off when you upgrade your rotation with premium sneakers or boot collections.',
    badge: 'High Value Savings',
    expiry: 'Limited Time Offer',
    terms: 'Applicable on cart total of PKR 8,000 or above.',
    featured: true
  },
  {
    id: 'freeship',
    code: 'FREESHIP',
    title: 'Free Express Shipping',
    discount: '100% FREE',
    type: 'shipping',
    minSpend: 'Min. spend PKR 5,000',
    description: 'Zero shipping charges nationwide across all cities in Pakistan (Karachi, Lahore, Islamabad, etc.).',
    badge: 'Nationwide Free Delivery',
    expiry: 'Always Active',
    terms: 'Automatically applied at checkout or enter code manually on orders over PKR 5,000.',
    featured: false
  },
  {
    id: 'mini3for2',
    code: 'MINI3FOR2',
    title: 'Kids Mini Steps Special',
    discount: 'BUY 2 GET 1 FREE',
    type: 'special',
    minSpend: 'Any 2 pairs of Kids shoes',
    description: 'Buy any two pairs from the durable SOLE Mini Steps kids collection and get the third pair free.',
    badge: 'Family Bundle',
    expiry: 'All Year Round',
    terms: 'Valid strictly on SOLE Mini Steps collection. Lowest priced pair is free.',
    featured: false
  },
  {
    id: 'student500',
    code: 'STUDENT500',
    title: 'Student Sneakerhead Perks',
    discount: 'PKR 500 OFF',
    type: 'fixed',
    minSpend: 'Min. spend PKR 4,500',
    description: 'Special student community discount for university & college students refreshing their kicks.',
    badge: 'Student Community',
    expiry: 'Ongoing',
    terms: 'Valid with student email or verification on orders above PKR 4,500.',
    featured: false
  },
  {
    id: 'vipsteps',
    code: 'VIPSTEPS',
    title: 'VIP Loyalty Tier Reward',
    discount: '20% OFF',
    type: 'percentage',
    minSpend: 'Min. spend PKR 12,000',
    description: 'Exclusive reward for SOLE loyalty members and multi-pair shoe wardrobe upgrades.',
    badge: 'VIP Exclusive',
    expiry: 'Active Members Only',
    terms: 'Requires SOLE Rewards account. Non-transferable.',
    featured: false
  }
]

export default function Vouchers() {
  const [copiedCode, setCopiedCode] = useState(null)

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => {
      setCopiedCode(null)
    }, 2200)
  }

  return (
    <div style={{ background: 'var(--void)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: 90 }}>
      {/* Hero Section */}
      <section style={{ padding: '60px 48px 40px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'var(--red)',
              background: 'rgba(204,0,0,0.08)',
              padding: '6px 14px',
              borderRadius: 20,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <FiTag size={13} />
            Verified & Active Discounts
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7vw, 84px)',
            lineHeight: 0.95,
            letterSpacing: 2,
            margin: '0 0 20px',
            textTransform: 'uppercase'
          }}
        >
          SOLE PROMO & <span style={{ color: 'var(--red)' }}>VOUCHER CODES</span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            color: 'var(--text-secondary)',
            maxWidth: 680,
            lineHeight: 1.6,
            marginBottom: 32
          }}
        >
          Discover official SOLE coupons, seasonal drops vouchers, and shipping waivers. Copy any code with one click and apply it during checkout for instant savings.
        </p>

        {/* Quick Highlights Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '24px 28px',
            marginBottom: 48
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(204,0,0,0.1)',
                color: 'var(--red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FiPercent size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Up to 20% OFF</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>On selected sneakers & tiers</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(34,197,94,0.1)',
                color: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FiShield size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>100% Guaranteed</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Tested daily on live checkout</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(201,168,76,0.1)',
                color: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FiGift size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Buy 2 Get 1 Free</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>On Mini Steps kids collection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vouchers Grid Section */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                letterSpacing: 2,
                textTransform: 'uppercase',
                margin: '0 0 6px'
              }}
            >
              AVAILABLE VOUCHERS
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>
              Click any code to copy it directly to your clipboard.
            </p>
          </div>
          <Link
            to="/products"
            style={{
              color: 'var(--red)',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14
            }}
          >
            Shop All Shoes <FiArrowRight />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 28
          }}
        >
          {VOUCHER_LIST.map((item) => {
            const isCopied = copiedCode === item.code

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'var(--surface)',
                  border: item.featured ? '1.5px solid var(--red)' : '1px solid var(--border)',
                  borderRadius: 18,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: item.featured ? '0 8px 30px rgba(204,0,0,0.08)' : 'none'
                }}
              >
                {/* Top Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: 12,
                      background: item.featured ? 'var(--red)' : 'var(--surface-3)',
                      color: item.featured ? '#fff' : 'var(--text-secondary)',
                      fontWeight: 700
                    }}
                  >
                    {item.badge}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: 'var(--text-muted)'
                    }}
                  >
                    {item.expiry}
                  </span>
                </div>

                {/* Discount & Details */}
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 38,
                      letterSpacing: 1.5,
                      color: 'var(--red)',
                      lineHeight: 1,
                      marginBottom: 8
                    }}
                  >
                    {item.discount}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 19,
                      fontWeight: 700,
                      margin: '0 0 8px',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                      margin: '0 0 12px'
                    }}
                  >
                    {item.description}
                  </p>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span>• {item.minSpend}</span>
                  </div>
                </div>

                {/* Voucher Code Box & Copy Action */}
                <div
                  style={{
                    background: 'var(--void)',
                    border: '1.5px dashed var(--border-hover)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 12
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: 1 }}>
                      VOUCHER CODE
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 19,
                        fontWeight: 700,
                        letterSpacing: 2,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {item.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.code)}
                    style={{
                      background: isCopied ? '#22c55e' : 'var(--text-primary)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 16px',
                      fontSize: 12.5,
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: 1,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'background 0.2s, transform 0.15s'
                    }}
                  >
                    {isCopied ? (
                      <>
                        <FiCheck size={14} /> COPIED!
                      </>
                    ) : (
                      <>
                        <FiCopy size={14} /> COPY CODE
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* How to Redeem Section */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '70px 48px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                letterSpacing: 2,
                textTransform: 'uppercase',
                margin: '0 0 10px'
              }}
            >
              HOW TO REDEEM YOUR VOUCHERS
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, margin: 0 }}>
              Applying your voucher at SOLE takes less than 5 seconds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32
            }}
          >
            {[
              {
                step: '01',
                title: 'Select Your Shoes',
                text: 'Browse our Urban Runner, Flex Walk, or limited thrift drops and add your preferred size to cart.'
              },
              {
                step: '02',
                title: 'Copy Voucher Code',
                text: 'Click the "COPY CODE" button on any voucher card above to copy it directly to your clipboard.'
              },
              {
                step: '03',
                title: 'Apply at Checkout',
                text: 'At checkout, paste your code into the "Promo / Voucher" field and see your discount deducted immediately.'
              }
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--void)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: 32,
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 48,
                    color: 'var(--red)',
                    lineHeight: 1,
                    marginBottom: 12
                  }}
                >
                  {step.step}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 10px' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Assistance Callout */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 48px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
            color: '#fff',
            borderRadius: 20,
            padding: '40px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: 2,
                color: '#ff9494',
                textTransform: 'uppercase',
                fontWeight: 700
              }}
            >
              SOLE OFFICIAL ASSISTANT
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: 1.5, margin: '8px 0 6px' }}>
              NEED HELP CHOOSING A VOUCHER?
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: 15, margin: 0, maxWidth: 540 }}>
              Ask our brand assistant at the bottom right corner for personalized voucher recommendations, sizing questions, or order assistance.
            </p>
          </div>

          <Link
            to="/products"
            style={{
              background: 'var(--red)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 30,
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              letterSpacing: 2,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 15px rgba(204,0,0,0.4)'
            }}
          >
            START SHOPPING <FiShoppingBag size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
