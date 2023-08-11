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
var _CLIPresenter_controller, _CLIPresenter_view;
import CLI from '../view/cli';
class CLIPresenter {
    constructor(controller) {
        _CLIPresenter_controller.set(this, void 0);
        _CLIPresenter_view.set(this, void 0);
        __classPrivateFieldSet(this, _CLIPresenter_view, new CLI(), "f");
        __classPrivateFieldSet(this, _CLIPresenter_controller, controller, "f");
    }
    run() {
        for (;;) {
            let request = __classPrivateFieldGet(this, _CLIPresenter_view, "f").readConversionPrompts();
            if (__classPrivateFieldGet(this, _CLIPresenter_view, "f").hasQuit())
                break;
            let response = __classPrivateFieldGet(this, _CLIPresenter_controller, "f").executeRequest(request);
            __classPrivateFieldGet(this, _CLIPresenter_view, "f").printResults(response);
        }
    }
}
_CLIPresenter_controller = new WeakMap(), _CLIPresenter_view = new WeakMap();
export default CLIPresenter;
