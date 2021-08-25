const FacebookConversionAPI = require('../dist/index');

/**
 * Initiate Facebook Conversion API
 * @type {FacebookConversionAPI}
 */
const ConversionAPI = new FacebookConversionAPI(
  'accessToken',
  'pixelId',
  'clientIpAddress',
  'clientUserAgent',
  'fbp',
  'fpc',
);

/**
 * ViewContent Event
 */
ConversionAPI.addProduct(123, 1);
ConversionAPI.sendEvent('ViewContent', 'https://site.com/p/product-slug');

/**
 * Add To Cart Event
 */
ConversionAPI.addProduct(123, 1);
ConversionAPI.sendEvent('AddToCart', 'https://site.com/p/product-slug');

/**
 * Purchase Event
 */
ConversionAPI.addProduct(123, 1);
ConversionAPI.sendEvent('Purchase', 'https://site.com/checkout', { currency: 'SEK', value: 1000 });
