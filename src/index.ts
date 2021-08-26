/* eslint-disable  @typescript-eslint/no-explicit-any */

const bizSdk = require('facebook-nodejs-business-sdk');

class FacebookConversionAPI {
  accessToken: string;

  pixelId: string;

  fbp: string;

  fbc: string;

  userData: any;

  contents: any;

  debug: boolean;

  /**
   * Constructor.
   *
   * @param accessToken
   * @param pixelId
   * @param emails
   * @param phones
   * @param clientIpAddress
   * @param clientUserAgent
   * @param fbp
   * @param fbc
   * @param debug
   */
  constructor(
    accessToken: string, pixelId: string, emails: Array<string>|null,
    phones: Array<string>|null, clientIpAddress: string, clientUserAgent: string,
    fbp: string, fbc: string, debug: boolean = false,
  ) {
    this.accessToken = accessToken;
    this.pixelId = pixelId;
    this.fbp = fbp;
    this.fbc = fbc;
    this.debug = debug;
    this.userData = (new bizSdk.UserData())
      .setEmails(emails)
      .setPhones(phones)
      .setClientIpAddress(clientIpAddress)
      .setClientUserAgent(clientUserAgent)
      .setFbp(fbp)
      .setFbc(fbc);
    this.contents = [];

    if (this.debug) {
      console.log(`User Data: ${JSON.stringify(this.userData)}`);
    }
  }

  /**
   * Add product to contents array.
   *
   * @param sku
   * @param quantity
   */
  addProduct(sku: number, quantity: number): void {
    this.contents.push((new bizSdk.Content()).setId(sku).setQuantity(quantity));

    if (this.debug) {
      console.log(`Add To Cart: ${JSON.stringify(this.contents)}`);
    }
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
  ): void {
    const eventRequest = (new bizSdk.EventRequest(this.accessToken, this.pixelId))
      .setEvents([this.#getEventData(eventName, sourceUrl, params)]);

    this.contents = [];

    eventRequest.execute().then(
      (response: any) => response,
      (error: any) => error,
    );

    if (this.debug) {
      console.log(`Event Request: ${JSON.stringify(eventRequest)}`);
    }
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

export default FacebookConversionAPI;
