import { Dispatch, SetStateAction } from "react";

export type ButtonParamsType = {
  id: number;
  label?: string;
  callback: (text?: string, setText?: Dispatch<SetStateAction<string>>) => void;
};

export type ButtonControlType = {
  [key in "rightButtons" | "leftButtons"]?: ButtonParamsType[];
};
