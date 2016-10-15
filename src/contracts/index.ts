import { ethers } from "ethers";
import Contrats from "./contract.json";
import { erc20ABI } from "wagmi";

const rpc = "https://bsc-dataseed.binance.org/";

const provider = new ethers.providers.JsonRpcProvider(rpc);
const zeroAddress = ethers.constants.AddressZero;
const usdtAddress = Contrats.usdt;
const ERC20ABI = erc20ABI;

const swapContract = new ethers.Contract(
  Contrats.contract.address,
  Contrats.contract.abi,
  provider
);
const usdtContract = new ethers.Contract(Contrats.usdt, erc20ABI, provider);

export {
  zeroAddress,
  provider,
  swapContract,
  usdtAddress,
  usdtContract,
  ERC20ABI,
};
