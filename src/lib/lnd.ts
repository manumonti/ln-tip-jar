export const fetchNodeInfo = async (setNodeInfo: (nodeInfo: { alias: string; balance: string; identityPubkey: string }) => void) => {
    if (!process.env.NEXT_PUBLIC_LND_GRPC_HOST || !process.env.NEXT_PUBLIC_LND_CERT || !process.env.NEXT_PUBLIC_LND_MACAROON) {
        throw new Error("Missing LND environment variables");
    }
    const params = new URLSearchParams({
        server: process.env.NEXT_PUBLIC_LND_GRPC_HOST,
        cert: process.env.NEXT_PUBLIC_LND_CERT,
        macaroon: process.env.NEXT_PUBLIC_LND_MACAROON,
    });
    try {
        const response = await fetch(`http://localhost:4000/api/getInfo?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        setNodeInfo(json);
    } catch (error) {
        console.error("Error fetching node info:", error);
    }
};
