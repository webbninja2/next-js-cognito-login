"use client";
import { Amplify } from "aws-amplify";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import HeaderTopBar from "@/components/Layout/AppBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  Amplify.configure({
    Auth: {
      region: "ap-south",
      userPoolId: "ap-south-2_CT28TQAIx",
      userPoolWebClientId: "4cb3javplb1tu0agphmuumahkh",
      mandatorySignIn: true,
    },
  });


  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <HeaderTopBar />
        {children}
      </body>
    </html>
  );
}
