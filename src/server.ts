import express from "express";
import { ErrorHandler } from "./middleware/errorHandler";
import { routes } from "./routes";

const app = express();

app.use(express.json())
app.use(routes);
app.use(ErrorHandler);

app.listen(3000, () => console.log("Server is running"));