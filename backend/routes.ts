import createLnRpc, { PaymentStatus, createRouterRpc } from "@radar/lnrpc";
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

export const createInvoice = async (req: Request, res: Response) => {
    const { server, cert, macaroon, amount } = req.body;
    try {
        const rpcClient = await createLnRpc({
            server: server,
            cert: Buffer.from(cert, "hex").toString("utf-8"),
            macaroon: macaroon,
        });
        const { rHash, paymentRequest } = await rpcClient.addInvoice({
            value: amount,
        });
        res.send({ rHash, paymentRequest });
    } catch (err) {
        console.log("Error:", err);
        throw err;
    }
};

export const sendTip = async (req: Request, res: Response) => {
    const { server, cert, macaroon, paymentRequest, rHash } = req.body;
    try {
        const routerRpcClient = await createRouterRpc({
            server: server,
            cert: Buffer.from(cert, "hex").toString("utf-8"),
            macaroon: macaroon,
        });

        const sendPaymentRequest = { paymenthash: rHash, paymentRequest: paymentRequest };

        const call = routerRpcClient.sendPaymentV2(sendPaymentRequest);
        call.on("data", function (response) {
            if (response.status === PaymentStatus.SUCCEEDED || response.status === PaymentStatus.FAILED) {
                if (!res.headersSent) {
                    res.send(response);
                }
            }
        });
        call.on("status", function (status) {
            console.log("STATUS: ", status);
        });
    } catch (err) {
        console.log("Error:", err);
        throw err;
    }
};
