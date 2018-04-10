export default function loadJSON(url) {
  return fetch(url)
    .then(r => r.json());
}
