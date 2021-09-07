"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FacebookConversionAPI_instances, _FacebookConversionAPI_getEventData;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable  @typescript-eslint/no-explicit-any */
const bizSdk = require('facebook-nodejs-business-sdk');
class FacebookConversionAPI {
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
    constructor(accessToken, pixelId, emails, phones, clientIpAddress, clientUserAgent, fbp, fbc, debug = false) {
        _FacebookConversionAPI_instances.add(this);
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
            console.log(`User Data: ${JSON.stringify(this.userData)}\n`);
        }
    }
    /**
     * Add product to contents array.
     *
     * @param sku
     * @param quantity
     */
    addProduct(sku, quantity) {
        this.contents.push((new bizSdk.Content()).setId(sku).setQuantity(quantity));
        if (this.debug) {
            console.log(`Add To Cart: ${JSON.stringify(this.contents)}\n`);
        }
    }
    /**
     * Send event to Facebook Conversion API and clear contents array after event is fired.
     *
     * @param eventName
     * @param sourceUrl
     * @param purchaseData
     * @param eventData
     */
    sendEvent(eventName, sourceUrl, purchaseData, eventData) {
        const eventRequest = (new bizSdk.EventRequest(this.accessToken, this.pixelId))
            .setEvents([__classPrivateFieldGet(this, _FacebookConversionAPI_instances, "m", _FacebookConversionAPI_getEventData).call(this, eventName, sourceUrl, purchaseData, eventData)]);
        this.contents = [];
        eventRequest.execute().then((response) => response, (error) => error);
        if (this.debug) {
            console.log(`Event Request: ${JSON.stringify(eventRequest)}\n`);
        }
    }
}
_FacebookConversionAPI_instances = new WeakSet(), _FacebookConversionAPI_getEventData = function _FacebookConversionAPI_getEventData(eventName, sourceUrl, purchaseData, eventData) {
    const currentTimestamp = Math.floor(new Date() / 1000);
    return (new bizSdk.ServerEvent())
        .setEventName(eventName)
        .setEventTime(currentTimestamp)
        .setEventId(eventData === null || eventData === void 0 ? void 0 : eventData.eventId)
        .setUserData(this.userData)
        .setCustomData((new bizSdk.CustomData())
        .setContents(this.contents)
        .setCurrency(purchaseData === null || purchaseData === void 0 ? void 0 : purchaseData.currency)
        .setValue(purchaseData === null || purchaseData === void 0 ? void 0 : purchaseData.value))
        .setEventSourceUrl(sourceUrl)
        .setActionSource('website');
};
exports.default = FacebookConversionAPI;
