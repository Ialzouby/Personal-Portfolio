"use client";
import { Jost } from "next/font/google";
import "./globals.css";
import "@/../public/scss/style.scss";
import Bootstrap from "@/components/Bootstrap/Bootstrap";
import Provider from "@/components/DarkMode/Provider/Provider";
import { Suspense } from "react";
import Loading from "./loading";
// import ColorSwitcher from "@/components/Shared/ColorPalettes/ColorSwitcher";

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
<head>
  <title>Issam Alzouby - AI Researcher - PhD Student</title>
  <meta name="description" content="AI researcher building digital twins, motion models, and medical AI tools." />

  {/* Open Graph Meta (for LinkedIn, Facebook, etc.) */}
  <meta property="og:title" content="Issam Alzouby - PhD Student | AI Researcher" />
  <meta property="og:description" content="AI researcher building digital twins, motion models, and medical AI tools." />
  <meta property="og:image" content="https://issam.up.railway.app/images/p13.png" />
  <meta property="og:url" content="https://issam.up.railway.app" />
  <meta property="og:type" content="website" />

  {/* Twitter Card Meta */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Issam Alzouby - PhD Student | AI Researcher" />
  <meta name="twitter:description" content="AI researcher building digital twins, motion models, and medical AI tools." />
  <meta name="twitter:image" content="https://issam.up.railway.app/images/p13.png" />

  {/* Favicon - Explicit declarations required by Google (mandatory) */}
  <link rel="icon" href="/favicon.ico" sizes="256x256" />
  <link rel="icon" href="/favicon-192x192.png" sizes="192x192" type="image/png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>

      <body className={jost.className}   cz-shortcut-listen="true">
        <Provider>
          <Bootstrap>
            <Suspense fallback={<Loading />}>
              <div>{children}</div>
            </Suspense>
          </Bootstrap>
        </Provider>
      </body>
    </html>
  );
}
