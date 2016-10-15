import { ReactNode } from "react";

/* --------------------------------------------------------------------------- */

interface IProps extends IPropsOfComponent {
  classNameOfInput?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  error?: boolean;
}

/* --------------------------------------------------------------------------- */

export default function MainInput({
  className = "",
  classNameOfInput = "",
  startAdornment,
  endAdornment,
  error,
  ...others
}: IProps) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded bg-gray-300 border border-transparent ${className} ${
        error ? "!border-red-500" : ""
      }`}
    >
      {startAdornment ? <div>{startAdornment}</div> : <></>}
      <input
        className={`flex-1 focus:outline-none w-full bg-gray-300 text-gray-900 placeholder:text-gray-700 ${classNameOfInput}`}
        {...others}
      />
      {endAdornment ? <div>{endAdornment}</div> : <></>}
    </div>
  );
}
