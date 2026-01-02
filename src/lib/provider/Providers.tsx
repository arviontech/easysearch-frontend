"use client"

import { Provider } from "react-redux"
import { store } from "../redux/store"
import SessionManager from "./SessionManager"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <SessionManager>
                {children}
            </SessionManager>
        </Provider>
    )
}

export default Providers
