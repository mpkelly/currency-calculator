import * as React from "react";
import  {MouseEvent} from "react";
import { Flex, Text, Input } from "react-style-helpers";

export interface CurrencyAmountProps {
  symbol: string;
  amount: number;
  onChange?: (amount: number)=>void;
}

const round2 = (amount: number) => {
  return Math.round(amount * 100) / 100
}

export const CurrencyAmount = (props: CurrencyAmountProps) => {
  const amount = round2(props.amount);
  const onChange = (event)=>props.onChange(Number(event.currentTarget.value));
  return (
    <Flex alignCenter>
      {props.onChange
        ? <Input modifier="transparent"
                type="number"
                min="0"
                xlarge
                stretch
                value={amount}
                onChange={onChange} />
        : <Text xlarge stretch>{amount}</Text>
      }
      <Text secondary>{props.symbol}</Text>
    </Flex>
  )
}