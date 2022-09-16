import { PropsWithChildren } from "react";

import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "../BackToTop";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <BackToTop />
            <Footer />
        </>
    );
}