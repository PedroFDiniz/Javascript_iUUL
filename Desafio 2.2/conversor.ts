import CLIController from "./src/controller/cli-controller"
import CLIPresenter from "./src/presenter/cli-presenter";

(function ()  {
    const controller = new CLIController;
    const presenter = new CLIPresenter(controller);
    presenter.run();
})()