module.exports = {
  reactStrictMode: true,

  // https://github.com/leerob/leerob.io/blob/9adc510cbfb3da88c3b0ad15632eb876ca91b607/next.config.js#L27-L33
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },
};
