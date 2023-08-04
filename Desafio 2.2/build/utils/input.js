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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Input_prompt, _Input_output;
Object.defineProperty(exports, "__esModule", { value: true });
const output_js_1 = __importDefault(require("output.js"));
class Input {
    constructor() {
        _Input_prompt.set(this, void 0);
        _Input_output.set(this, void 0);
        __classPrivateFieldSet(this, _Input_prompt, PromptSync({ sigint: true }), "f");
        __classPrivateFieldSet(this, _Input_output, new output_js_1.default(), "f");
    }
    readString(label, errorMsg, options = {}) {
        const min = options.min || 0;
        const max = options.max || 10000;
        const capitalize = options.capitalize || false;
        const validChars = options.validChars || null;
        const regExp = options.regExp || null;
        const isValid = options.isValid || null;
        for (;;) {
            let data = __classPrivateFieldGet(this, _Input_prompt, "f").call(this, label);
            if (capitalize)
                data = data.toUpperCase();
            if (data.length < min || data.length > max) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else if (validChars &&
                [...data].some((c) => !validChars.includes(c))) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else if (regExp && !data.match(regExp)) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else if (isValid && !isValid(data)) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else {
                return data;
            }
        }
    }
    readInteger(label, errorMsg, options = {}) {
        const min = options.min || Number.MIN_SAFE_INTEGER;
        const max = options.max || Number.MAX_SAFE_INTEGER;
        const isValid = options.isValid || null;
        for (;;) {
            const data = __classPrivateFieldGet(this, _Input_prompt, "f").call(this, label);
            const m = data.match(/^([+-]{0,1})\d+$/);
            const num = Number.parseInt(data);
            if (!m || isNaN(num)) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else if (num < min || num > max) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else if (isValid && !isValid(num)) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else {
                return num;
            }
        }
    }
    readFloat(label, errorMsg, options = {}) {
        const min = options.min || -Number.MIN_VALUE;
        const max = options.max || Number.MAX_VALUE;
        const minDecimals = options.minDecimals || 0;
        const maxDecimals = options.maxDecimals || 20;
        const isValid = options.isValid || null;
        for (;;) {
            let decimalPlaces = 0;
            const data = __classPrivateFieldGet(this, _Input_prompt, "f").call(this, label);
            const m = data.match(/^[+-]{0,1}\d+(?:\.(\d*)){0,1}$/);
            const num = Number.parseFloat(data);
            if (m && m[1]) {
                decimalPlaces = m[1].length;
            }
            if (!m || isNaN(num)) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else if (num < min ||
                num > max ||
                decimalPlaces < minDecimals ||
                decimalPlaces > maxDecimals) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else if (isValid && !isValid(num)) {
                __classPrivateFieldGet(this, _Input_output, "f").writeLine(errorMsg);
            }
            else {
                return num;
            }
        }
    }
}
_Input_prompt = new WeakMap(), _Input_output = new WeakMap();
exports.default = Input;
