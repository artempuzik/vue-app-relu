const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;

const INTERCOM_API_KEY = import.meta.env.VITE_INTERCOM_API_KEY;

const API_HOST = import.meta.env.VITE_API_HOST;
const API_DASHBOARD_HOST = import.meta.env.VITE_API_DASHBOARD_HOST || 'http://146.190.160.173:81';

export { PROJECT_NAME, INTERCOM_API_KEY, API_HOST, API_DASHBOARD_HOST };
