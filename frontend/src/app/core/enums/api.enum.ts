export enum AuthEndPoints {
    BASE_URL = 'http://localhost:3000/auth',

    SIGN_IN = BASE_URL + '/sign-in',
    SIGN_UP = BASE_URL + '/sign-up',
    USER_PROFILE = BASE_URL + '/profile',
}

export enum AdminEndPoints {
    BASE_URL = 'http://localhost:3000/admin',


    DASHBOARD = BASE_URL + '/sign-in',
    USERS = BASE_URL + '/sign-up',
    ROLES = BASE_URL + '/sign-up',
    PERMISSIONS = BASE_URL + '/sign-up',
}