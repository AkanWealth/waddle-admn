import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/component/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
        fontFamily: {
            inter: ["Inter", "sans-serif"],
            rubikRegular: ["Rubik_Regular"],
            rubikMedium: ["Rubik_Medium"],
            rubikBold: ["Rubik_Bold"],

        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "base-white": "#FFFFFF",
                "base-black": "#111111",
                "base-secondary": "#e8e8e8",
                secondary: "#777",
                green: "#165c26",
                "waddle-primary": "#2853A6",
                "waddle-secondary": "#f4b847",
                "waddle-success": "#28a745",
                "waddle-warning": "#ffa500",
                "waddle-error": "#e74c3c",
                "waddle-accent": "#96e6a8",
                "waddle-info": "#6eb3b6",
                "waddle-light": "#eaf6ec",
                "waddle-dark": "#29585a",
                "waddle-blank": "#f5fdf6",
                "waddle-blank-deep": "#EDF6F6",
            },
        },
    },
    plugins: [],
} satisfies Config;
