import * as React from "react";
import * as Ons from "react-onsenui";
import { Text, Flex } from "react-style-helpers";
import { Display } from "../components/Display";
import { Toolbar } from "../components/Toolbar";
import { Keypad } from "../components/Keypad";
import { Symbols } from "../fx/Symbols";
import { FxResponse, findRate } from "../fx/FxResponse";
import { fxQuery } from "../fx/FxWebApiClient";
import { ErrorMessage } from "../components/ErrorMessage";

export const PageHeight = window.innerHeight;

export interface CurrencyCalculatorState {
  baseSymbol?: string,
  targetSymbol?: string,
  baseAmount?: number,
  targetAmount?: number,  
  fxRate: number;
  errorIShowing:boolean;
}

const initialState = {
  baseSymbol: undefined,
  targetSymbol: undefined,
  baseAmount: 0,
  targetAmount: 0,
  fxRate: 1,
  errorIShowing: false,
}

export class CurrencyCalculator extends React.Component<undefined, CurrencyCalculatorState> {

  constructor(props: undefined) {
    super(props);
    this.state = initialState;
  }

  handleCurrencyChange = (amount: number): void => {
    this.setState({
      baseAmount: amount
    })
  }

  hasCurrencyPair = () => {
    return this.state.baseSymbol && this.state.targetSymbol;
  }

  handleClear = () => {
    this.setState(initialState);
  }

  handleSymbolClicked = (symbol: string) => {
    if (!this.state.baseSymbol) {
      this.setState({
        baseSymbol: symbol,
      })
    } else {
      this.setState({
        targetSymbol: symbol,
      }, this.getRate)      
    }
  }

  handleFlip = () => {
    if (this.hasCurrencyPair()) {
      this.setState({
        baseSymbol: this.state.targetSymbol,
        targetSymbol: this.state.baseSymbol,
      }, this.getRate)
    }    
  }  

  handleRefresh = () => {
    if (this.hasCurrencyPair()) {
      this.getRate();
    }    
  }

  handleError = () => {
    this.setState({
      errorIShowing: true
    })
  }

  handleDismissError = () => {
    this.setState({
      errorIShowing: false
    })
  }

  getRate = () => {
   const {baseSymbol, targetSymbol} = this.state;
    if (baseSymbol === targetSymbol) {
      this.setState({
        fxRate: 1
      })
    } else {
      fxQuery(baseSymbol, targetSymbol)    
        .then((response: FxResponse) => {
          const fxRate = findRate(targetSymbol, response);
          const baseAmount = this.state.baseAmount || 1;
          this.setState({
            fxRate,
            baseAmount,
            targetAmount: baseAmount * fxRate
          })
        })
        .catch((error: any)=> {
          this.handleError();
      });     
    }    
  }

  render() {
    const {baseSymbol, targetSymbol, baseAmount, targetAmount, errorIShowing} = this.state;    
    return (
      <Ons.Page>
        <Flex column fillParent style={{minHeight: PageHeight, maxHeight: PageHeight, height: PageHeight}}>
          <Flex>
            <Display {...{baseSymbol, targetSymbol, baseAmount, targetAmount, onChange:this.handleCurrencyChange}} />
          </Flex>
          <Flex>
            <Toolbar onClear={this.handleClear} onFlip={this.handleFlip} onRefresh={this.handleRefresh}/>
          </Flex>        
          <Flex stretch>
            <Keypad symbols={Symbols} onSymbolClicked={this.handleSymbolClicked} />
          </Flex>                  
        </Flex>        
        <ErrorMessage isOpen={errorIShowing} onDismiss={this.handleDismissError} />
      </Ons.Page>
    )
  }
}