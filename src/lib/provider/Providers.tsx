"use client"

import { Toaster } from "sonner"
import { Provider } from "react-redux"
import { store, persistor } from "../redux/store"
import { PersistGate } from "redux-persist/integration/react"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
                <Toaster position="top-right" richColors />
            </PersistGate>
        </Provider>
    )
}

export default Providers
