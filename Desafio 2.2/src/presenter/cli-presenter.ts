import CLI from '../view/cli';
import CLIController from '../controller/cli-controller';
import ConversionWrapper from '../model/ConversionWrapper';

class CLIPresenter {
    #controller:CLIController;
    #view:CLI;

    constructor(controller:CLIController) {
        this.#view = new CLI();
        this.#controller = controller;
    }

    run() {
        for (;;) {
            let request:ConversionWrapper = this.#view.readConversionPrompts()!;
            if (this.#view.hasQuit()) break;
            let response = this.#controller.executeRequest(request);
            this.#view.printResults(response);
        }
    }
}