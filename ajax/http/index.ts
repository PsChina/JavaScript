import axios from 'axios';
import { baseUrl } from './config';
axios.defaults.withCredentials = true; // 让 axios 携带cookie

declare global {
    interface Window {
        $uuid: any;
        process: any;
        infoBus: any;
    }
}
window.process = {};

window.process.env = {
    ...process.env,
};


interface GetParams {
    [key: string]: any
}

function transformRequest(data: GetParams) {
    // Do whatever you want to transform the data
    let ret = '';
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret.substring(0, ret.length - 1);
}

class Api {
    private language?: number;
    private fullUrl: string;
    private headers: object;
    private token?: string;
    private responseType?: string;

    constructor(path: string) {
        this.fullUrl = `${baseUrl}${path}`;
        // if (process.env.NODE_ENV === `'development'`) {
        //     this.fullUrl = `/szhb${path}`;
        // }
        this.headers = {
            xhrFields: {
                withCredentials: true,
            },
            crossDomain: true,
        };

    }
    public syncLang(): void {
    }
    public setResponseType(type: string) {
        this.responseType = type;
        return this;
    }
    public setHeaders(headers: object) {
        this.headers = Object.assign(this.headers, headers);
        return this;
    }
    public send(method: string, params: any): Promise<any> {
        const isGet = method.toUpperCase() === 'GET';
        return axios({
            url: this.fullUrl + (isGet ? `?${transformRequest(params)}` : ''),
            method,
            headers: this.headers,
            responseType: this.responseType,
            data: isGet ? undefined : Object.assign({
                token: this.token,
                uuid: window.$uuid,
                language: this.language,
            }, params),
        } as any);
    }
    public get(params?: object): Promise<any> {
        this.syncLang();
        return this.send('GET', params);
    }
    public post(params?: object): Promise<any> {
        this.syncLang();
        return this.send('POST', params);
    }
}