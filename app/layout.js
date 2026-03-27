import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header";
import {ClerkProvider} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"]
});
export const metadata = {
  title: "AI Career Coach",
  description: "Your Smart Path to a Dream Career"
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/*header*/}
            <Header/>
            <main className="min-h-screen px-4 pt-20 pb-6">{children}</main>
            <Toaster richColors/>
            {/*footer*/}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with ❤️ by ASPIRE AI</p>
              </div>
            </footer>
      </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
