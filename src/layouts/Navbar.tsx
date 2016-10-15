import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect, useSwitchNetwork, useNetwork } from "wagmi";
import { Drawer, List, ListItem } from "@material-tailwind/react";
import Container from "../components/containers/Container";
import TextButton from "../components/buttons/TextButton";
import TextIconButton from "../components/buttons/TextIconButton";
import FilledButton from "../components/buttons/FilledButton";

import logoImg from "../assets/images/logo.png";

// -----------------------------------------------------------------------------------------

interface INavLink {
  id: number;
  label: string;
  iconName: string;
  to: string;
}

// -----------------------------------------------------------------------------------------

const NAV_LINKS: Array<INavLink> = [
  {
    id: 1,
    label: "Lending",
    iconName: "cryptocurrency:lend",
    to: "https://kombatlending.static.app/",
  },
  {
    id: 2,
    label: "Staking",
    iconName: "game-icons:heart-stake",
    to: "https://kmbtstaking.static.app/",
  },
  // {
  //   id: 3,
  //   label: "Telegram",
  //   iconName: "basil:telegram-solid",
  //   to: "https://t.me/kryptokombatcommunity",
  // },
  {
    id: 4,
    label: "Swap",
    iconName: "material-symbols-light:swap-horizontal-circle",
    to: "https://quickswap.exchange/#/swap?swapIndex=0&currency0=ETH&currency1=0xb1069ed13d28c585EBC14136cc974EBF0cB02799",
  },
  // {
  //   id: 3,
  //   label: "Telegram",
  //   iconName: "la:telegram",
  //   to: "/telegram",
  // }
];

const chainId = process.env.REACT_APP_CHAIN_ID;

// -----------------------------------------------------------------------------------------

export default function Navbar() {
  const { pathname } = useLocation();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const navigate = useNavigate();

  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  const closeDrawer = () => {
    setVisibleDrawer(false);
  };

  const navigateToPage = (to: string) => {
    navigate(to);
    closeDrawer();
  };

  return (
    <nav className="sticky top-0 bg-[#182b48] border-b border-gray-800 z-[99]">
      <Container className="justify-between p-1 hidden lg:flex">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logoImg} alt="logo" className="w-10 sm:w-20" />
          </Link>

          <div className="flex items-center gap-4">
            {NAV_LINKS.map((linkItem) => (
              <Link key={linkItem.id} to={linkItem.to} target="_blank">
                <TextButton
                  className={`flex items-center gap-2 ${
                    pathname === linkItem.to ? "text-gray-100" : "text-gray-500"
                  }`}
                >
                  <Icon icon={linkItem.iconName} className="text-lg" />
                  {linkItem.label}
                </TextButton>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          {isConnected ? (
            chain?.id === Number(chainId) ? (
              <FilledButton
                className="flex items-center gap-1"
                onClick={() => disconnect()}
              >
                <Icon icon="mdi:wallet-outline" className="text-xl" />
                Disconnect
              </FilledButton>
            ) : (
              <FilledButton
                className="flex items-center gap-1"
                onClick={() => switchNetwork?.(Number(chainId))}
              >
                <Icon icon="mdi:wallet-outline" className="text-xl" />
                Switch network
              </FilledButton>
            )
          ) : (
            <FilledButton
              className="flex items-center gap-1 bg-blue-500"
              onClick={() => open()}
            >
              <Icon icon="mdi:wallet-outline" className="text-xl" />
              Connect Wallet
            </FilledButton>
          )}
        </div>
      </Container>

      <Container className="justify-between items-center p-1 flex lg:hidden">
        <Link to="/">
          <img src={logoImg} alt="logo" className="w-[100px] sm:w-20" />
        </Link>

        <TextIconButton onClick={() => setVisibleDrawer(true)}>
          <Icon icon="ion:menu" className="text-xl" />
        </TextIconButton>
      </Container>
      <Drawer
        open={visibleDrawer}
        onClose={closeDrawer}
        className="p-4 bg-[#212121]"
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={logoImg} alt="logo" className="w-20" />
            </Link>

            <TextIconButton onClick={closeDrawer}>
              <Icon icon="akar-icons:cross" className="text-xl" />
            </TextIconButton>
          </div>

          <List>
            {NAV_LINKS.map((linkItem) => (
              <ListItem
                key={linkItem.id}
                onClick={() => navigateToPage(linkItem.to)}
                className={`gap-4 ${
                  pathname === linkItem.to ? "text-gray-100" : "text-gray-500"
                }`}
              >
                <Icon icon={linkItem.iconName} className="text-lg" />
                {linkItem.label}
              </ListItem>
            ))}
          </List>

          <List>
            {isConnected ? (
              chain?.id === Number(chainId) ? (
                <ListItem
                  className="gap-4 text-gray-100"
                  onClick={() => disconnect()}
                >
                  <Icon icon="mdi:wallet-outline" className="text-xl" />
                  Disconnect
                </ListItem>
              ) : (
                <ListItem
                  className="gap-4 text-gray-100"
                  onClick={() => switchNetwork?.(Number(chainId))}
                >
                  <Icon icon="mdi:wallet-outline" className="text-xl" />
                  Switch network
                </ListItem>
              )
            ) : (
              <ListItem className="gap-4 text-gray-100" onClick={() => open()}>
                <Icon icon="mdi:wallet-outline" className="text-xl" />
                Connect Wallet
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </nav>
  );
}
