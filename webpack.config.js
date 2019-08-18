const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

let typescript_bundler = {
    test: /\.ts$/,
    use: [
        "ts-loader",
        path.resolve(
            __dirname,
            "loaders",
            "annotations_loader",
            "annotations_loader.js"
        )
    ]
};

let _MODE = "production";

module.exports = [
    //Frontend Code Compilation
    {
        entry: {
            client: "./src/frontend/scripts/main.ts",
            home_page_client: "./src/frontend/scripts/home_page.ts",
            who_am_i_client: "./src/frontend/scripts/who_am_i.ts"
        },
        target: "node",
        mode: _MODE,
        node: {
            __dirname: false,
            __filename: true
        },
        module: {
            rules: [typescript_bundler]
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist", "frontend", "scripts")
        },
        plugins: [
            new CopyPlugin([
                {
                    from: "./src/frontend/pages",
                    to: "../../frontend",
                    ignore: ["*.ts", "*.js"]
                }
            ]),
            new CopyPlugin([
                {
                    from: "./src/frontend/styles",
                    to: "../../frontend/styles",
                    ignore: ["*.ts", "*.js"]
                }
            ]),
            new CopyPlugin([
                {
                    from: "./src/frontend/assets",
                    to: "../assets"
                }
            ])
        ]
    },

    // Backend Code Compilation
    {
        entry: {
            server: "./src/backend/server.ts"
        },
        target: "node",
        mode: _MODE,
        node: {
            __dirname: false
        },
        module: {
            rules: [typescript_bundler]
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist", "backend")
        }
    }
];
