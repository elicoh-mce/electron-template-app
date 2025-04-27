
import flow2 from "./components/reflow-example/flows/FlowExample";
import { Reflow } from "@mcesystems/reflow";
import { ViewInterfacesType, viewInterfaces } from "./components/reflow-example/views-interface";
import { Transports } from "@mcesystems/reflow";
import { views } from "./components/reflow-example/views";
import { renderDisplayLayer } from "@mcesystems/reflow-react-display-layer";


const transport = new Transports.InProcTransport({});
// Start the flow
const reflow = new Reflow<ViewInterfacesType>({
    transport,
    views: viewInterfaces,
});

renderDisplayLayer({
    element: document.getElementById("root")!,
    transport,
    views: views
});

reflow.start(flow2).then(() => {
    console.log("flow2 is finished");
});
