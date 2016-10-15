import { useState, useContext } from "react";
import coinImg from "../assets/images/coin.png";
import clockImg from "../assets/images/clock.png";
import { SocketContext } from "../hooks/SocketProvider";
import { convertSecondsToMinAndSec } from "../utils/consts";

export default function Status() {
  const { btcPrice, timer } = useContext(SocketContext);
  return (
    <div className="w-full flex justify-between px-5">
      <div className="flex items-center">
        <img src={coinImg} alt="logo" className="w-10 sm:w-20 z-10" />
        <div className=" bg-white p-2 px-8 flex gap-4 rounded-2xl -ml-6 z-0">
          <span className="text-blue-600 font-bold">MATICUSD</span>
          <span>${btcPrice}</span>
        </div>
      </div>

      <div className="flex items-center">
        <div className=" bg-white p-2 px-4 rounded-2xl flex gap-4">
          <span className="text-blue-600 font-bold">
            {convertSecondsToMinAndSec(timer)}
          </span>
          <span>5m</span>
        </div>
        <img src={clockImg} alt="logo" className="w-10 sm:w-20 -ml-3" />
      </div>
    </div>
  );
}
