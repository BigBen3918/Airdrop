import React from "react";
import Routes from "./router/index";
import { UseWalletProvider } from "use-wallet";

import "./App.scss";

function App() {
    return (
        <UseWalletProvider
            chainId={4002}
            connectors={{
                // This is how connectors get configured
                portis: { dAppId: "airdrop" },
            }}
        >
            <Routes />
        </UseWalletProvider>
    );
}

export default App;
