const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "node_modules/@frostui/tailwindcss/dist/*.js"
    ],
    darkMode: ['class'],
    theme: {

        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1rem',
                md: '1rem',
                lg: '1rem',
                xl: '3rem',
                '2xl': '13rem',
            },
        },

        fontFamily: {
            'body': ['Be Vietnam Pro', 'sans-serif'],
        },

        extend: {
            colors: {
                'primary': colors.blue[600],
            },
        },
    },

    plugins: [
        require('@frostui/tailwindcss/plugin'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}