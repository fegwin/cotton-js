export default class Json {
    loadJson(url) {
        return fetch(url).then(r => r.json());
    }
}
//# sourceMappingURL=json.js.map