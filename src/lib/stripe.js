import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const planPriceId = {
    "seeker_pro":"price_1TiS0MK82KD3LxYYsYTnAOI2",
    "seeker_premium":"price_1TiSgUK82KD3LxYYG8rNdjjN",
    "recruiter_growth":"price_1TiSj0K82KD3LxYYdGoqj8RV",
    "recruiter_enterprise":"price_1TiSkkK82KD3LxYYAhIwoPNi",
}