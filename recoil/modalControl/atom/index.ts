import { atom } from "recoil";

export const modalState = atom({
  key: "modal", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
