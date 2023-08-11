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
var _CLI_input, _CLI_output, _CLI_quit;
Object.defineProperty(exports, "__esModule", { value: true });
const input_js_1 = __importDefault(require("../utils/input.js"));
const output_js_1 = __importDefault(require("../utils/output.js"));
const validation_js_1 = __importDefault(require("../utils/validation.js"));
const ConversionWrapper_js_1 = __importDefault(require("../model/ConversionWrapper.js"));
const formatting_js_1 = require("../utils/formatting.js");
class CLI {
    constructor() {
        _CLI_input.set(this, void 0);
        _CLI_output.set(this, void 0);
        _CLI_quit.set(this, void 0);
        this.readConversionPrompts = () => {
            const originCountry = __classPrivateFieldGet(this, _CLI_input, "f").readString(`Moeda de origem: `, `Código de país inválido`, {
                capitalize: true,
                regExp: /^\w{3}$|^$/gim,
            });
            if (originCountry === "") {
                __classPrivateFieldSet(this, _CLI_quit, true, "f");
                return;
            }
            const targetCountry = __classPrivateFieldGet(this, _CLI_input, "f").readString(`Moeda de destino: `, `Código de país inválido`, {
                capitalize: true,
                regExp: "/^(?!" + originCountry + ").{3}$/gim",
                isValid: validation_js_1.default.validateCoutryCode,
            });
            const value = __classPrivateFieldGet(this, _CLI_input, "f").readFloat(`Valor: `, `Valor inválido`, {
                isValid: validation_js_1.default.validateValue,
            });
            return new ConversionWrapper_js_1.default(originCountry, targetCountry, value);
        };
        this.printResults = (promise) => {
            promise.then((result) => {
                __classPrivateFieldGet(this, _CLI_output, "f").writeLine(result.query.from + " " +
                    (0, formatting_js_1.formatValue)(result.query.amount) +
                    " => " + result.query.to +
                    (0, formatting_js_1.formatValue)(result.result));
                __classPrivateFieldGet(this, _CLI_output, "f").writeLine("Taxa: " + (0, formatting_js_1.formatConversionRate)(result.info.rate));
            });
        };
        __classPrivateFieldSet(this, _CLI_input, new input_js_1.default(), "f");
        __classPrivateFieldSet(this, _CLI_output, new output_js_1.default(), "f");
        __classPrivateFieldSet(this, _CLI_quit, false, "f");
    }
    hasQuit() {
        return __classPrivateFieldGet(this, _CLI_quit, "f");
    }
}
_CLI_input = new WeakMap(), _CLI_output = new WeakMap(), _CLI_quit = new WeakMap();
exports.default = CLI;
