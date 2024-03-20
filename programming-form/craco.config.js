module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.output = {
          ...webpackConfig.output,
          globalObject: 'self',
        };
        return webpackConfig;
      },
    },
  };