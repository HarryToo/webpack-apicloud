const DEV_API_ROOT = 'http://192.168.1.235:8000/App/';
const PROD_API_ROOT = 'http://axh.wx273.com/App/';

export const API_ROOT = process.env.NODE_ENV === 'production' ? PROD_API_ROOT : DEV_API_ROOT;
