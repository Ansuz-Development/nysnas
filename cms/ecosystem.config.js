module.exports = {
  apps: [
    {
      name: "cms",
      script: "npm",
      args: "start",
      // eslint-disable-next-line camelcase
      env_production: {
        NODE_ENV: "production",
        PORT: 1337,
      },
    },
  ],
};
