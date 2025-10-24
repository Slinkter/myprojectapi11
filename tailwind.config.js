import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
    darkMode: 'class',
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-family)', 'sans-serif'],
            },
        },
    },
    plugins: [],
});
