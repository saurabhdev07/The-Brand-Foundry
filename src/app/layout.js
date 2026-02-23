import "./globals.css";

export const metadata = {
  title: "The Brand Foundry | Portfolio",
  description: "Portfolio Website of The Brand Foundry",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cursor-none">
        {children}
      </body>
    </html>
  );
}
