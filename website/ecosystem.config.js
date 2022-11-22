module.exports = {
  apps: [
    {
      name: "website",
      script: "npm",
      args: "start",
      // eslint-disable-next-line camelcase
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
