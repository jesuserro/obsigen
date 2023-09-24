import { App } from "obsidian";
import React from "react";
import { AppContext } from "./../shared/appContext";

export const useApp = (): App | undefined => {
    return React.useContext(AppContext);
};