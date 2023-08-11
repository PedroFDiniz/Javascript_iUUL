import CLIController from "./controller/cli-controller";
import CLIPresenter from "./presenter/cli-presenter";
(function () {
    const controller = new CLIController;
    const presenter = new CLIPresenter(controller);
    presenter.run();
})();
