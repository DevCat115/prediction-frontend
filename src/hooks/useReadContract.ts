import { useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import Contrats from "../contracts/contract.json";
import { formatEther, formatUnits, parseEther, parseUnits, zeroAddress } from "viem";

interface IReturnValueOfGetPool {
  data?: Array<bigint>;
  isSuccess?: boolean;
  [key: string]: any;
}

const useReadContract = ({ poolId = "0" }) => {
  const [upPayout, setUpPayout] = useState<string>("0");
  const [downPayout, setDownPayout] = useState<string>("0");
  const [poolBalance, setPoolBalance] = useState<string>("0");
  const { isConnected, address } = useAccount();

  const { data: poolInfo, isSuccess }: IReturnValueOfGetPool = useContractRead({
    address: Contrats.contract.address as `0x${string}`,
    abi: Contrats.contract.abi,
    functionName: "getPoolInfo",
    args: [poolId],
    watch: true,
  });

  const { data: isDoubleBet }: IReturnValueOfGetPool = useContractRead({
    address: Contrats.contract.address as `0x${string}`,
    account: address || zeroAddress,
    abi: Contrats.contract.abi,
    functionName: "checkDoubleBet",
    args: [poolId],
    watch: true,
  });



  useEffect(() => {
    console.log(poolId, poolInfo);
    if (isSuccess && poolInfo) {
      setUpPayout(formatUnits(poolInfo[1], 3));
      setDownPayout(formatUnits(poolInfo[2], 3));
      setPoolBalance(formatUnits(poolInfo[0], 18));
    }
  }, [poolInfo]);

  return {
    upPayout,
    downPayout,
    poolBalance,
    isDoubleBet
  };
};

export default useReadContract;
