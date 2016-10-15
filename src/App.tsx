import React from "react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";
import { Web3Modal } from "@web3modal/react";
import { polygon } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import Routes from "./Routes";
import { SocketProvider } from "./hooks/SocketProvider";

const projectId = process.env.REACT_APP_CONNECT_PROJECT_ID || "";
const chains = [polygon];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <WagmiConfig config={wagmiConfig}>
          <SocketProvider>
            <Routes />
          </SocketProvider>
          <ToastContainer
            className="!z-[99999]"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
          />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
