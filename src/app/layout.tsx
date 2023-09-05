import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './provider'
import './main.css'
import { HeaderAction } from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AniList',
  description: 'Do you like Anime? if so watch your favourite anime AniList !',
}

const links = [
  {
    link: '/list',
    label: 'Список'
  },
  {
    link: '/schedule',
    label: 'Расписание'
  },
  {
    link: '/random',
    label: 'Случайное'
  }
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="images/juuzou.png" />
      </head>
      <Provider>
        <body className={inter.className} suppressHydrationWarning={true}>
          <HeaderAction links={links} />
          {children}
        </body>
      </Provider>
    </html>
  )
}
