import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <div>{children}</div>
      </body>
    </html>
  );
};

export default Layout;
