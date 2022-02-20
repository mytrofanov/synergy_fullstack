import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors'
import errorMiddleware from "./middleware/error.middleware";
class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling()
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }
    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', cors(), controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    public cors() {
        this.app.use(cors());
        };
}

export default App;
