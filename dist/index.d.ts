declare class FacebookConversionAPI {
    #private;
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
    constructor(accessToken: string, pixelId: string, emails: Array<string> | null, phones: Array<string> | null, clientIpAddress: string, clientUserAgent: string, fbp: string, fbc: string, debug?: boolean);
    /**
     * Add product to contents array.
     *
     * @param sku
     * @param quantity
     */
    addProduct(sku: string, quantity: number): void;
    /**
     * Send event to Facebook Conversion API and clear contents array after event is fired.
     *
     * @param eventName
     * @param sourceUrl
     * @param params
     */
    sendEvent(eventName: string, sourceUrl: string, params?: {
        currency?: string;
        value?: number;
    }): void;
}
export default FacebookConversionAPI;
