export const postCodeLoginUrl = '/auth/login/code'

export const postSmsLoginUrl = '/auth/sms/code'

export const getProfileUrl = '/auth/profile'

export function getUserInfo() {
    return `/user/`
}

export function editNameUrl(userid){
    return `/user/username/${userid}`
}