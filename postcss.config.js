module.exports = {
    plugins: [
        require('postcss-import')(),
        require('precss'),
        require('autoprefixer')({
            browsers: ["ie>=8", "last 200 versions"]
        }),

    ]
}