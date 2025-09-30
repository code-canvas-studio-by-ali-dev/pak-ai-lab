import { FC, Fragment, ReactNode } from "react";
import Navbar from "../Navbar";

interface MainWrapperProps {
    children: ReactNode
}

const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
    return (
        <Fragment>
            <header className="fixed inset-x-0 z-50">
                <div className="mx-auto max-w-4xl w-full px-4">
                    <Navbar />
                </div>
            </header>
            <main>
                {children}
            </main>
        </Fragment>
    )
}

export default MainWrapper;