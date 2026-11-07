import "./globals.css"
export const metadata = { title: "سوق سيارات دز" }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl"><body className="bg-gray-50">{children}</body></html>
}
