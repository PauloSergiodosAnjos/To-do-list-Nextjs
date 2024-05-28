import { Inter } from "next/font/google";
import "./globals.css";
import GlobalContext from "../context/index"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContext>
          {children}
        </GlobalContext>
      </body>
    </html>
  );
}
