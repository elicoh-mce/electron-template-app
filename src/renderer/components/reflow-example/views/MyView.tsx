import MyViewInterface from "../views-interface/ViewInterfaceExample";
import * as React from "react";
import Counter from "./Counter";
import SubComponent from "./SubComponent";
import { ReflowReactComponentFunction } from "@mcesystems/reflow-react-display-layer";

const MyView: ReflowReactComponentFunction<MyViewInterface> = ({ myInProp, mySecondInProp, event, done }) => {
    return (
        <div>
            <SubComponent myInProp={myInProp} mySecondInProp={mySecondInProp} event={event} done={done} />
            <Counter />
        </div>
    );
};

export default MyView;