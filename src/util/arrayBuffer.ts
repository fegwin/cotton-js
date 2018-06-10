import { Promise } from "es6-promise";

export function loadBuffer(url: string): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
      const request = new XMLHttpRequest();

      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      request.onload = () => {
        const data = request.response;

        if (!(data instanceof ArrayBuffer)) {
          throw new Error(`URL: ${url} did not provide an ArrayBuffer`);
        }

        resolve(data as ArrayBuffer);
      };

      request.send();
  });
}
