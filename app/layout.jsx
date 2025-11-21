import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/style.css";
import SessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home | Pond Botique",
  description:
    "Pond Botique is a women's clothing brand that offers a curated selection of high-quality, unique, and comfortable clothing items for the woman. Our mission is to provide you with the best possible clothing experience, whether you're looking for casual everyday wear or a special occasion outfit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

