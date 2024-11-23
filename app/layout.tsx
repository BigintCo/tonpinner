'use client';
import "tailwindcss/tailwind.css";

import localFont from "next/font/local";
import 'react-toastify/dist/ReactToastify.css';

import "@/public/style/scroll.css";
import "@/public/style/globals.css";
import dynamic from "next/dynamic";
import Settings from "@/layout/settings/settings";
import AppProvider from "@/providers/app-provider";
const TonConnectUIProvider = dynamic(
  () => import("@tonconnect/ui-react").then((mod) => mod.TonConnectUIProvider),
  { ssr: false } // SSR devre dışı
);
const poppins = localFont({
  src: [
    {
      path: "../public/font/popins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/font/popins/Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/font/popins/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/font/popins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/font/popins/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/popins/Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/font/popins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/font/popins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/font/popins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/font/popins/Poppins-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--poppins",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased flex h-full text-base`}>
        <TonConnectUIProvider manifestUrl="https://whale-app-pxshi.ondigitalocean.app/tonconnect-manifest.json">
          <AppProvider>
            {children}
          </AppProvider>
        </TonConnectUIProvider>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </body>
    </html>
  );
}
