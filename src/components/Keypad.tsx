import * as React from "react";
import { Flex, Text, Div, JustifiedRow, Ripple } from "react-style-helpers";
import { TextButton } from "./TextButton";

export interface KeypadProps {
  symbols: string[];
  onSymbolClicked: (symbol: string)=>void;
}

const chunk = (array: any[], size = 4) => {
  let chunks:any = [], i = 0, n = array.length;
  while (i < n) {
    chunks.push(array.slice(i, i += size));
  }
  return chunks;
}

const createRows = (props: KeypadProps, rowSize = 3): JSX.Element[] => {
  const columns: JSX.Element[] = [];
  let g = 0;
  const chunks = chunk(props.symbols, rowSize);
  for (let group of chunks) {

    columns.push(
      <JustifiedRow justifySpaceBetween  key={g++}>
        {group.map((symbol, index) => {
          return <TextButton uppercase
                             large
                             key={index}
                             onClick={()=> props.onSymbolClicked(symbol)}>{symbol}</TextButton>;
        })}
      </JustifiedRow>
      )
  }
  return columns;
}

export const Keypad = (props: KeypadProps) => {
  return (
    <Flex column stretch>
      <Ripple/>
      <Flex id="keypad" column justifySpaceBetween pd_medium accent stretch>
        {createRows(props)}
      </Flex>
    </Flex>
  )
}