
export const postWorkListUrl = '/publish/public'

export function getWorkByUser(userid){
    return `/publish/ByUserId/${userid}`
}

export function getLikeByUser(userid){
    return `/like/praise/user/${userid}`
}

export const publishWechatWorkUrl = '/publish/wechat/work'

export function delWorkById(id){
    return `/publish/${id}`
}

export function getPrivacyWorkByUserId(userid){
    return `/publish/privacyWork/${userid}`
}

// 查看作品
export const getViewWork = '/view/work'
