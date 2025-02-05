export const URL = global.URL;
export const URLSearchParams = global.URLSearchParams;
import * as bc from './bc/url_client';
// backwards compatibility
Object.assign(URL, bc);
