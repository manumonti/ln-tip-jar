import cors from "cors";
import express, { Request, Response } from "express";
import * as routes from "./routes";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const port = 4000;

/**
 * ExpressJS will hang if an async route handler doesn't catch errors and return a response.
 * To avoid wrapping every handler in try/catch, just call this func on the handler. It will
 * catch any async errors and return
 */
export const catchAsyncErrors = (routeHandler: (req: Request, res: Response) => Promise<void> | void) => {
    // return a function that wraps the route handler in a try/catch block and
    // sends a response on error
    return async (req: Request, res: Response) => {
        try {
            const promise = routeHandler(req, res);
            // only await promises from async handlers.
            if (promise) await promise;
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ error: err.message });
            } else {
                res.status(400).send({ error: "Unknown error" });
            }
        }
    };
};

app.get("/api/getInfo", catchAsyncErrors(routes.getInfo));

app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`);
});
