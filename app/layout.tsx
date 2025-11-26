import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SwissDevJobs - IT & Software Developer Jobs in Switzerland",
  description: "Find the best IT and software developer jobs in Switzerland. Browse tech jobs in Zürich, Basel, Bern, Geneva and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={dmSans.variable}>
        {children}
      </body>
    </html>
  );
}
