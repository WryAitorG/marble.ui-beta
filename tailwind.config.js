/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.mdx"
  ],
  theme: {
    extend: {
      containers: {
        sm: '640px',  // Define el breakpoint 'sm' en 640px
        md: '768px',  // Define el breakpoint 'md' en 768px
        lg: '1024px', // Define el breakpoint 'lg' en 1024px
        xl: '1280px', // Define el breakpoint 'xl' en 1280px
        '2xl': '1536px', // Define el breakpoint '2xl' en 1536px
        // Puedes añadir más breakpoints personalizados según tus necesidades
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      maxWidth: {
        "8xl": "1340px",
        "9xl": "1600px",
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
