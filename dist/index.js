"use strict";
/* eslint-disable  @typescript-eslint/no-explicit-any */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FacebookConversionAPI_instances, _FacebookConversionAPI_getEventData;
const bizSdk = require('facebook-nodejs-business-sdk');
class FacebookConversionAPI {
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
    constructor(accessToken, pixelId, clientIpAddress, clientUserAgent, fbp, fbc) {
        _FacebookConversionAPI_instances.add(this);
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
    addProduct(sku, quantity) {
        this.contents.push((new bizSdk.Content()).setId(sku).setQuantity(quantity));
    }
    /**
     * Send event to Facebook Conversion API and clear contents array after event is fired.
     *
     * @param eventName
     * @param sourceUrl
     * @param params
     */
    sendEvent(eventName, sourceUrl, params) {
        const eventRequest = (new bizSdk.EventRequest(this.accessToken, this.pixelId))
            .setEvents([__classPrivateFieldGet(this, _FacebookConversionAPI_instances, "m", _FacebookConversionAPI_getEventData).call(this, eventName, sourceUrl, params)]);
        this.contents = [];
        eventRequest.execute().then((response) => response, (error) => error);
    }
}
_FacebookConversionAPI_instances = new WeakSet(), _FacebookConversionAPI_getEventData = function _FacebookConversionAPI_getEventData(eventName, sourceUrl, params) {
    const currentTimestamp = Math.floor(new Date() / 1000);
    return (new bizSdk.ServerEvent())
        .setEventName(eventName)
        .setEventTime(currentTimestamp)
        .setUserData(this.userData)
        .setCustomData((new bizSdk.CustomData())
        .setContents(this.contents)
        .setCurrency(params === null || params === void 0 ? void 0 : params.currency)
        .setValue(params === null || params === void 0 ? void 0 : params.value))
        .setEventSourceUrl(sourceUrl)
        .setActionSource('website');
};
module.exports = FacebookConversionAPI;
