export default class Json {
  loadJson(url: string): Promise<Response> {
    return fetch(url).then(r => r.json());
  }
}
