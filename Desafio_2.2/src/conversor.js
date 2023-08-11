import CLIController from "./controller/cli-controller.js";
import CLIPresenter from "./presenter/cli-presenter.js";
(function () {
    const controller = new CLIController;
    const presenter = new CLIPresenter(controller);
    presenter.run();
})();
