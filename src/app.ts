import express from "express";
import cors from 'cors';
import { ErrorHandler } from "./middleware/errorHandler";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from './swagger.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);
app.use(ErrorHandler);

export { app };