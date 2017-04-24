// const prod = process.env.NODE_ENV === 'production'
const env = process.env.NODE_ENV;

const BACKEND_URL = env==="production" ? 'https://example-production-URL.com' : 'http://localhost:8081';

export default BACKEND_URL;
