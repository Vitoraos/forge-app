import './globals.css'

export const metadata = {
  title: 'Forge — Code from anywhere',
  description: 'Code doesn\'t wait for a desk. Neither does Forge.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base text-secondary antialiased">
        {children}
      </body>
    </html>
  )
}
