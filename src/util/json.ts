export class Json {
  public loadJson(url: string): Promise<Response> {
    return fetch(url).then((r) => r.json());
  }
}
