"use client"

import { Toaster } from "sonner"
import { Provider } from "react-redux"
import { store } from "../redux/store"


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
            <Toaster position="top-right" richColors />
        </Provider>
    )
}

export default Providers
