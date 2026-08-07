import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Sachin Yadav | Full-Stack & ML Engineer",
  description: "Portfolio of Sachin Yadav — 3rd-year CS student & full-stack engineer.",
  keywords: ["Sachin Yadav", "Portfolio", "Full-Stack Developer", "Machine Learning", "Next.js"],
  authors: [{ name: "Sachin Yadav" }],
};

export const viewport = { width: "device-width", initialScale: 1.0 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
