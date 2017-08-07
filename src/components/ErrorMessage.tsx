import * as React from "react";
import { Div, Text, Flex, Button, Toast } from "react-style-helpers";

export interface ErrorMessageProps {
  onDismiss: Function;
  isOpen: boolean;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <Toast isOpen={props.isOpen} pl_medium pr_medium animation="fall">
      <Flex fillParent alignCenter>
        <Text white small uppercase stretch>
          Something went wrong
        </Text>
        <Button modifier="quiet" small uppercase onClick={()=>props.onDismiss()}>dismiss</Button>
      </Flex>          
    </Toast>  
  )
}