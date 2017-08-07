export interface RequestOptions {
  method?: string,
  url: string,
  params?: string | any,
  headers?: any
}

export const makeRequest = <T extends {}>(opts: RequestOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let params = opts.params;
    if (params && typeof params === 'object') {
      params = Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
    }

    xhr.open(opts.method || "get", opts.url + params);

    xhr.onload =  ()=> {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = ()=> {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    if (opts.headers) {
      Object.keys(opts.headers).forEach(function (key) {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }
    xhr.send();
  });
};