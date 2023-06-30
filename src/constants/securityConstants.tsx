export const securityConstants = {
  apiBaseUrl:
    process.env.REACT_APP_API_BASE_URL ||
    'https://crm.staging.it-incubator.ru/api/',
  botUrl:
    process.env.REACT_APP_BOT_URL ||
    'https://students-bot-api.staging.it-incubator.ru',
  personalPageBaseUrl:
    process.env.REACT_APP_PERSONAL_PAGE_API_URL ||
    'https://personal-page.staging.it-incubator.ru/api/3.0',
};
