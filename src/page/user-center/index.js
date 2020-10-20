/*
* @Author: UsingLove
* @Date:   2017-09-28 08:43:49
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-16 09:15:46
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var _point          = require('service/point-service.js');
var templateIndex   = require('./index.string');

// page逻辑部分
var page = {
    data : {
        point : ''
    },
    init : function(){
        this.onload();
    },
    onload : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var _this = this;
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});