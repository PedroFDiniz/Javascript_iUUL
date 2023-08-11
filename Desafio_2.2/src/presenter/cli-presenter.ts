import CLI from '../view/cli';
import CLIController from '../controller/cli-controller';
import ConversionWrapper from "../model/conversionwrapper";

class CLIPresenter {
    #controller:CLIController;
    #view:CLI;

    constructor(controller:CLIController) {
        this.#view = new CLI();
        this.#controller = controller;
    }

    run() {
        while(!this.#view.hasQuit()) {
            let request:ConversionWrapper = this.#view.readConversionPrompts()!;
            let response = this.#controller.executeRequest(request);
            this.#view.printResults(response);
        }
    }
}

export default CLIPresenter;