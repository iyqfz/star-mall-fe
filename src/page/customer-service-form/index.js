/*
* @Author: UsingLove
* @Date:   2017-11-15 16:07:16
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-16 10:48:06
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm                         = require('util/mm.js');
var navSide                     = require('page/common/nav-side/index.js');
var _customer_service           = require('service/customer-service.js');

// page逻辑部分
var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber'),
        title       : _mm.getUrlParam('title') || '',
        mainContent : _mm.getUrlParam('mainContent') || '',
        serviceId   : _mm.getUrlParam('serviceId') || '',
        isAdd       : ''
    },
    init : function(){
        this.onload();
        this.bindEvent();
        this.loadServiceForm();
    },
    onload : function(){
        this.data.isAdd = this.data.title === '';
        // 初始化左侧菜单
        navSide.init({
            name: 'customer-service'
        });
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.commit',function(){
            if(window.confirm('确实填写完毕了吗？')){
                if($('.title').val() == ""){
                    alert("请简略描述一下问题");
                    return;
                }
                if($('.title').val().length > 30){
                    alert("你输入的内容过多了哦~不超过30个字");
                    return;
                }
                if($('.main-content').val() == ""){
                    alert("请填写遇到的详细情况和问题");
                    return;
                }
                if(_this.data.isAdd){
                    _customer_service.addSerive(_this.data.orderNumber,$('.title').val(),$('.main-content').val(), function(res){
                        _mm.successTips('申请成功，请等候处理');
                        window.location.href = './order-detail.html?orderNumber=' + _this.data.orderNumber;
                    }, function(errMsg){
                        _mm.errorTips(errMsg);
                    });
                } else {
                    _customer_service.editService(_this.data.serviceId, $('.title').val(),$('.main-content').val(), function(res){
                        _mm.successTips('更新成功');
                        window.location.href = './customer-service.html';
                    }, function(errMsg){
                        _mm.errorTips(errMsg);
                    });
                }
                
            }
        });
        $(document).on('click','.back',function(){
            if(_this.data.isAdd){
                window.location.href = './order-detail.html?orderNumber=' + _this.data.orderNumber;
            } else {
                if(window.confirm('确实要放弃更改吗？')){
                    window.location.href = './customer-service.html';
                }
            }
        });
    },
    loadServiceForm : function(){
        var _this       = this;
        $('.orderNo').html(_this.data.orderNumber);
        $('.title').val(_this.data.title);
        $('.main-content').html(_this.data.mainContent);
    }
};
$(function(){
    page.init();
});