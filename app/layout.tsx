import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jonner Jesús Serrano Mora - Ingeniero Electrónico & Product Owner",
  description:
    "CV profesional de Jonner Jesús Serrano Mora, Ingeniero Electrónico especializado en Product Management, Scrum y desarrollo de software.",
  keywords:
    "Product Owner, Scrum, Ingeniero Electrónico, Desarrollo de Software, Metodologías Ágiles, Facturación Electrónica",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Jonner Jesús Serrano Mora - CV Profesional",
    description:
      "Product Owner & Ingeniero Electrónico con experiencia en metodologías ágiles y desarrollo de software",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
