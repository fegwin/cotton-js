export function loadJSON(url) {
  return fetch(url)
    .then(r => r.json());
}
