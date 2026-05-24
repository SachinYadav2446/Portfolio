import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Sachin Yadav | 3D Creative Frontend Developer",
  description: "3D animated portfolio of Sachin Yadav, 2nd-year student & creative frontend developer. Built with Next.js, Framer Motion, and React Three Fiber.",
  keywords: ["Sachin Yadav", "3D Portfolio", "Creative Developer", "Next.js", "Three.js", "React Three Fiber", "Framer Motion", "Frontend heavy", "Red Black Cream Portfolio"],
  authors: [{ name: "Sachin Yadav" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
