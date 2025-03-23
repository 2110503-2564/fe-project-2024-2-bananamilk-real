'use client'
import { Provider as ReactReduxProvider } from "react-redux";
import { store } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@mui/material";

export function ReduxProvider({ children }: { children: React.ReactNode }) {

    let reduxPersistor = persistStore(store)

    return (
        <ReactReduxProvider store={store}>
            <PersistGate loading={
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress size={50} />
                </div>
            } persistor={reduxPersistor}>
                {children}
            </PersistGate>
        </ReactReduxProvider>
    )
}   