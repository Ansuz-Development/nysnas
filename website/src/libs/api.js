/* eslint-disable no-process-env */
/* eslint-disable max-lines */
import axios from "axios";
import qs from "qs";
// import FormData from "form-data";

const token = process.env.STRAPI_API_TOKEN;

export const DOMAIN = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const strapiApi = axios.create({
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

export const getHomepage = async () => {
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
              ...on ComponentSectionsHeaderSection {
                id
                __typename
                title
                subtitle
                layout
                background
                photos {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
                slides {
                  id
                  videoLink
                  duration
                  photo {
                    data {
                      attributes {
                        url
                        formats
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsStatsSection {
                id
                __typename
                title
                subtitle
                layout
                background
                stats {
                  label
                  value
                  background
                }
              }
              ...on ComponentSectionsServiceSection {
                id
                __typename
                title
                subtitle
                layout
                background
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
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsGallerySection {
                id
                __typename
                title
                subtitle
                layout
                background
                photos {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsPricingSection {
                id
                __typename
                title
                subtitle
                layout
                background
                plans {
                  id
                  title
                  price
                  unit
                  plan
                  recommended
                  reversed
                  link
                  linkTitle
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsGallerySection {
                id
                __typename
                title
                subtitle
                layout
                background
                photos {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsPartnerSection {
                id
                __typename
                title
                subtitle
                layout
                background
                partners {
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
                  introduction
                  link
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {}},
  );

  return data?.homepage?.data;
};

export const getPages = async () => {
  const data = await fetchAPI(
    `
    query {
      pages {
        data {
          attributes {
            title
            slug
          }
        }
      }
    }
    `,
    {variables: {}},
  );

  return data?.pages?.data;
};

export const getPageBySlug = async slug => {
  const data = await fetchAPI(
    `
    query getPageBySlug($slug:String) {
      pages(filters:{slug:{eq:$slug}}) {
        data {
          attributes {
            title
            slug
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
              ...on ComponentSectionsHeaderSection {
                id
                __typename
                title
                subtitle
                layout
                background
                photos {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
                slides {
                  id
                  videoLink
                  duration
                  photo {
                    data {
                      attributes {
                        url
                        formats
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsStatsSection {
                id
                __typename
                title
                subtitle
                layout
                background
                stats {
                  label
                  value
                  background
                }
              }
              ...on ComponentSectionsServiceSection {
                id
                __typename
                title
                subtitle
                layout
                background
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
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsGallerySection {
                id
                __typename
                title
                subtitle
                layout
                background
                photos {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsPricingSection {
                id
                __typename
                title
                subtitle
                layout
                background
                plans {
                  id
                  title
                  price
                  unit
                  plan
                  recommended
                  reversed
                  link
                  linkTitle
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsGallerySection {
                id
                __typename
                title
                subtitle
                layout
                background
                photos {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsPreviewSection {
                id
                __typename
                title
                subtitle
                layout
                background
                document {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsQuoteSection {
                id
                __typename
                title
                subtitle
                layout
                background
                photo {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                quotes {
                  quote
                  person
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsContactSection {
                id
                __typename
                title
                subtitle
                layout
                background
                photo {
                  data {
                    attributes {
                      url
                      formats
                    }
                  }
                }
                successTitle
                successMessage
                successLink {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
              ...on ComponentSectionsTextSection {
                id
                __typename
                layout
                background
                content
              }
              ...on ComponentSectionsPartnerSection {
                id
                __typename
                title
                subtitle
                layout
                background
                partners {
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
                  introduction
                  link
                }
                links {
                  title
                  link
                  type
                  icon {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {slug}},
  );

  return data?.pages?.data?.[0];
};

export const getNavbar = async () => {
  const data = await fetchAPI(
    `
    query {
      navbar {
        data {
          attributes {
            layout
            logo {
              data {
                attributes {
                  url
                  formats
                }
              }
            }
            links {
              id
              title
              link
            }
            rightLinks {
              id
              title
              link
              type
              icon {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {}},
  );

  return data?.navbar?.data;
};

export const getFooter = async () => {
  const data = await fetchAPI(
    `
    query {
      footer {
        data {
          attributes {
            layout
            copyright
            logo {
              data {
                attributes {
                  url
                  formats
                }
              }
            }
            photo {
              data {
                attributes {
                  url
                  formats
                }
              }
            }
            addresses {
              id
              title
              address
            }
            contacts {
              id
              name
              phone
              email
            }
            socialLinks {
              facebook
              linkedin
              twitter
              youtube
              instagram
            }
            links {
              title
              link
              type
              icon {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {}},
  );

  return data?.footer?.data;
};

export const getServiceGroup = async id => {
  const data = await fetchAPI(
    `
    query getServiceGroup($id:ID) {
      serviceGroup(id:$id) {
        data {
          id
          attributes {
            layout
            name
            question
            parent {
              data {
                id
              }
            }
            subGroups(sort:"order:asc") {
              data {
                id
                attributes {
                  name
                }
              }
            }
            services(sort:"order:asc") {
              data {
                id
                attributes {
                  name
                  answer
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {id}},
  );

  return data?.serviceGroup?.data;
};

export const getServiceGroups = async () => {
  const data = await fetchAPI(
    `
    query {
      serviceGroups {
        data {
          id
        }
      }
    }
    `,
    {variables: {}},
  );

  return data?.serviceGroups?.data;
};

export const getServiceModal = async () => {
  const data = await fetchAPI(
    `
    query getServiceModal {
      serviceModal {
        data {
          attributes {
            title
            subtitle
            services {
              data {
                id
                attributes {
                  name
                  photo {
                    data {
                      attributes {
                        url
                        formats
                        previewUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {}},
  );

  return data?.serviceModal?.data;
};

export const getService = async id => {
  const data = await fetchAPI(
    `
    query getService($id:ID) {
      service(id:$id) {
        data {
          id
          attributes {
            name
            answer
            pricing
            plan
            note
            description
            order
            group {
              data {
                id
              }
            }
            photo {
              data {
                attributes {
                  url
                  formats
                }
              }
            }
          }
        }
      }
    }
    `,
    {variables: {id}},
  );

  return data?.service?.data;
};

export const getServices = async () => {
  const data = await fetchAPI(
    `
    query {
      services {
        data {
          id
          attributes {
            name
          }
        }
      }
    }
    `,
    {variables: {}},
  );

  return data?.services?.data;
};

export const createContactMessage = async ({
  name,
  email,
  phone,
  address,
  zipcode,
  city,
  date,
  time,
  service,
}) => {
  const data = await fetchAPI(
    `
    mutation createRequest(
      $name: String,
      $email: String,
      $phone: String,
      $address: String,
      $zipcode: String,
      $city: String,
      $date: Date,
      $time: Time,
      $service:String,
    ) {
      createContactMessage(data:{
        name:$name,
        email:$email,
        phone:$phone,
        address:$address,
        zipcode:$zipcode,
        city:$city,
        date:$date,
        time:$time,
        service:$service
      }) {
        data {
          id
          attributes {
            name
            phone
            email
          }
        }
      }
    }
    `,
    {
      variables: {
        name,
        email,
        phone,
        address,
        zipcode,
        city,
        date,
        time,
        service,
      },
    },
  );

  return data?.createContactMessage.data;
};
