import * as React from "react";
import { Events } from "../views-interface/ViewInterfaceExample";

interface SubComponentInterface {
    myInProp: string;
    mySecondInProp: string;
    event: <U extends keyof Events>(eventName: U, eventData: Events[U]) => void;
    done: (output: any) => void;
}

export default function SubComponent({ myInProp, mySecondInProp, event, done }: SubComponentInterface) {
    return <div>
        <div>{myInProp}</div>
        <div>{mySecondInProp}</div>
        <div>
            <button onClick={() => event("myTriggeredEvent", { myEventData: Math.random() })}>Event</button>
            <button onClick={() => done({ myOutProp: true })}>Finish</button>
        </div>
    </div>;
}
