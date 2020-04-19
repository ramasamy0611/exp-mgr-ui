import {HttpHeaders} from '@angular/common/http';

export const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        Accept: 'plain/text',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        /* 'Content-Type': 'application/json',
         'Access-Control-Allow-Credentials': 'true',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',*/
    })
};
