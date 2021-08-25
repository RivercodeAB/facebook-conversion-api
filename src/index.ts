/* eslint-disable  @typescript-eslint/no-explicit-any */

const bizSdk = require('facebook-nodejs-business-sdk');

class FacebookConversionAPI {
  accessToken: string;

  pixelId: string;

  fbp: string;

  fbc: string;

  userData: any;

  contents: any;

  /**
   * Constructor.
   *
   * @param accessToken
   * @param pixelId
   * @param clientIpAddress
   * @param clientUserAgent
   * @param fbp
   * @param fbc
   */
  constructor(
    accessToken: string, pixelId: string,
    clientIpAddress: string, clientUserAgent: string, fbp: string, fbc: string,
  ) {
    this.accessToken = accessToken;
    this.pixelId = pixelId;
    this.fbp = fbp;
    this.fbc = fbc;
    this.userData = (new bizSdk.UserData())
      .setClientIpAddress(clientIpAddress)
      .setClientUserAgent(clientUserAgent)
      .setFbp(null)
      .setFbc(null);
    this.contents = [];
  }

  /**
   * Add product to contents array.
   *
   * @param sku
   * @param quantity
   */
  addProduct(sku: number, quantity: number): any {
    this.contents.push((new bizSdk.Content()).setId(sku).setQuantity(quantity));
  }

  /**
   * Send event to Facebook Conversion API and clear contents array after event is fired.
   *
   * @param eventName
   * @param sourceUrl
   * @param params
   */
  sendEvent(
    eventName: string, sourceUrl: string, params?: { currency?: string, value?: number },
  ): any {
    const eventRequest = (new bizSdk.EventRequest(this.accessToken, this.pixelId))
      .setEvents([this.#getEventData(eventName, sourceUrl, params)]);

    this.contents = [];

    eventRequest.execute().then(
      (response: any) => response,
      (error: any) => error,
    );
  }

  /**
   * Get event data.
   *
   * @param eventName
   * @param sourceUrl
   * @param params
   */
  #getEventData(
    eventName: string,
    sourceUrl: string,
    params?: { currency?: string, value?: number },
  ): any {
    const currentTimestamp = Math.floor(new Date() as any / 1000);

    return (new bizSdk.ServerEvent())
      .setEventName(eventName)
      .setEventTime(currentTimestamp)
      .setUserData(this.userData)
      .setCustomData((new bizSdk.CustomData())
        .setContents(this.contents)
        .setCurrency(params?.currency)
        .setValue(params?.value))
      .setEventSourceUrl(sourceUrl)
      .setActionSource('website');
  }
}

module.exports = FacebookConversionAPI;
