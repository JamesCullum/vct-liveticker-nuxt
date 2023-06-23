export const THEMES = Object.freeze({ AUTO: 0, DARK: 1, LIGHT: 2 });
export const themeIcons = ["brightness-contrast", "moon-o", "brightness_low"];
export const themeLabels = ["Auto", "Dark", "Light"];

export const useTheme = () =>
  useState("selectedTheme", () => THEMES.AUTO) as Ref<number>;

export function getThemeName(selectedTheme: Ref) {
  if (selectedTheme.value == THEMES.DARK) return "dark";
  if (selectedTheme.value == THEMES.AUTO) {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  }
  return "light";
}
