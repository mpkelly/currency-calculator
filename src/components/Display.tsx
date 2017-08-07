import * as React from "react";
import {MouseEvent} from "react";
import { Div, Text, styled } from "react-style-helpers";
import { CurrencyAmount, CurrencyAmountProps } from "./CurrencyAmount";

export interface DisplayProps {
  baseSymbol: string;
  targetSymbol: string;
  baseAmount:number;
  targetAmount:number;
  onChange: (amount: number)=>void;
}

export const Display = (props: DisplayProps) => {
  const {baseSymbol, targetSymbol, baseAmount, targetAmount, onChange} = props;
  return (
    <Div pd_medium fillWidth>
      <CurrencyAmount symbol={baseSymbol} amount={baseAmount} onChange={onChange}/>
      <Text secondary large>=</Text>
      <CurrencyAmount symbol={targetSymbol} amount={targetAmount}/>
    </Div>
  )
}