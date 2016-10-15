import { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import { Icon } from "@iconify/react";
import { useAccount, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { zeroAddress } from "viem";
import { toast } from "react-toastify";
import { useEthersSigner } from "../hooks/useEthersSigner";
import Status from "../components/Staus";
import SwiperContainer from "../components/SwiperCntainer";
import Graph from "../components/Graph";
import SmallGap from "../components/SmallGap";

export default function Blank() {
  const signer = useEthersSigner();
  return (
    <div>
      <SmallGap></SmallGap>
      <Status></Status>
      <SwiperContainer></SwiperContainer>
      <Graph />
    </div>
  );
}
