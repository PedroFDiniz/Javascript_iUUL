"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetcher_1 = __importDefault(require("../model/fetcher"));
class CLIController {
    executeRequest(request) {
        return (0, fetcher_1.default)(request.from, request.to, request.value);
    }
}
exports.default = CLIController;
