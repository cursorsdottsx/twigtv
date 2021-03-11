module.exports = {
    purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                green: "var(--clr-green)",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
