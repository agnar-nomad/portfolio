// infrastructure links
export const BACKEND_URL = process.env.NEXT_PUBLIC_WENLAUNCH_STRAPI_BACKEND_URL;
export const LOCAL_BACKEND_URL = 'http://localhost:1337/api';
export const API_TOKEN = process.env.NEXT_PUBLIC_WENLAUNCH_APP_API_TOKEN

// misc constants
export const MAX_IMAGE_UPLOAD_SIZE = 3 * 1024 * 1024; // 3mb
export const PAGINATION_SIZE = 18;

// Colour themes
export const LIGHT_THEME = 'bumblebee'
export const DARK_THEME = 'halloween'
export const wlThemeStorageKey = 'wenlaunch-theme'

