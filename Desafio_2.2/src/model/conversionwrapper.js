"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ConversionWrapper_from, _ConversionWrapper_to, _ConversionWrapper_value;
//Object.defineProperty(exports, "__esModule", { value: true });
var ConversionWrapper = /** @class */ (function () {
    function ConversionWrapper(from, to, value) {
        _ConversionWrapper_from.set(this, void 0);
        _ConversionWrapper_to.set(this, void 0);
        _ConversionWrapper_value.set(this, void 0);
        __classPrivateFieldSet(this, _ConversionWrapper_from, from, "f");
        __classPrivateFieldSet(this, _ConversionWrapper_to, to, "f");
        __classPrivateFieldSet(this, _ConversionWrapper_value, value, "f");
    }
    Object.defineProperty(ConversionWrapper.prototype, "from", {
        get: function () {
            return __classPrivateFieldGet(this, _ConversionWrapper_from, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionWrapper.prototype, "to", {
        get: function () {
            return __classPrivateFieldGet(this, _ConversionWrapper_to, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionWrapper.prototype, "value", {
        get: function () {
            return __classPrivateFieldGet(this, _ConversionWrapper_value, "f");
        },
        enumerable: false,
        configurable: true
    });
    return ConversionWrapper;
}());
_ConversionWrapper_from = new WeakMap(), _ConversionWrapper_to = new WeakMap(), _ConversionWrapper_value = new WeakMap();
export default ConversionWrapper
