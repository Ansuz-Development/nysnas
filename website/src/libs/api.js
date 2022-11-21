/* eslint-disable no-process-env */
/* eslint-disable max-lines */
import axios from "axios";
import FormData from "form-data";

const token = process.env.STRAPI_API_TOKEN;

export const DOMAIN = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const apiInstance = axios.create({
  baseURL: `${DOMAIN}/api`,
  headers: {Authorization: `Bearer ${token}`},
});

const fetchAPI = async (query, {variables} = {}) => {
  try {
    const headers = {"Content-Type": "application/json"};

    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${DOMAIN}/graphql`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }

    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getHomepage = async locale => {
  const data = await fetchAPI(
    `
    query {
      homepage {
        data {
          attributes {
            title
            description
            cover {
              data {
                attributes {
                  url
                  formats
                }
              }
            }
            sections {
              ...on ComponentSectionsServiceSection {
                id
                __typename
                layout
                title
                subtitle
                services {
                  id
                  name
                  photo {
                    data {
                      attributes {
                        url
                        formats
                      }
                    }
                  }
                  description
                  link
                }
                background
                links {
                  title
                  link
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {locale}},
  );

  return data?.homepage?.data;
};
