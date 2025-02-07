"use client";

import { PropsWithChildren } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
