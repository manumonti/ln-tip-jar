import createLnRpc from "@radar/lnrpc";
import { Request, Response } from "express";

export const getInfo = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        const rpcClient = await createLnRpc({
            server: req.query.server as string,
            cert: Buffer.from(req.query.cert as string, "hex").toString("utf-8"),
            macaroon: req.query.macaroon as string,
        });
        const { alias, identityPubkey } = await rpcClient.getInfo();
        const { balance } = await rpcClient.channelBalance();
        res.send({ alias, identityPubkey, balance });
    } catch (err) {
        console.log("Error:", err);
        throw err;
    }
};
