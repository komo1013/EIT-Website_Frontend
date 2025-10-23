import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";

export function generateHeroUIDarkColors(sourceColor: string) {
  const theme = themeFromSourceColor(argbFromHex(sourceColor));
  const darkScheme = theme.schemes.dark;

  return {
    background: hexFromArgb(darkScheme.background),
    foreground: hexFromArgb(darkScheme.onBackground),

    divider: hexFromArgb(darkScheme.outline),

    content1: hexFromArgb(darkScheme.surface),
    content2: hexFromArgb(darkScheme.surfaceVariant),
    content3: hexFromArgb(theme.palettes.neutral.tone(25)),
    content4: hexFromArgb(theme.palettes.neutral.tone(35)),

    primary: hexFromArgb(darkScheme.primary),
    secondary: hexFromArgb(darkScheme.secondary),

    "primary-content": hexFromArgb(darkScheme.onPrimary),
    "secondary-content": hexFromArgb(darkScheme.onSecondary),
  };
}
