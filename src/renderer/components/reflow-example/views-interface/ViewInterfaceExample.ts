// MyView.ts
import { ViewInterface } from "@mcesystems/reflow";

// defining how the input properties look like
export interface Input {
    myInProp: string;
    mySecondInProp: string;
}

// defining the view's events, each field's name is the event name, and defined type is the event's data type
export interface Events {
    myTriggeredEvent: {
        myEventData: number
    };
}

// defining how the output properties look like
export interface Output {
    myOutProp: boolean;
}

export default interface MyView extends ViewInterface<Input, Events, Output> { }