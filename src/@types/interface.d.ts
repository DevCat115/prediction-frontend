interface IPropsOfComponent {
  className?: string;
  children?: ReactNode | string;
  [key: string]: any;
}

interface IOption {
  id: number;
  label: string;
  value: string;
}
interface IToken {
  id: string;
  name: string;
  image: string;
  address?: string;
  decimal?: number;
}

interface ICardProps {
  status: string;
  poolId: string;
  startPrice: string;
  endPrice?: string;
  poolIndex: number;
  handlFlip?: function;
}

interface IPositionProps {
  betDirection: number;
  handlFlip?: function;
}

interface IPoolSocketInfo {
  startPrice: string;
  endPrice: string;
  poolId: string;
  poolIndex: number;
}

interface IShapeProps {
  startPrice?: string;
  endPrice?: string;
}
