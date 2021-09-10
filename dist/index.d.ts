declare class FacebookConversionAPI {
    #private;
    accessToken: string;
    pixelId: string;
    fbp: string | null;
    fbc: string | null;
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
    constructor(accessToken: string, pixelId: string, emails: Array<string> | null, phones: Array<string> | null, clientIpAddress: string, clientUserAgent: string, fbp: string | null, fbc: string | null, debug?: boolean);
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
     * @param purchaseData
     * @param eventData
     */
    sendEvent(eventName: string, sourceUrl: string, purchaseData?: {
        value?: number;
        currency?: string;
    }, eventData?: {
        eventId?: string;
    }): void;
}
export default FacebookConversionAPI;
