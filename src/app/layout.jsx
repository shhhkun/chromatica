import "./globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
