import { Fragment } from "react";

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <main>{children}</main>
    </Fragment>
  );
}
