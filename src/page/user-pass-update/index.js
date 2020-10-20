/*
* @Author: UsingLove
* @Date:   2017-09-28 10:38:05
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-10-06 16:11:01
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');

// page逻辑部分
var page = {
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password         : $.trim($('#password').val()),
                passwordNew      : $.trim($('#password-new').val()),
                passwordConfirm  : $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status) {
                // 更改用户密码
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-pass-update.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是否为空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            $('#password').focus();
            return result;
        }
        // 验证新密码的长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            $('#password-new').focus();
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            $('#password-confirm').focus();
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});