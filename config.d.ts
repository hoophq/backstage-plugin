export interface Config {
    hoop: {
        /**
        * BaseUrl is the api address
        * @visibility frontend
        */
        baseUrl: string;

        /**
        * token is the one which allows to access the api adress
        * @visibility frontend
        */
        token: string;
    };
}
