import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "rc-slider/assets/index.css";
import { useAccount, useDisconnect, useSwitchNetwork, useNetwork } from "wagmi";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useWeb3Modal } from "@web3modal/react";
import FilledButton from "./buttons/FilledButton";
import MainInput from "./form/MainInput";
import useToken from "../hooks/useToken";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { SocketContext } from "../hooks/SocketProvider";
const chainId = process.env.REACT_APP_CHAIN_ID;

export default function PostionCard({
  betDirection,
  handlFlip,
}: IPositionProps) {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const [betAmount, setBetAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { tokenAllowance, tokenBalance, tokenApprove, payToken } = useToken({
    address,
  });
  const { nextPool } = useContext(SocketContext);
  const handleBetChange = (event: any) => {
    const value = event.target.value;
    setBetAmount(value);
  };

  const handleBet = async () => {
    try {
      if (!betAmount) return;
      setIsLoading(true);
      await tokenApprove(betAmount.toString());
      try {
        await payToken(betAmount.toString(), nextPool.poolId, betDirection);
        handlFlip();
        setIsLoading(false);
        toast.success("Bet successfuly.");
      } catch (error) {
        setIsLoading(false);
        console.log("Failed on Betting");
        toast.error("Bet failed.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Token approve failed.");
    }
  };

  return (
    <Card className="mt-6 w-96 min-h-[400px] bg-[#2b241f]">
      <CardBody className="p-0 flex items-center">
        <div>
          <div className="flex justify-between bg-[#2b241f] p-4 rounded-t-2xl">
            <div className="flex gap-3 items-center">
              <Icon
                icon="tdesign:arrow-left"
                className="text-xl cursor-pointer"
                onClick={handlFlip}
              />
              <Typography variant="h4">Set Position</Typography>
            </div>
            {betDirection === 1 && (
              <div className="flex items-center bg-up p-1 px-2 gap-1 rounded-lg text-white">
                <Icon icon="bxs:up-arrow" />
                <Typography variant="h6">Up</Typography>
              </div>
            )}

            {betDirection === 2 && (
              <div className="flex items-center bg-down p-1 px-2 gap-1 rounded-lg text-white">
                <Icon icon="bxs:down-arrow" />
                <Typography variant="h6">Down</Typography>
              </div>
            )}
          </div>
          <div className="flex flex-col p-4 gap-6">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="pt-5">
                Balance:
              </Typography>
              <Typography variant="h6" className="pt-5">
                {/* {parseUnits(tokenBalance, 18)} */}
                {formatEther(parseUnits(tokenBalance, 1))} KMBT
              </Typography>
            </div>
            <div className="flex">
              <MainInput
                className="w-full text-[25px] resize-non"
                placeholder="0.0"
                type="number"
                step={0.001}
                value={betAmount}
                readOnly={!isConnected ? "readOnly" : ""}
                onChange={handleBetChange}
              />
            </div>
            {/* <div className="px-2 pb-8">
              <Slider
                marks={{
                  0: "0%",
                  25: "25%",
                  50: "50%",
                  75: "75%",
                  100: "100%",
                }}
                // value={value}
                className="bg-white"
                railStyle={{ backgroundColor: "#bdbdbd" }}
                trackStyle={{ backgroundColor: "#1fc7d4" }}
                onChange={handleSlider}
              />
            </div> */}
            <div className="flex items-center gap-8 justify-center">
              {isConnected ? (
                chain?.id === Number(chainId) ? (
                  <>
                    {!isLoading ? (
                      <FilledButton
                        className="bg-blue-500 text-white text-xl min-w-[200px]"
                        onClick={() => handleBet()}
                      >
                        Confirm
                      </FilledButton>
                    ) : (
                      <FilledButton
                        className="bg-blue-500 text-white text-xl min-w-[200px]"
                        disabled
                      >
                        Loading
                      </FilledButton>
                    )}
                  </>
                ) : (
                  <FilledButton
                    className="bg-blue-500 text-white text-lg"
                    onClick={() => switchNetwork?.(Number(chainId))}
                  >
                    Switch network
                  </FilledButton>
                )
              ) : (
                <FilledButton
                  className="bg-blue-500 text-white text-lg"
                  onClick={() => open()}
                >
                  Connect Wallet
                </FilledButton>
              )}
            </div>
            <Typography className="text-[14px]">
              You won’t be able to remove or change your position once you enter
              it.
            </Typography>
          </div>
        </div>

        {/* box history*/}
      </CardBody>
    </Card>
  );
}
