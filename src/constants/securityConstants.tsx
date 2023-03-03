export const securityConstants = {
  apiBaseUrl:
    process.env.REACT_APP_API_BASE_URL ||
    'https://labs-api.staging.it-kamasutra.com/api/',
  botUrl:
    process.env.REACT_APP_BOT_URL ||
    'https://st-students-bot-api.herokuapp.com',
  personalPageBaseUrl:
    process.env.REACT_APP_PERSONAL_PAGE_API_URL ||
    'https://personal-page.staging.it-incubator.ru/api/3.0',
};
