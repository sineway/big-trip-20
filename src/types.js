/**
 * @typedef {import('./utils.js').SafeHtml} SafeHtml
 */

/**
 * @typedef {import('./views/view.js').default} View
 * @typedef {import('./views/brief-view.js').default} BriefView
 * @typedef {import('./views/add-view.js').default} AddView
 * @typedef {import('./views/filter-view.js').default} FilterView
 * @typedef {import('./views/sort-view.js').default} SortView
 * @typedef {import('./views/list-view.js').default} ListView
 * @typedef {import('./views/card-view.js').default} CardView
 * @typedef {import('./views/editor-view.js').default} EditorView
 */

/**
 * @typedef Point
 * @prop {string} id
 * @prop {PointType} type
 * @prop {string} destination
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} base_price
 * @prop {Array<string>} offers
 * @prop {boolean} is_favorite
 */

/**
 * @typedef Destination
 * @prop {string} id
 * @prop {string} name
 * @prop {string} description
 * @prop {Array<Picture>} pictures
 */

/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {PointType} type
 * @prop {Array<Offer>} offers
 */

/**
 * @typedef Offer
 * @prop {string} id
 * @prop {string} title
 * @prop {number} price
 */

/**
 * @typedef {'taxi' | 'bus' | 'train' | 'ship' | 'drive' | 'flight' | 'check-in' | 'sightseeing' | 'restaurant'} PointType
 */
