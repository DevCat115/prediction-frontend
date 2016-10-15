import { useContext } from "react";
import { Icon } from "@iconify/react";
import { Progress } from "@material-tailwind/react";

import { Card, CardBody, Typography } from "@material-tailwind/react";
import UpShape from "./UpShape";
import DownShape from "./DownShape";
import FilledButton from "./buttons/FilledButton";
import useReadContract from "../hooks/useReadContract";
import { SocketContext } from "../hooks/SocketProvider";
import { STATUS, convertSecondsToMinAndSec } from "../utils/consts";

export default function PredictCard({
  status,
  poolId,
  startPrice,
  poolIndex,
  endPrice,
  handlFlip,
}: ICardProps) {
  const { upPayout, downPayout, poolBalance, isDoubleBet } = useReadContract({
    poolId,
  });
  const { timer } = useContext(SocketContext);
  const { setDirection } = useContext(SocketContext);
  return (
    <Card className="mt-6 w-96 min-h-[400px] bg-[#182b48]">
      <CardBody>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <Icon icon="zondicons:play-outline" />
            <Typography variant="h6">{status}</Typography>
          </div>
          <Typography variant="h6">#{poolIndex}</Typography>
        </div>
        {status === "LIVE" ? (
          <Progress
          color="blue"
            value={
              (status === STATUS.POOL_CLOSE
                ? 100
                : (STATUS.OPEN_TIME - timer) * 100) / STATUS.OPEN_TIME
            }
            className="mt-2"
          />
        ) : (
          <></>
        )}
        <div className="flex flex-col mt-4 relative">
          <div className="flex justify-center">
            {(status === "Expired" || status === "LIVE") && (
              <UpShape startPrice={startPrice} endPrice={endPrice} />
            )}
            {(status === "Next" || status === "Later") && (
              <UpShape startPrice={"1"} endPrice={"0"} />
            )}
          </div>
          <div className="flex justify-center absolute top-0 w-full h-full items-center flex-col">
            <Typography variant="h5" color="black">
              UP
            </Typography>
            <Typography variant="h6" color="black">
              {upPayout} payout
            </Typography>
          </div>
        </div>
        {/* box history*/}

        <div
          className={`${
            status === "Next" || status === "Later" ? "hidden" : "flex"
          } flex-col gap-1 p-4 border-2 border-up rounded-2xl`}
        >
          {status === "Expired" && (
            <Typography variant="h6">CLOSED PRICE</Typography>
          )}

          {status === "LIVE" && (
            <Typography variant="h6">LAST PRICE</Typography>
          )}

          <div className="flex items-center justify-between">
            <Typography
              variant="h5"
              className={`${
                parseFloat(endPrice!) >= parseFloat(startPrice)
                  ? "text-up"
                  : "text-down"
              }`}
            >
              ${endPrice}
            </Typography>

            <div
              className={`${
                parseFloat(endPrice!) >= parseFloat(startPrice)
                  ? "bg-up"
                  : "bg-down"
              } flex items-center p-1 px-2 gap-1 rounded-lg text-white`}
            >
              {/* <div className="flex items-center bg-up p-1 gap-1 rounded-lg text-white"> */}
              <Icon icon="bxs:up-arrow" />
              <Typography variant="h6">
                ${(parseFloat(endPrice!) - parseFloat(startPrice)).toFixed(4)}
              </Typography>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Typography variant="h6">Locked Price</Typography>
            <Typography variant="h6">${startPrice}</Typography>
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="h6" className="font-bold">
              Prize Pool
            </Typography>
            <Typography variant="h6" className="font-bold">
              {poolBalance} KMBT
            </Typography>
          </div>
        </div>
        {/*NEXT box Try*/}
        <div
          className={`${
            status !== "Next" ? "hidden" : "flex"
          } flex-col gap-1 p-4 border-2 border-up rounded-2xl`}
        >
          <div className="flex items-center justify-between">
            <Typography variant="h6" className="font-bold">
              Prize Pool
            </Typography>
            <Typography variant="h6" className="font-bold">
              {poolBalance} KMBT
            </Typography>
          </div>
          <FilledButton
            className="bg-up text-white text-lg"
            onClick={() => {
              handlFlip();
              setDirection(1);
            }}
            disabled={isDoubleBet}
          >
            Enter Up
          </FilledButton>
          <FilledButton
            className=" bg-down text-white text-lg"
            onClick={() => {
              handlFlip();
              setDirection(2);
            }}
            disabled={isDoubleBet}
          >
            Enter Down
          </FilledButton>
        </div>

        {/* Later history*/}

        <div
          className={`${
            status === "Later" ? "flex" : "hidden"
          } flex-col gap-1 p-4 border-2 border-up rounded-2xl min-h-[160px] items-center justify-center`}
        >
          <div className="flex items-center justify-center">
            <Typography variant="h5">Entry starts</Typography>
          </div>
          <div className="flex items-center justify-center">
            {startPrice === "Later2" ? (
              <Typography variant="h5" className="font-bold">
                ~{convertSecondsToMinAndSec(STATUS.OPEN_TIME + timer)}
              </Typography>
            ) : (
              <Typography variant="h5" className="font-bold">
                ~{convertSecondsToMinAndSec(timer)}
              </Typography>
            )}
          </div>
        </div>

        <div className="flex flex-col relative">
          <div className="flex justify-center">
            {(status === "Expired" || status === "LIVE") && (
              <DownShape startPrice={startPrice} endPrice={endPrice} />
            )}
            {(status === "Next" || status === "Later") && (
              <DownShape startPrice={"0"} endPrice={"1"} />
            )}
          </div>
          <div className="flex justify-center absolute top-0 w-full h-full items-center flex-col">
            <Typography variant="h6" color="black">
              {downPayout} payout
            </Typography>
            <Typography variant="h5" color="black">
              Down
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
