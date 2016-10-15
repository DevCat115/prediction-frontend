export const toShortStr = (address: string) => {
  let shortHex = address.substring(0, 6) + "..." + address.substring(38);
  return shortHex;
};
export const convertSecondsToMinAndSec = (seconds: number) => {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const STATUS = {
  POOL_OPEN: "POOL_OPEN",
  POOL_CLOSE: "POOL_CLOSE",
  OPEN_TIME:300
};
