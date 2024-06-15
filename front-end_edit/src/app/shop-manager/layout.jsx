import Header from "@/components/header";
import Footer from "@/components/footer";
import { Fragment } from "react";

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
}
