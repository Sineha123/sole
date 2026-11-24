// src/data/soleKnowledgeEngine.js
// Curated Knowledge Base Engine for SOLE (Zero AI, Zero Ollama, Instant Response)
// Derived 100% from SOLE_Voice_Agent_Knowledge_Base.docx

export const KNOWLEDGE_TOPICS = [
  // 1. BRAND OVERVIEW & ABOUT
  {
    id: 'brand_overview',
    title: 'Brand Overview & Mission',
    section: 'Section 1: Brand Overview',
    keywords: ['about', 'brand', 'sole', 'story', 'history', 'founded', 'company', 'mission', 'vision', 'values', 'who are you', 'what is sole'],
    patterns: [/who\s+are\s+you/i, /what\s+is\s+sole/i, /tell\s+me\s+about\s+sole/i, /about\s+the\s+brand/i],
    response: `**SOLE — Walk Your Story** 👟\n\nFounded in **2018** in Karachi, Pakistan, SOLE is dedicated to crafting premium, stylish, and supremely comfortable footwear accessible to everyone.\n\n* **Headquarters:** Karachi, Pakistan\n* **Mission:** Empowering every individual to walk confidently through life with shoes engineered for all-day comfort.\n* **Quality Standard:** Every single pair passes through **47 quality checkpoints** before dispatch.\n* **Sustainability:** 30% recycled materials used across our collections.\n* **Customer Support:** Mon–Sat: 9:00 AM – 8:00 PM (PKT)\n  * WhatsApp: **+92 300 SOLE PK (765 3 75)**\n  * Email: **support@soleofficial.pk**`,
    suggestions: ['Urban Runner sneakers', 'Delivery & shipping fees', 'Store locations', '14-day exchange policy']
  },

  // 2. URBAN RUNNER
  {
    id: 'product_urban_runner',
    title: 'SOLE Urban Runner Sneaker',
    section: 'Section 2.1 & 2.2: Product Catalogue',
    keywords: ['urban runner', 'urban', 'runner', 'sneakers', 'sneaker', 'running shoe', 'jogging', 'best seller'],
    patterns: [/urban\s*runner/i, /best\s*seller/i, /running\s*shoes?/i],
    response: `### 👟 SOLE Urban Runner (Bestseller)\n\nOur flagship sneaker engineered for city life, everyday commute, and light running.\n\n* **Price:** **PKR 5,499 – 7,999**\n* **Available Colors:** White, Black, Navy, Red\n* **Sizes:** UK 4 – UK 13 *(Standard and Wide-Fit available)*\n* **Upper Material:** Lightweight breathable knit mesh with synthetic overlays\n* **Midsole:** Responsive impact-absorbing EVA midsole\n* **Outsole:** High-traction, anti-slip flexible rubber\n* **Weight:** Approx. 280g per shoe\n* **Best For:** Daily casual styling, long walking, light jogging.`,
    suggestions: ['How to choose my size?', 'Delivery time to my city', 'Return & exchange policy', 'Other shoe collections']
  },

  // 3. FLEX WALK
  {
    id: 'product_flex_walk',
    title: 'SOLE Flex Walk Casual Shoe',
    section: 'Section 2.1 & 2.2: Product Catalogue',
    keywords: ['flex walk', 'flex', 'casual', 'leather', 'loafers', 'office shoes', 'work shoes'],
    patterns: [/flex\s*walk/i, /casual\s*shoes?/i, /office\s*shoes?/i],
    response: `### 👞 SOLE Flex Walk (Casual Classic)\n\nA timeless casual shoe blending tailored aesthetics with sneaker-level cushion.\n\n* **Price:** **PKR 3,999 – 5,499**\n* **Available Colors:** Brown, Beige, Olive, Black\n* **Sizes:** UK 4 – UK 13 *(Wide-fit options available)*\n* **Upper Material:** Premium faux-leather / treated leather finish\n* **Insole:** Dual-density memory foam footbed\n* **Best For:** Smart casual, office wear, weekend events.`,
    suggestions: ['Urban Runner sneakers', 'Size conversion chart', 'Payment methods & COD']
  },

  // 4. TREKKER PRO
  {
    id: 'product_trekker_pro',
    title: 'SOLE Trekker Pro Outdoor Boots',
    section: 'Section 2.1 & 2.2: Product Catalogue',
    keywords: ['trekker pro', 'trekker', 'hiking', 'outdoor', 'boots', 'waterproof', 'trekking', 'trail'],
    patterns: [/trekker\s*pro/i, /hiking/i, /outdoor\s*boots?/i, /waterproof/i],
    response: `### 🥾 SOLE Trekker Pro (Hiking & Outdoor)\n\nBuilt rugged for mountain trails, uneven terrains, and severe weather.\n\n* **Price:** **PKR 8,499 – 12,999**\n* **Available Colors:** Khaki, Grey, Orange\n* **Sizes:** UK 5 – UK 13\n* **Upper Material:** Water-resistant ballistic nylon with reinforced toe caps\n* **Outsole:** Heavy-duty deep-lug rubber outsole (Vibram-grade grip)\n* **Key Feature:** Waterproof breathable inner membrane.`,
    suggestions: ['Shoe care & cleaning', 'Delivery & shipping rates', 'Size guide']
  },

  // 5. GRACE (WOMEN'S)
  {
    id: 'product_grace',
    title: "SOLE Grace (Women's Collection)",
    section: 'Section 2.1 & 2.2: Product Catalogue',
    keywords: ['grace', 'women', 'womens', 'heels', 'flats', 'ladies', 'girls'],
    patterns: [/grace/i, /women'?s?/i, /heels/i, /flats/i, /ladies/i],
    response: `### 👠 SOLE Grace (Women's Collection)\n\nElevated sophistication without sacrificing all-day comfort.\n\n* **Price:** **PKR 4,499 – 9,999**\n* **Styles:** Block heels, cushioned pumps, everyday pointed & round ballet flats\n* **Available Colors:** Nude, Black, Rose Gold, Silver\n* **Sizes:** UK 3 – UK 9\n* **Feature:** Built-in ergonomic arch support cushion to prevent heel fatigue.`,
    suggestions: ['Size conversion chart', 'Return policy for heels', 'Delivery times']
  },

  // 6. MINI STEPS (KIDS)
  {
    id: 'product_mini_steps',
    title: "SOLE Mini Steps (Kids' Range)",
    section: 'Section 2.1 & 2.2: Product Catalogue',
    keywords: ['mini steps', 'mini', 'kids', 'children', 'boys', 'girls', 'child', 'toddler'],
    patterns: [/mini\s*steps/i, /kids?/i, /children/i, /toddler/i],
    response: `### 🧒 SOLE Mini Steps (Kids' Range)\n\nPlayproof, lightweight shoes for growing feet.\n\n* **Price:** **PKR 1,999 – 3,499**\n* **Sizes:** UK 1C – UK 6\n* **Closure:** Easy-adjust hook-and-loop Velcro straps\n* **Outsole:** Non-marking anti-slip flexible rubber\n* **Special Offer:** 🎁 **Buy 2, Get 1 FREE** on the Mini Steps collection all year round!`,
    suggestions: ['Ongoing offers & discount codes', 'Size guide for kids', 'Delivery fees']
  },

  // 7. SPORT ELITE
  {
    id: 'product_sport_elite',
    title: 'SOLE Sport Elite (Athletic / Gym)',
    section: 'Section 2.1 & 2.2: Product Catalogue',
    keywords: ['sport elite', 'sport', 'gym', 'training', 'workout', 'athletic', 'fitness'],
    patterns: [/sport\s*elite/i, /gym\s*shoes?/i, /workout/i, /training\s*shoes?/i],
    response: `### 🏋️ SOLE Sport Elite (Gym & Athletic)\n\nHigh-performance trainers engineered for heavy lifts, agility drills, and cardio.\n\n* **Price:** **PKR 6,999 – 10,499**\n* **Available Colors:** Neon Green, Carbon Black, Cobalt Blue\n* **Sizes:** UK 5 – UK 13\n* **Midsole:** High-rebound foam with lateral stability cage\n* **Best For:** Weight training, HIIT, cross-training.`,
    suggestions: ['Urban Runner comparison', 'Sizing & fit guide', 'Delivery time']
  },

  // 8. ALL PRODUCTS OVERVIEW
  {
    id: 'all_products',
    title: 'Complete Product Catalogue & Prices',
    section: 'Section 2.1: Product Catalogue',
    keywords: ['products', 'catalog', 'catalogue', 'all shoes', 'collection', 'prices', 'rate list', 'price list', 'models', 'types'],
    patterns: [/all\s*products/i, /catalog/i, /price\s*list/i, /shoe\s*lines/i, /what\s*shoes/i],
    response: `### 🛍️ SOLE Core Product Lines at a Glance\n\n| Line | Category | Price (PKR) | Sizes | Highlights |\n| :--- | :--- | :--- | :--- | :--- |\n| **Urban Runner** | Sneakers | **5,499 – 7,999** | UK 4–13 | Breathable mesh, EVA midsole, bestseller |\n| **Flex Walk** | Casual | **3,999 – 5,499** | UK 4–13 | Faux leather, memory foam insole |\n| **Trekker Pro** | Outdoor/Hiking | **8,499 – 12,999** | UK 5–13 | Waterproof membrane, rugged grip |\n| **Grace** | Women's Collection | **4,499 – 9,999** | UK 3–9 | Cushioned arch support, heels & flats |\n| **Mini Steps** | Kids | **1,999 – 3,499** | UK 1C–6 | Velcro straps, Buy 2 Get 1 Free |\n| **Sport Elite** | Gym & Athletic | **6,999 – 10,499** | UK 5–13 | High-rebound foam, lateral stability |`,
    suggestions: ['Urban Runner details', 'How does delivery work?', 'Size chart']
  },

  // 9. SIZING & MEASUREMENT
  {
    id: 'sizing_guide',
    title: 'Sizing Chart & Fit Guide',
    section: 'Section 3: Sizing & Fit Guide',
    keywords: ['size', 'sizing', 'sizes', 'size chart', 'chart', 'measurement', 'measure', 'foot length', 'cm', 'fit', 'wide fit', 'eu size', 'us size', 'uk size'],
    patterns: [/size\s*chart/i, /how\s*to\s*measure/i, /what\s*size/i, /sizing/i, /fit\s*guide/i],
    response: `### 📏 SOLE Size Conversion & Fit Guide\n\nAll SOLE shoes follow **UK sizing**. Here is our official conversion chart:\n\n* **UK 4** = EU 37 | US Men 5 | US Women 6.5 | **23.0 cm**\n* **UK 5** = EU 38 | US Men 6 | US Women 7.5 | **24.0 cm**\n* **UK 6** = EU 39 | US Men 7 | US Women 8.5 | **25.0 cm**\n* **UK 7** = EU 40.5 | US Men 8 | US Women 9.5 | **26.0 cm**\n* **UK 8** = EU 42 | US Men 9 | US Women 10.5 | **27.0 cm**\n* **UK 9** = EU 43 | US Men 10 | US Women 11.5 | **28.0 cm**\n* **UK 10** = EU 44.5 | US Men 11 | **29.0 cm**\n* **UK 11** = EU 45.5 | US Men 12 | **30.0 cm**\n* **UK 12** = EU 47 | US Men 13 | **31.0 cm**\n\n**How to Measure Your Foot:**\n1. Place heel against a flat wall on a piece of paper.\n2. Mark the tip of your longest toe with a pencil.\n3. Measure the distance in centimeters (cm) and match with the chart.\n\n*Fit Tip:* SOLE shoes fit true to size. If you have broader feet, wide-fit (W) options are available in Urban Runner and Flex Walk!`,
    suggestions: ['14-day exchange if size is wrong', 'Urban Runner sneaker', 'Delivery times']
  },

  // 10. SHIPPING & DELIVERY
  {
    id: 'shipping_delivery',
    title: 'Shipping Zones, Timeframes & Fees',
    section: 'Section 5: Shipping & Delivery',
    keywords: ['shipping', 'delivery', 'deliver', 'delivering', 'charges', 'shipping fee', 'delivery fee', 'delivery time', 'dispatch', 'free delivery', 'free shipping', 'courier', 'tcs', 'leopards', 'trax', 'call courier'],
    patterns: [/deliver/i, /shipping/i, /how\s*long.*deliver/i, /delivery\s*charges?/i, /shipping\s*rates?/i, /couriers?/i, /free\s*shipping/i, /dispatch/i],
    response: `### 🚚 Nationwide Delivery Across Pakistan\n\nWe deliver to all cities, towns, and regions in Pakistan:\n\n* **Karachi:** **1–2 Business Days** — PKR 150 *(Same-day available on select orders)*\n* **Major Cities (Lahore, Islamabad, Rawalpindi, Faisalabad):** **2–3 Business Days** — PKR 200\n* **Rest of Pakistan:** **3–5 Business Days** — PKR 300\n\n🎉 **FREE Delivery:** On all orders above **PKR 5,000** nationwide!\n\n* **Courier Partners:** TCS, Leopards, Trax, and Call Courier.\n* **Tracking:** You will receive an SMS and WhatsApp tracking link with your dispatch ID immediately upon shipping.`,
    suggestions: ['How to track my order?', 'Payment methods (COD available)', '14-day exchange policy']
  },

  // 11. ORDER TRACKING
  {
    id: 'order_tracking',
    title: 'Order Tracking & Courier Updates',
    section: 'Section 5.3: Order Tracking',
    keywords: ['track', 'tracking', 'order status', 'where is my order', 'courier', 'dispatch status', 'tcs tracking'],
    patterns: [/track.*order/i, /where\s*is\s*my\s*order/i, /order\s*status/i],
    response: `### 📦 Tracking Your SOLE Order\n\n* **SMS & WhatsApp Tracking:** As soon as your order leaves our Karachi warehouse, an automatic tracking link with your Tracking ID (TCS/Leopards/Trax) will be sent to your phone number.\n* **Instant Tracking Support:** Send your Order ID or phone number to our WhatsApp support at **+92 300 SOLE PK (765 3 75)** and our team will provide live tracking updates.\n* **Dispatch Cutoff:** Orders placed before **2:00 PM (PKT)** are processed and dispatched on the same business day!`,
    suggestions: ['Delivery timeframes', 'Customer support contact', 'Payment methods']
  },

  // 12. RETURNS & EXCHANGES
  {
    id: 'returns_exchanges',
    title: 'Returns & 14-Day Exchanges Policy',
    section: 'Section 6: Returns & Exchanges Policy',
    keywords: ['return', 'returns', 'exchange', 'exchanges', 'refund', 'refunds', 'money back', 'change size', 'wrong size', 'defective', 'damage', 'policy', 'days'],
    patterns: [/return\s*policy/i, /exchange\s*policy/i, /how\s*to\s*return/i, /how\s*to\s*exchange/i, /refund/i],
    response: `### 🔄 Hassle-Free Returns & Exchanges\n\n* **7-Day Return Policy:** You can return any online purchase within **7 days** of delivery for a full refund.\n  * Must be unworn, unused, with all original tags intact and shoe box.\n* **14-Day Free Exchange Policy:** Size or color didn't fit? We offer a **100% FREE first exchange** within **14 days**! We will arrange courier pickup right from your doorstep.\n* **Defective or Wrong Item Received?** 100% free immediate replacement or full refund processed within **48 hours**.\n* **Refund Processing:**\n  * Bank/Card: 5–7 business days.\n  * COD Orders: Refunded via JazzCash, Easypaisa, or direct bank transfer within 3–5 business days.\n\n*Note: Items discounted above 40% are final sale.*`,
    suggestions: ['How to contact support for exchange', 'Size chart & fit guide', 'Delivery charges']
  },

  // 13. PAYMENT METHODS
  {
    id: 'payments',
    title: 'Payment Methods & Installments',
    section: 'Section 4.2: Payment Methods',
    keywords: ['payment', 'pay', 'cod', 'cash on delivery', 'credit card', 'debit card', 'visa', 'mastercard', 'installment', 'installments', 'bank transfer', 'easypaisa', 'jazzcash'],
    patterns: [/payment\s*methods?/i, /cash\s*on\s*delivery/i, /cod/i, /installments?/i, /how\s*to\s*pay/i],
    response: `### 💳 Secure Payment Methods\n\n* **Cash on Delivery (COD):** Available across Pakistan up to PKR 50,000. *(A small PKR 50 handling fee applies on COD orders below PKR 3,000).* \n* **Credit / Debit Cards:** Visa, Mastercard, and UnionPay accepted through encrypted 3D-secure checkout.\n* **Direct Bank Transfer:** Available at checkout with instant receipt verification.\n* **0% Markup Installments:** Available for 3 months on orders above **PKR 10,000** through partnered banks (Bank Alfalah, Faysal Bank, Silkbank).`,
    suggestions: ['How to place an order?', 'Delivery time & charges', 'Return policy']
  },

  // 14. STORE LOCATIONS
  {
    id: 'store_locations',
    title: 'Physical Store Locations & Outlets',
    section: 'Section 7: Store Locations',
    keywords: ['store', 'stores', 'location', 'locations', 'outlet', 'outlets', 'shop', 'shops', 'branch', 'branches', 'where are you', 'address', 'visit', 'mall', 'dolmen', 'packages', 'centaurus', 'tariq road', 'clifton', 'gulberg'],
    patterns: [/store/i, /outlet/i, /shop/i, /branch/i, /where\s+are\s+(you|your\s+stores?)/i, /physical\s+location/i, /addresses?/i],
    response: `### 📍 SOLE Retail Outlets Across Pakistan\n\n**Karachi:**\n1. **Dolmen Mall Clifton:** First Floor, Shop 12 | 📞 +92 21 3456 7890\n2. **Tariq Road PECHS:** Commercial Area B-24 | 📞 +92 21 3456 7891\n3. **Gulshan-e-Iqbal:** Block 6, Main University Road | 📞 +92 21 3456 7892\n\n**Lahore:**\n1. **Gulberg III:** MM Alam Road, Block B | 📞 +92 42 3456 7893\n2. **Packages Mall:** Ground Floor, Walton Road | 📞 +92 42 3456 7894\n\n**Islamabad & Rawalpindi:**\n1. **Centaurus Mall:** 2nd Floor, F-8, Islamabad | 📞 +92 51 3456 7895\n2. **Saddar, Rawalpindi:** Bank Road | 📞 +92 51 3456 7897\n\n**Faisalabad:**\n* **Kohinoor City:** Jaranwala Road | 📞 +92 41 3456 7896\n\n⏰ **Timings:** Mon–Sun: 10:00 AM – 10:00 PM *(Fri: 3:00 PM – 11:00 PM)*`,
    suggestions: ['Store return policy', 'Urban Runner price', 'Contact support on WhatsApp']
  },

  // 15. PROMOTIONS & DISCOUNT CODES
  {
    id: 'promotions',
    title: 'Discounts, Promos & Ongoing Deals',
    section: 'Section 10: Current Promotions & Discounts',
    keywords: ['discount', 'discounts', 'promo', 'promo code', 'coupon', 'voucher', 'sale', 'offers', 'deal', 'deals', 'first10', 'save'],
    patterns: [/discounts?/i, /promo\s*codes?/i, /coupons?/i, /vouchers?/i, /sales?/i, /offers?/i],
    response: `### 🏷️ Current Offers & Discount Codes\n\n* 🎁 **New Customer Welcome Code:** Use **\`FIRST10\`** at checkout for **10% OFF** your first order!\n* 🧒 **Mini Steps Kids Promo:** **Buy 2, Get 1 FREE** on all kids shoes all year round!\n* 🚚 **Free Shipping:** Automatic free shipping on all orders above **PKR 5,000**.\n* 🛍️ **Seasonal Sales:** Up to **50% OFF** during our Eid, Independence Day (August), and Blessed Friday (November) celebrations.\n\n*Policy: Only one promo code can be applied per checkout order.*`,
    suggestions: ['Complete product catalogue', 'How to order?', 'Delivery fees']
  },

  // 16. LOYALTY REWARDS PROGRAM
  {
    id: 'loyalty_rewards',
    title: 'SOLE Rewards Loyalty Program',
    section: 'Section 9: SOLE Rewards Loyalty Program',
    keywords: ['loyalty', 'rewards', 'points', 'membership', 'tier', 'bronze', 'silver', 'gold', 'earn points', 'redeem'],
    patterns: [/loyalty/i, /rewards?/i, /points/i, /membership/i],
    response: `### 🌟 SOLE Rewards Loyalty Club\n\n* **Earn Points:** Earn **1 point for every PKR 100** spent online and in-store.\n* **Point Value:** **1 point = PKR 1** discount applicable directly at checkout!\n\n**Membership Tiers:**\n* **Bronze (0 – 5,000 pts):** Standard earn rate + Birthday reward (500 bonus pts).\n* **Silver (5,001 – 15,000 pts):** **1.25x** points multiplier + early access to new drops.\n* **Gold (15,001+ pts):** **1.5x** points multiplier + **FREE delivery on all orders forever** + VIP helpline.\n\n*Points remain valid for 12 months from the date of earning.*`,
    suggestions: ['How to check my points?', 'Current discount codes', 'Store locations']
  },

  // 17. SHOE CARE & CLEANING
  {
    id: 'shoe_care',
    title: 'Shoe Care, Cleaning & Maintenance',
    section: 'Section 8: Shoe Care & Maintenance',
    keywords: ['care', 'clean', 'cleaning', 'wash', 'washing', 'maintain', 'brush', 'waterproof', 'leather care', 'suede', 'replace'],
    patterns: [/how\s*to\s*clean/i, /wash.*shoes?/i, /shoe\s*care/i, /maintenance/i],
    response: `### 🧼 Official SOLE Shoe Care Guide\n\n* **Knit Mesh & Canvas (Urban Runner / Sport Elite):**\n  * Clean with mild soap, lukewarm water, and a soft-bristled brush.\n  * **Do NOT machine wash** or tumble dry. Air dry in shade away from direct sunlight.\n* **Leather (Flex Walk):**\n  * Wipe clean with a soft damp microfiber cloth. Apply neutral leather balm or cream every 2–3 months.\n* **Suede:**\n  * Use a dry suede brush in one direction only. Never use water directly on suede.\n* **When to Replace:** Running & athletic shoes should typically be retired after **500–800 km** of use to maintain optimal cushioning.`,
    suggestions: ['Urban Runner sneaker', 'Trekker Pro waterproof boots', 'Return & warranty']
  },

  // 18. CUSTOMER SERVICE & CONTACT
  {
    id: 'contact_support',
    title: 'Customer Service & Contact Details',
    section: 'Section 1.1 & 12.2: Brand Overview & Support',
    keywords: ['contact', 'support', 'help', 'whatsapp', 'phone', 'email', 'helpline', 'representative', 'agent', 'call', 'human', 'complaint'],
    patterns: [/contact/i, /support/i, /phone\s*number/i, /whatsapp/i, /talk\s*to\s*human/i, /helpline/i, /email/i],
    response: `### 📞 Reach SOLE Customer Support\n\nOur team is here to assist with orders, tracking, exchanges, and product recommendations:\n\n* 💬 **WhatsApp Support:** **+92 300 SOLE PK (+92 300 765375)** *(Fastest response)*\n* ✉️ **Email Support:** **support@soleofficial.pk**\n* ☎️ **UAN Helpline:** **+92 21 111 765 375**\n* ⏰ **Operating Hours:** Monday to Saturday: **9:00 AM – 8:00 PM (PKT)**\n\n*All emails and WhatsApp inquiries are answered within 2 hours during business hours!*`,
    suggestions: ['Store locations', '14-day exchange policy', 'Track an existing order']
  },

  // 19. GREETING
  {
    id: 'greeting',
    title: 'Welcome to SOLE',
    section: 'Section 1: Brand Welcome',
    keywords: ['hello', 'hi', 'hey', 'salam', 'assalam', 'aoa', 'good morning', 'good afternoon', 'good evening'],
    patterns: [/^(hi|hello|hey|salam|aoa|assalam.*|good\s*(morning|evening|afternoon))/i],
    response: `👋 **Welcome to SOLE — Walk Your Story!**\n\nI am your official SOLE assistant. I have our complete brand knowledge base ready to assist you.\n\nHere are the most popular topics I can help with:\n* 👟 **Shoe Lines & Prices** *(Urban Runner, Flex Walk, Trekker Pro, Grace, Mini Steps)*\n* 🚚 **Delivery Times & Shipping Rates** *(Karachi, Lahore, Islamabad & Nationwide)*\n* 🔄 **7-Day Returns & 14-Day Free Size Exchanges**\n* 📏 **Size Conversion & Measuring Guide**\n* 📍 **Store Locations & Opening Hours**\n\nWhat would you like to know today?`,
    suggestions: ['Urban Runner prices & colors', 'Delivery time to Lahore', '14-day exchange policy', 'Size chart']
  },

  // 20. FAQ: INTERNATIONAL SHIPPING
  {
    id: 'faq_international',
    title: 'International Shipping Policy',
    section: 'Section 11.3: Shipping FAQs',
    keywords: ['international', 'outside pakistan', 'worldwide', 'ship abroad', 'dubai', 'uk', 'usa'],
    patterns: [/international/i, /outside\s*pakistan/i, /worldwide/i, /ship\s*abroad/i],
    response: `### 🌍 International Shipping Policy\n\nCurrently, SOLE ships **exclusively within Pakistan** to ensure our express 1–3 day delivery and free return pickups.\n\n* **Future Expansion:** Nationwide delivery is our current focus; international shipping across GCC and UK is planned for **late 2026**.\n* If you are abroad and wish to send a gift to family in Pakistan, you can pay online via Visa/Mastercard with a Pakistan delivery address!`,
    suggestions: ['Delivery across Pakistan', 'Payment methods for overseas cards', 'Product catalogue']
  },

  // 21. FAQ: ORDER CANCELLATION & MODIFICATION
  {
    id: 'faq_cancellation',
    title: 'Order Cancellation & Changes',
    section: 'Section 11.1: Ordering FAQs',
    keywords: ['cancel', 'cancellation', 'modify order', 'change address', 'wrong address', 'edit order'],
    patterns: [/cancel.*order/i, /modify.*order/i, /change.*address/i],
    response: `### ✏️ Modifying or Cancelling Your Order\n\n* **Within 2 Hours:** You can modify product sizes, change delivery addresses, or cancel your order within **2 hours** of placement.\n* **How to Request:** Quickly send your Order ID to our WhatsApp team at **+92 300 SOLE PK (765 3 75)**.\n* **After Dispatch:** Once an order has been handed over to the courier (TCS/Leopards), it cannot be cancelled or re-routed, but you can utilize our **14-day free exchange policy** upon arrival!`,
    suggestions: ['Contact WhatsApp support', '14-day exchange policy', 'Track an existing order']
  },

  // 22. FAQ: WARRANTY & QUALITY GUARANTEE
  {
    id: 'faq_warranty',
    title: '3-Month Manufacturing Warranty',
    section: 'Section 11.6: Product Care & Warranty',
    keywords: ['warranty', 'guarantee', 'sole separation', 'stitching', 'damaged', 'defect', 'quality guarantee'],
    patterns: [/warranty/i, /guarantee/i, /manufacturing\s*defect/i],
    response: `### 🛡️ SOLE 3-Month Warranty Guarantee\n\nEvery pair of SOLE shoes undergoes **47 quality checkpoints** and comes with a **3-Month Manufacturing Warranty** against:\n\n* Sole separation or bond failure\n* Defective stitching or seam breakage\n* Eyelet or hardware failure under regular wear\n\n*If you experience any of these issues within 90 days, we will repair or replace your shoes completely free of charge.*`,
    suggestions: ['How to claim warranty', 'Shoe care & maintenance', 'Return policy']
  }
]

// Natural Query Matcher
export function queryKnowledgeBase(rawQuery) {
  if (!rawQuery || !rawQuery.trim()) {
    return {
      reply: "Please type a question about SOLE footwear, sizing, orders, delivery, or stores!",
      sources: [],
      suggestions: ['Urban Runner prices & colors', 'Delivery time & charges', '14-day Return policy', 'Size chart']
    }
  }

  const query = rawQuery.toLowerCase().trim()
  const cleanTokens = query.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 1)

  // 1. Direct Regex Pattern Matching
  for (const topic of KNOWLEDGE_TOPICS) {
    if (topic.patterns) {
      for (const pattern of topic.patterns) {
        if (pattern.test(query)) {
          return {
            reply: topic.response,
            sources: [{ title: topic.section, category: topic.title }],
            suggestions: topic.suggestions
          }
        }
      }
    }
  }

  // 2. Keyword & Token Scoring
  let bestScore = 0
  let bestTopic = null

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0

    // Check exact keyword matches
    for (const kw of topic.keywords) {
      if (query.includes(kw)) {
        score += kw.split(' ').length * 3 // Higher weight for multi-word phrases
      }
    }

    // Check individual token overlap
    for (const token of cleanTokens) {
      if (topic.keywords.some(kw => kw.includes(token))) {
        score += 1
      }
    }

    if (score > bestScore) {
      bestScore = score
      bestTopic = topic
    }
  }

  if (bestTopic && bestScore >= 2) {
    return {
      reply: bestTopic.response,
      sources: [{ title: bestTopic.section, category: bestTopic.title }],
      suggestions: bestTopic.suggestions
    }
  }

  // 3. Smart Fallback with Curated Navigation
  return {
    reply: `I couldn't find an exact answer for *"${rawQuery}"* in our knowledge base, but I can help you with anything related to SOLE footwear!\n\nPlease select one of the topics below or contact our human customer support team directly at **WhatsApp: +92 300 SOLE PK (765 3 75)**.`,
    sources: [{ title: 'Section 1.1: Customer Support', category: 'Help & Navigation' }],
    suggestions: [
      'Urban Runner prices & colors',
      'Delivery time & shipping rates',
      '7-day Return & Exchange policy',
      'Sizing & fit guide',
      'Store locations in Pakistan'
    ]
  }
}
