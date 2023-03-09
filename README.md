# Jamstack boilerplate webapp

Install all necessary packages:

```bash
yarn
```

## Strapi CMS

- Copy file `.env.example` to `.env` in the `cms` folder.
- Modify secret variables.
- Run the CMS via command: `yarn cms`.
- Initialize admin account and create a new API token (Settings -> API Tokens) for Nextjs webapp.

## Nextjs webapp

- Copy file `.env` to `.env.local` in the `website` folder.
- Copy the API token created above and set to `STRAPI_API_TOKEN` variable.
- Set other enviroment variables if needed.
- Start webapp via command: `yarn website`.
