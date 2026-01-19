import createLnRpc from "@radar/lnrpc";
import { Request, Response } from "express";

export const getInfo = async (req: Request, res: Response) => {
    try {
        const rpcClient = await createLnRpc({
            server: req.query.server as string,
            cert: Buffer.from(req.query.cert as string, "hex").toString("utf-8"),
            macaroon: req.query.macaroon as string,
        });
        const { alias } = await rpcClient.getInfo();
        const { totalBalance } = await rpcClient.walletBalance();
        res.send({ alias, balance: totalBalance });
    } catch (err) {
        console.log("Error:", err);
        throw err;
    }
};
