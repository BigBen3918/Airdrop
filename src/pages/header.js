import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";

export default function Header() {
    const wallet = useWallet();
    var styledAddress = wallet.account
        ? wallet.account.slice(0, 4) + "..." + wallet.account.slice(-4)
        : "";

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        let { ethereum } = window;
        if (ethereum !== undefined) {
            const chainId = await ethereum.request({
                method: "eth_chainId",
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            if (accounts.length !== 0 && Number(chainId) === 4002) {
                onConnect();
            }
            ethereum.on("chainChanged", handleChainChanged);
        }
    };

    const handleChainChanged = (chainId) => {
        let { ethereum } = window;
        if (ethereum.isConnected() && Number(chainId) === 4002) {
            onConnect();
        }
    };

    const onConnect = () => {
        if (wallet.status !== "connected") {
            wallet.connect().catch((err) => {
                alert("please check metamask!");
            });
        }
    };

    const disconnect = () => {
        if (wallet.status === "connected") {
            wallet.reset();
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item md={9} lg={10}></Grid>
            <Grid item md={3} lg={2}>
                {wallet.status === "connected" ? (
                    <button
                        className="walletButton noselect"
                        onClick={disconnect}
                    >
                        {styledAddress}
                    </button>
                ) : (
                    <button
                        className="walletButton noselect"
                        onClick={() => onConnect()}
                    >
                        {wallet.status === "connecting" ? (
                            <>
                                <span
                                    className="spinner-border"
                                    role="status"
                                    style={{
                                        width: "1.5em",
                                        height: "1.5em",
                                        marginRight: 10,
                                    }}
                                ></span>
                                Connecting...
                            </>
                        ) : (
                            <>Connect Wallet</>
                        )}
                    </button>
                )}
            </Grid>
        </Grid>
    );
}
