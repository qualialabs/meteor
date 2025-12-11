import { buildUrl, _encodeParams } from "./url_common.js";

export function _constructUrl (url, query, params) {
  var query_match = /^(.*?)(\?.*)?$/.exec(url);
  return buildUrl(
    query_match[1],
    query_match[2],
    query,
    params
  );
}

export { _encodeParams };
