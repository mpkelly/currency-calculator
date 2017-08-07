import * as React from "react";
import { Flex, Text, JustifiedRow, Ripple, Div } from "react-style-helpers";
import { FlipCurrencies, Refresh, Clear } from "../style/IconNames";
import { TextButton } from "./TextButton";

export interface ToolbarProps {
  onClear: Function;
  onFlip: Function;
  onRefresh: Function;
}

export const Toolbar = (props: ToolbarProps) => {
  return (
    <Div fillWidth pl_medium pr_medium pt_small pb_small brand>
      <Ripple />
      <JustifiedRow justifySpaceBetween fillWidth>
        <TextButton stretch uppercase white large className={`${Clear}`}  onClick={()=>props.onClear()} />
        <TextButton stretch uppercase white large className={`${FlipCurrencies}`} onClick={()=>props.onFlip()}/>
        <TextButton stretch uppercase white large className={`${Refresh}`} onClick={()=>props.onRefresh()}/>
      </JustifiedRow>
    </Div>
  )
}