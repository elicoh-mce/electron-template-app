// index.js
import MyView from "./ViewInterfaceExample";

export const viewInterfaces = {
    MyView: <MyView>{},
};

export type ViewInterfacesType = typeof viewInterfaces;