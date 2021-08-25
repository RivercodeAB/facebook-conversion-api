Facebook Conversion API

> Node.js wrapper for [Facebook's Conversion API](https://developers.facebook.com/docs/marketing-api/conversions-api/)

## Install

```bash
npm install https://gitlab.com/rivercode/facebook-conversion-api
```

## Initiate Facebook Conversion API
```bash
const ConversionAPI = require('facebook-conversion-api');

const ConversionAPI = new FacebookConversionAPI(
  'accessToken',
  'pixelId',
  'clientIpAddress',
  'clientUserAgent',
  'fbp',
  'fpc',
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

### Purchase Event
```bash
ConversionAPI.addProduct(productSku, quantity);
ConversionAPI.sendEvent('Purchase', sourceUrl, { currency: 'SEK', value: 1000 });
```
