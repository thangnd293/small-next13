import "@/styles/global.scss";

import Providers from "@/components/Providers";

export const metadata = {
  title: "Small",
  description: "Small description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
