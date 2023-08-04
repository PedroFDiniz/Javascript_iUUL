"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_controller_1 = __importDefault(require("./src/controller/cli-controller"));
const cli_presenter_1 = __importDefault(require("./src/presenter/cli-presenter"));
(function () {
    const controller = new cli_controller_1.default;
    const presenter = new cli_presenter_1.default(controller);
    presenter.run();
})();
