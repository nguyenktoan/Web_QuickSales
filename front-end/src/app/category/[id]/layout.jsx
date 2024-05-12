import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ minHeight: "100%" }}>
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <div style={{ flex: "1" }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
