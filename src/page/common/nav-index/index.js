/*
* @Author: UsingLove
* @Date:   2017-09-24 08:07:27
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-12-01 15:49:24
*/

'use strict';
require('./index.css');
var _mm      = require('util/mm.js');
var _user    = require('service/user-service.js');
var _level   = require('service/level-service.js');
var _cart    = require('service/cart-service.js');
// 导航
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            _level.getUserLevel(function(res){
                $('.user-level').text(res);
            },function(errMsg){
                // do nothing
            }); 
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            // do nothing
        });
    }
};

module.exports = nav.init();