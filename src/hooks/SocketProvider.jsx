import { createContext, useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { STATUS } from "../utils/consts";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // Socket data from backend.
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState(STATUS.POOL_OPEN);
  const [btcPrice, setBtcPrice] = useState();
  const [btcList, setBtcList] = useState([]);
  const [poolList, setPoolList] = useState([]);
  const [livePool, setLivePool] = useState({});
  const [nextPool, setNextPool] = useState({});
  // const [poolId, setPoolId] = useState("");
  // const [startPrice, setStartPrice] = useState("");
  // const [endPrice, setEndPrice] = useState("");

  //   ------------------------------------------------

  const [betDirection, setBetDirection] = useState(1);

  useEffect(() => {
    socket.on("CURRENT_TIME", function (data) {
      setStatus(data?.STATE);
      setBtcPrice(data.btcPrice);
      setTimer(data?.secondsRemaining || 0);
      setPoolList(data?.poolList);
      setLivePool(data?.livePool);
      setNextPool(data?.nextPool);

      if (data.STATE === STATUS.POOL_OPEN) {
        setBtcList((prevBtcList) => [...prevBtcList, data.btcPrice]);
      } else {
        setBtcList([]);
      }
    });
  }, [socket]);

  const store = {
    status: status,
    btcPrice: btcPrice,
    btcList: btcList,
    timer: timer,
    livePool: livePool,
    nextPool: nextPool,
    poolList: poolList,
    betDirection: betDirection,
    setDirection: setBetDirection,
  };

  return (
    <SocketContext.Provider value={store}>{children}</SocketContext.Provider>
  );
};
