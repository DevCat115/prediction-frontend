import { useContext, useState, useEffect } from "react";
import PredictCard from "./Card";
import PositionCard from "./Position";
import ReactCardFlip from "react-card-flip";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import "swiper/css";
import { SocketContext } from "../hooks/SocketProvider";
import { STATUS } from "../utils/consts";
import SpinnerLoading from "./SpinnerLoading";
import { toast } from "react-toastify";
export default function SwiperContainer() {
  const [flipped, setFlip] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const {
    status,
    btcPrice,
    timer,
    poolList,
    betDirection,
    livePool,
    nextPool,
  } = useContext(SocketContext);

  const flip = () => {
    const newStatus = flipped ? false : true;
    setFlip(newStatus);
  };

  useEffect(() => {
    if (timer === 0 && status === STATUS.POOL_CLOSE)
      toast.success("Round was finshed.Check your wallet for the reward.");
  }, [timer]);

  return (
    <>
      {status === STATUS.POOL_CLOSE && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-70 z-40 flex justify-center items-center">
          <SpinnerLoading text="Calculating" />
        </div>
      )}
      <Swiper
        initialSlide={6}
        slidesPerView={isMobile ? 1 : 4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {poolList.map((pool: IPoolSocketInfo) => (
          <SwiperSlide key={pool.poolIndex}>
            <PredictCard
              status="Expired"
              poolId={pool.poolId}
              poolIndex={pool.poolIndex}
              startPrice={pool.startPrice}
              endPrice={pool.endPrice}
            />
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <PredictCard
            status="LIVE"
            poolId={livePool.poolId}
            poolIndex={livePool.poolIndex}
            startPrice={livePool.startPrice}
            endPrice={btcPrice}
          />
        </SwiperSlide>

        <SwiperSlide>
          <ReactCardFlip
            isFlipped={flipped}
            flipSpeedBackToFront={0.5}
            flipSpeedFrontToBack={0.5}
          >
            <PredictCard
              status="Next"
              poolId={nextPool.poolId}
              poolIndex={nextPool.poolIndex}
              startPrice={nextPool.startPrice}
              endPrice={btcPrice}
              handlFlip={flip}
            />
            <PositionCard betDirection={betDirection} handlFlip={flip} />
          </ReactCardFlip>
        </SwiperSlide>

        <SwiperSlide>
          <PredictCard
            status="Later"
            poolId={livePool.poolId}
            poolIndex={livePool.poolIndex + 2}
            startPrice={livePool.startPrice}
            endPrice={btcPrice}
          />
        </SwiperSlide>

        {/* <SwiperSlide>
          <PredictCard
            status="Later"
            poolId={livePool.poolId}
            poolIndex={livePool.poolIndex + 3}
            startPrice={livePool.startPrice}
            endPrice={btcPrice}
          />
        </SwiperSlide> */}

        {/* <SwiperSlide>
          <ReactCardFlip
            isFlipped={flipped}
            flipSpeedBackToFront={0.5}
            flipSpeedFrontToBack={0.5}
          >
            <PredictCard />
            <PostionCard />
          </ReactCardFlip>
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
