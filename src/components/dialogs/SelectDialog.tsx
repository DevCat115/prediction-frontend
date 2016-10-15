import { ChangeEvent, useEffect, useState } from "react";
import CustomDialog from "./CustomDialog";

interface IProps {
  visible: boolean;
  setVisible: Function;
  sourceToken: IToken;
  targetToken: IToken;
  setSource: Function;
  setTarget: Function;
  catagory: string;
}

export default function SelectDialog({
  visible,
  setVisible,
  sourceToken,
  targetToken,
  setSource,
  setTarget,
  catagory,
}: IProps) {
  return (
    <CustomDialog
      title="Select Token"
      visible={visible}
      setVisible={setVisible}
    ></CustomDialog>
  );
}
