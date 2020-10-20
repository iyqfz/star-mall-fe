/*
* @Author: UsingLove
* @Date:   2017-11-14 13:47:53
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-14 13:51:43
*/

'use strict';

var _mm = require('util/mm.js');

var _level = {
    // 获取用户星级
    getUserLevel : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/level/get_user_level'),
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _level;