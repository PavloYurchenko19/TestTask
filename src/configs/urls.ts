const defaultApi = process.env.REACT_APP_BASE_URL;
const baseUri = process.env.REACT_APP_BASE_URI;

const baseUrl = `${defaultApi}${baseUri}`;
export default baseUrl;

interface urlsInterface {
    users: string,
    positions: string,
    token: string,
}
export const urls: urlsInterface = {
  users: "/users",
  positions: "/positions",
  token: "/token",
};
