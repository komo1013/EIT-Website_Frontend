import { Fira_Code as FontMono, Inter as FontSans, Ubuntu as FontUbuntu, Doto as FontDoto, Montserrat as FontMontserrat, Sixtyfour as FontSixtyFour} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontUbuntu = FontUbuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
});

export const fontDoto = FontDoto({
  subsets: ["latin"],
  variable: "--font-doto",
});

export const fontMontserrat = FontMontserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const fontSixtyFour = FontSixtyFour({
  subsets: ["latin"],
  variable: "--font-sixtyfour",
});