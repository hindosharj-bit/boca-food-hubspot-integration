import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boca Food - HubSpot Integration',
  description: 'E-commerce website for Boca Food with HubSpot integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <h1>Boca Food</h1>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2025 Boca Food. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
