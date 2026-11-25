// src/data/soleKnowledgeEngine.js
// Dynamic Store Intelligence Engine for SOLE (Zero AI, Zero Ollama, Instant Response)
// Backed by structured dataset: src/data/soleKnowledgeData.json
import defaultKnowledgeData from './soleKnowledgeData.json' with { type: 'json' }

// Common stop-words filtered during automatic keyword extraction
const STOP_WORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'in', 'to', 'for', 'of', 'with',
  'as', 'by', 'our', 'we', 'you', 'your', 'it', 'its', 'from', 'that', 'this', 'all', 'are',
  'was', 'were', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'but', 'if', 'so', 'can',
  'will', 'just', 'about', 'also', 'more', 'than', 'here', 'there', 'what', 'when', 'where'
])

// Utility: Strips emojis and cleans whitespace
export const stripEmojis = (str) => {
  if (!str) return ''
  return str
    .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '')
    .split('\n')
    .map(line => line.replace(/[ \t]{2,}/g, ' '))
    .join('\n')
    .trim()
}

/**
 * FUNCTION 1: createTopicAuto(entry, index)
 * Automatically parses any entry (raw plain text, Q&A string, or structured object)
 * and generates a complete Topic object with:
 *   - Auto-generated slug ID
 *   - Clean Title & Section
 *   - Extracted Keywords (frequency-ranked, non-stopword)
 *   - Compiled / Auto-generated Regex Matching Patterns
 *   - Formatted & Emoji-Free Response
 *   - Contextual Follow-Up Suggestions
 */
export function createTopicAuto(entry, index = 1) {
  if (!entry) return null
  const isString = typeof entry === 'string'
  const rawResponse = isString ? entry : (entry.response || entry.text || entry.answer || '')
  const response = stripEmojis(rawResponse)

  // 1. Auto-generate clean title
  const firstLine = response.split('\n')[0].replace(/^[#* \t]+/, '').trim()
  const title = (!isString && entry.title)
    ? entry.title.trim()
    : (firstLine ? firstLine.slice(0, 52) : `Store Guide Topic ${index}`)

  // 2. Auto-generate slug ID
  const id = (!isString && entry.id)
    ? entry.id.trim()
    : title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 36) || `topic_${index}`

  // 3. Section Category
  const section = (!isString && entry.section) ? entry.section : 'Official Store Guide'

  // 4. Auto-extract keywords
  const explicitKeywords = (!isString && Array.isArray(entry.keywords)) ? entry.keywords : []
  const textTokens = (title + ' ' + response)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w))

  const tokenFreq = {}
  for (const token of textTokens) {
    tokenFreq[token] = (tokenFreq[token] || 0) + 1
  }

  // Top extracted keywords by occurrence
  const topExtracted = Object.keys(tokenFreq)
    .sort((a, b) => tokenFreq[b] - tokenFreq[a])
    .slice(0, 10)

  // Merge user-provided and auto-extracted keywords (deduplicated)
  const allKeywords = [...new Set([
    ...explicitKeywords.map(k => String(k).toLowerCase().trim()),
    ...topExtracted
  ])]

  // 5. Compile or Auto-generate Regex Patterns
  const compiledPatterns = []
  if (!isString && Array.isArray(entry.patterns) && entry.patterns.length > 0) {
    for (const p of entry.patterns) {
      if (p instanceof RegExp) {
        compiledPatterns.push(p)
      } else if (typeof p === 'string' && p.trim()) {
        try {
          compiledPatterns.push(new RegExp(p, 'i'))
        } catch {
          compiledPatterns.push(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))
        }
      }
    }
  } else {
    // Auto-generate patterns from title phrase sequence
    const cleanTitleWords = title.replace(/[^a-zA-Z0-9\s]/g, ' ').trim().split(/\s+/).slice(0, 3)
    if (cleanTitleWords.length > 1) {
      compiledPatterns.push(new RegExp(cleanTitleWords.join('\\s+'), 'i'))
    }
    // Auto-generate patterns for top keywords with word boundaries
    for (const kw of allKeywords.slice(0, 5)) {
      if (kw.length > 3) {
        compiledPatterns.push(new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i'))
      }
    }
  }

  // 6. Contextual Follow-up Suggestions
  const suggestions = (!isString && Array.isArray(entry.suggestions) && entry.suggestions.length > 0)
    ? entry.suggestions.map(s => stripEmojis(s))
    : [
        `Tell me about ${title}`,
        'Available vouchers & promo codes',
        'Delivery times & shipping rates'
      ]

  return {
    id,
    title,
    section,
    keywords: allKeywords,
    patterns: compiledPatterns,
    response,
    suggestions
  }
}

/**
 * FUNCTION 2: loadKnowledgeFromFile(customDataArray)
 * Loads knowledge entries from soleKnowledgeData.json (or any external JSON/array),
 * automatically converts every record into a structured Topic, and populates KNOWLEDGE_TOPICS.
 */
export function loadKnowledgeFromFile(sourceData = null) {
  const dataToLoad = Array.isArray(sourceData) ? sourceData : defaultKnowledgeData
  return dataToLoad.map((item, idx) => createTopicAuto(item, idx + 1))
}

// Active in-memory topics registry, initialized from soleKnowledgeData.json
export let KNOWLEDGE_TOPICS = loadKnowledgeFromFile(defaultKnowledgeData)

/**
 * FUNCTION 3: addNewKnowledgeText(entryOrText, metadata)
 * Allows adding any new information, product note, FAQ, or paragraph at runtime.
 * Automatically generates the topic using createTopicAuto and prepends it to
 * KNOWLEDGE_TOPICS so that questions about this newly added text are answered instantly!
 */
export function addNewKnowledgeText(entryOrText, metadata = {}) {
  let combinedEntry = {}
  if (typeof entryOrText === 'string') {
    combinedEntry = {
      response: entryOrText,
      ...metadata
    }
  } else if (typeof entryOrText === 'object' && entryOrText !== null) {
    combinedEntry = {
      ...entryOrText,
      ...metadata
    }
  }

  const newTopic = createTopicAuto(combinedEntry, KNOWLEDGE_TOPICS.length + 1)
  if (newTopic) {
    // Prepend to top priority so new updates override or take immediate precedence
    KNOWLEDGE_TOPICS.unshift(newTopic)
  }
  return newTopic
}

/**
 * Natural Query Resolution Matcher
 * 1. Matches against Regex patterns (both hand-curated & auto-generated)
 * 2. Matches using keyword & token relevance scoring
 * 3. Provides clean fallback if no confidence match found
 */
export function queryKnowledgeBase(rawQuery) {
  if (!rawQuery || !rawQuery.trim()) {
    return {
      reply: 'Please type a question about SOLE footwear, sizing, orders, delivery, billing, or active vouchers!',
      sources: [],
      suggestions: ['Available vouchers & promo codes', 'Urban Runner prices & colors', 'Billing & invoices', 'Delivery time & charges', 'Size chart']
    }
  }

  const query = rawQuery.toLowerCase().trim()
  const cleanTokens = query.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 1)

  // Intent Detection Flags
  const isBilling = /(bill|billing|invoice|invoices|receipt|receipts|gst|sales\s*tax|payment\s*slip|ntn|charges\s*breakup)/i.test(query)
  const isReturn = /(return|returns|exchange|exchanges|refund|refunds|replace|wrong\s*size|money\s*back|policy)/i.test(query)
  const isSize = /(size|sizes|sizing|size\s*chart|fit\s*guide|how\s*to\s*measure|fit|foot\s*length|cm\b)/i.test(query)
  const isDelivery = /(deliver|delivery|shipping|courier|dispatch|how\s*long.*deliver|delivery\s*time|shipping\s*rate)/i.test(query)
  const isTracking = /(track.*order|where\s*is\s*my\s*order|order\s*status|tracking\s*id|dispatch\s*status)/i.test(query)
  const isCare = /(clean|cleaning|wash|washing|brush|shoe\s*care|maintain|maintenance|stain)/i.test(query)
  const isVoucher = /(voucher|vouchers|promo|promos|coupon|coupons|discount\s*code|promo\s*code|first10|sole15|freeship)/i.test(query)
  const isStore = /(store|stores|outlet|outlets|shop|shops|branch|where\s+are\s+you|physical\s+location|address)/i.test(query)
  const isPayment = /(payment|pay|cash\s*on\s*delivery|\bcod\b|installment|installments|bank\s*transfer)/i.test(query)
  const isWarranty = /(warranty|guarantee|sole\s*separation|defective|defect)/i.test(query)
  const isContact = /(contact|whatsapp|support|helpline|phone\s*number|email|talk\s*to\s*human)/i.test(query)

  // High-Precision Candidate Scoring (Evaluates ALL topics to choose the true best match)
  let bestTopic = null
  let bestScore = -999

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0
    const id = topic.id || ''

    // 1. Regex Pattern Matches
    if (topic.patterns && topic.patterns.length > 0) {
      for (const pattern of topic.patterns) {
        if (pattern.test(query)) {
          score += 28
          // Additional bonus for specific, multi-character or compound patterns
          if (pattern.source && pattern.source.length > 9) {
            score += 16
          }
          break
        }
      }
    }

    // 2. Exact Keyword & Multi-word phrase matches
    for (const kw of topic.keywords) {
      if (query.includes(kw)) {
        score += kw.split(' ').length * 4
      }
    }

    // 3. Token overlap matches
    for (const token of cleanTokens) {
      if (topic.keywords.some(kw => kw.includes(token))) {
        score += 2
      }
    }

    // 4. Intent Alignment High-Priority Boosts
    if (isBilling && (id.includes('bill') || id.includes('invoice') || id.includes('receipt'))) score += 40
    if (isReturn && (id.includes('return') || id.includes('exchange'))) score += 40
    if (isSize && (id.includes('size') || id.includes('sizing') || id.includes('fit'))) score += 40
    if (isDelivery && (id.includes('shipping') || id.includes('deliver') || id.includes('city'))) score += 40
    if (isTracking && id.includes('track')) score += 40
    if (isCare && (id.includes('care') || id.includes('clean'))) score += 40
    if (isVoucher && (id.includes('voucher') || id.includes('promo'))) score += 40
    if (isStore && (id.includes('store') || id.includes('location'))) score += 40
    if (isPayment && !isBilling && id.includes('payment')) score += 32
    if (isWarranty && id.includes('warranty')) score += 40
    if (isContact && id.includes('contact')) score += 35

    // 5. Anti-Hijack Penalty:
    // If user asked an Action/Policy question (return, size, delivery, care, billing, etc.),
    // raw Product Catalogue overviews (e.g. product_grace, product_urban_runner, product_mini_steps)
    // must NOT steal the answer!
    if ((isReturn || isSize || isDelivery || isCare || isBilling || isVoucher || isTracking) && id.startsWith('product_')) {
      score -= 35
    }

    if (score > bestScore) {
      bestScore = score
      bestTopic = topic
    }
  }

  if (bestTopic && bestScore >= 4) {
    return {
      reply: stripEmojis(bestTopic.response),
      sources: [{ title: bestTopic.section, category: bestTopic.title }],
      suggestions: (bestTopic.suggestions || []).map(s => stripEmojis(s))
    }
  }

  // Fallback
  return {
    reply: `I couldn't find an exact match for "${rawQuery}" in our store guide, but I can help you with anything related to SOLE footwear, sizing, billing, active vouchers, or orders!\n\nPlease select one of the topics below or contact our human customer support team directly at WhatsApp: +92 300 SOLE PK (765 3 75).`,
    sources: [{ title: 'Customer Support & Help', category: 'Official Store Guide' }],
    suggestions: [
      'Available vouchers & promo codes',
      'Urban Runner prices & colors',
      'Billing, Invoices & Tax',
      'Delivery time & shipping rates',
      '7-day Return & Exchange policy',
      'Sizing & fit guide',
      'Store locations in Pakistan'
    ]
  }
}
