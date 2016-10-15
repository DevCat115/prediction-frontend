import { erc20ABI, useContractRead } from "wagmi";
import Contrats from "../contracts/contract.json";
import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import {
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import { useEthersSigner } from "./useEthersSigner";

interface IReturnValueOfToken {
  data?: bigint;
  isSuccess?: boolean;
  [key: string]: any;
}

interface IUseTokenProps {
  address?: `0x${string}`;
}

const useToken = ({ address }: IUseTokenProps) => {
  const [tokenAllowance, setTokenAllowance] = useState<string>("0");
  const [tokenBalance, setTokenBalance] = useState<string>("0");

  const signer = useEthersSigner();
  const abi = erc20ABI;
  const { data: allowance, isSuccess: allowanceSuccess }: IReturnValueOfToken =
    useContractRead({
      address: Contrats.usdt as `0x${string}`,
      abi: abi,
      functionName: "allowance",
      watch: true,
      args: [
        address ? (address as `0x${string}`) : zeroAddress,
        Contrats.contract.address as `0x${string}`,
      ],
    });

  const { data: ercBalance, isSuccess: balanceSuccess }: IReturnValueOfToken =
    useContractRead({
      address: Contrats.usdt as `0x${string}`,
      abi: abi,
      functionName: "balanceOf",
      watch: true,
      args: [address ? (address as `0x${string}`) : zeroAddress],
    });

  useEffect(() => {
    if (ercBalance) {
      setTokenBalance(formatUnits(ercBalance, 1));
    }
  }, [ercBalance, allowance]);
  useEffect(() => {
    if (allowance) {
      setTokenAllowance(formatUnits(allowance, 1));
    }
  }, [ercBalance, allowance]);

  const tokenApprove = async (amount: string) => {
    if (signer) {
      if ((allowance && parseEther(amount) > allowance) || !allowance) {
        let provider = signer?.provider;
        const contract = new ethers.Contract(Contrats.usdt, erc20ABI, provider);
        let signedTokenContract = contract.connect(signer);
        let tx = await signedTokenContract.approve(
          Contrats.contract.address,
          parseEther(amount)
        );
        await tx.wait();
      }
    }
  };

  const payToken = async (
    amount: string,
    poolId: string,
    direction: number
  ) => {
    if (signer) {
      let provider = signer?.provider;
      const contract = new ethers.Contract(
        Contrats.contract.address,
        Contrats.contract.abi,
        provider
      );
      let signedBettingContract = contract.connect(signer);
      let tx = await signedBettingContract.makeTokenBet(
        poolId,
        direction,
        Contrats.usdt,
        parseEther(amount),
        {
          value: parseUnits("1", 15),
        }
      );
      await tx.wait();
    }
  };

  return {
    tokenAllowance,
    tokenBalance,
    tokenApprove,
    payToken,
  };
};

export default useToken;
