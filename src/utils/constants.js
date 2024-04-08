const EXPLORE = {
  title: "Explore",
  pathname: "/"
}

const SAVED = {
  title: "Saved",
  pathname: "saved"
}

const AUTHENTICATION = {
  title: "Sign In",
  pathname: "authentication/sign-in"
}

const PAGE404 = {
  pathname: "*"
}

const UNSPLASH_REFERRAL_PATH = "/?utm_source=like_pics&utm_medium=referral";
const UNSPLASH_URL = `https://unsplash.com${UNSPLASH_REFERRAL_PATH}`;
const UNSPLASH_NAME = "Unsplash";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";


export {
  EXPLORE,
  SAVED,
  PAGE404,
  UNSPLASH_REFERRAL_PATH,
  UNSPLASH_URL,
  UNSPLASH_NAME,
  DARK_THEME,
  LIGHT_THEME,
  AUTHENTICATION
};