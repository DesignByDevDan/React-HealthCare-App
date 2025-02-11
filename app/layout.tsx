// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Healthcare Platform",
  description: "A modern healthcare management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
