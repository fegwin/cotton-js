/**
 * Retrieves JSON from an endpoint
 * @param url The URL to fetch a response from
 */
export function loadJson(url: string): Promise<Response> {
  return fetch(url).then((r) => r.json());
}
