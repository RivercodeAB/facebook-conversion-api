Facebook Conversion API

> Node.js wrapper for [Facebook's Conversion API](https://developers.facebook.com/docs/marketing-api/conversions-api/)

## Install

```bash
npm install https://github.com/RivercodeAB/facebook-conversion-api
```

## Initiate Facebook Conversion API
```bash
const FacebookConversionAPI = require('facebook-conversion-api');

const ConversionAPI = new FacebookConversionAPI(
  'accessToken',
  'pixelId',
  'emails': ['email1', 'email2'], // or null
  'phones': ['phone1', 'phone2'], // or null
  'clientIpAddress',
  'clientUserAgent',
  'fbp',
  'fpc',
  'debug', // default to false
);
```

Read more here on how you can get your [access token](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/#access-token) and [fbp/fpc identifiers](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc/).

### ViewContent Event
```bash
ConversionAPI.addProduct(productSku, quantity);
ConversionAPI.sendEvent('ViewContent', sourceUrl);
```

### Add To Cart Event
```bash
ConversionAPI.addProduct(productSku, quantity);
ConversionAPI.sendEvent('AddToCart', sourceUrl);
```

### Initiate Checkout Event
```bash
ConversionAPI.addProduct(productSku, quantity);
ConversionAPI.sendEvent('InitiateCheckout', sourceUrl, { currency: 'USD', value: 1000 });
```

### Purchase Event
```bash
ConversionAPI.addProduct(productSku, quantity);
ConversionAPI.sendEvent('Purchase', sourceUrl, { currency: 'USD', value: 1000 });
```
