import express from "express";
import { requestLogger, errorHandler } from "./middlewares";
import { router as CarsRouter } from "../modules/cars/router";
import { router as ManufacturersRouter } from "../modules/manufacturers/router";
import { router as DealersRouter } from "../modules/dealers/router";

const startServer = () => {
    const app = express();

    app.use(express.json());
    app.use(requestLogger);

    app.use("/cars", CarsRouter);
    app.use("/manufacturers", ManufacturersRouter);
    app.use("/dealers", DealersRouter);

    app.use(errorHandler);

    app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT}`);
    });
};

export { startServer };