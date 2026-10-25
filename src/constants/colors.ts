export const colors = {
  forest: "#1e4d36",
  "forest-deep": "#163a28",
  sage: "#9db5a6",
  "sage-soft": "#e7f1ea",
  sand: "#dcebe1",
  "sand-soft": "#f1f3f2",
  paper: "#f7f8f6",
  white: "#ffffff",
  ink: "#121413",
  "ink-muted": "#858a87",
  line: "#ebedeb",
  clay: "#1e4d36",
  lime: "#c9f26b",
  danger: "#c7332e",
} as const;

export type ColorToken = keyof typeof colors;
