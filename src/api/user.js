

import request from './request';
import { isXboard } from '@/utils/baseConfig';





export function getUserInfo() {

    return request({

        url: '/user/info',

        method: 'get'

    });

}





export function getIpLocationInfo() {

    return request({

        url: 'https://myip.ipip.net/json',

        method: 'get',

        baseURL: ''
    });

}





export function redeemGiftCard(giftcard) {

    const xboard = isXboard();

    return request({

        url: xboard ? '/user/gift-card/redeem' : '/user/redeemgiftcard',

        method: 'post',

        data: xboard ? { code: giftcard } : { giftcard }

    });

}





export function changePassword(data) {

    return request({

        url: '/user/changePassword',

        method: 'post',

        data

    });

}





export function resetSecurity() {

    return request({

        url: '/user/resetSecurity',

        method: 'get'

    });

}





export function updateRemindSettings(data) {

    return request({

        url: '/user/update',

        method: 'post',

        data

    });

}





export function getActiveSession() {

    return request({

        url: '/user/getActiveSession',

        method: 'get'

    });

}





export function removeActiveSession(sessionId) {

    return request({

        url: '/user/removeActiveSession',

        method: 'post',

        data: { session_id: sessionId }

    });

}





export function getCommConfig() {

    return request({

        url: '/user/comm/config',

        method: 'get'

    });

}





export function getTelegramBotInfo() {

    return request({

        url: '/user/telegram/getBotInfo',

        method: 'get'

    });

}





export function getUserSubscribe() {

    return request({

        url: '/user/getSubscribe',

        method: 'get'

    });

}
