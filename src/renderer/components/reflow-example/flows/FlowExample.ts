


import { Flow } from "@mcesystems/reflow";
import { ViewInterfacesType } from "../views-interface";

export default <Flow<ViewInterfacesType>>(async ({ view, views }) => {
    // Using the view() function to display the MyView component, at layer 0 of this flow
    const myView = view(0, views.MyView, {
        myInProp: "Hello Prop",
        mySecondInProp: "Some text"
    });

    console.log("Should show the first view");
    myView.on("myTriggeredEvent", ({ myEventData }) => {
        // do something with the event's data
    });
    const { myOutProp } = await myView;
    // ...
});