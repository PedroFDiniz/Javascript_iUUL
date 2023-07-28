import { argv } from 'node:process';
import session from './session/session.js';
import { MainController } from './controller/main-controller.js';

(function () {
    session.setPath(argv[2]);
    let m = new MainController();
    m.processFile();
    m.outputErrors();
})();
