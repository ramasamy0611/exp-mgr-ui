import {HttpHeaders} from '@angular/common/http';

export const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        // Accept: 'plain/text',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Accept, Content-Type, Authorization, X-Requested-With, ' +
            'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Origin, ' +
            'Access-Control-Allow-Credentials'
    })
};
export const HTTP_OPTIONS_POST = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Accept, Content-Type, Authorization, X-Requested-With, ' +
            'Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Origin, ' +
            'Access-Control-Allow-Credentials'
    })
};
