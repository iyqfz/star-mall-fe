/*
* @Author: UsingLove
* @Date:   2017-10-26 09:05:06
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-15 17:25:57
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order           = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page逻辑部分
var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onload();
        this.bindEvent();
    },
    onload : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.order-cancel',function(){
            if(window.confirm('确实要取消该订单吗？')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    _mm.successTips('该订单取消成功');
                    _this.loadDetail();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
        $(document).on('click','.order-success',function(){
            if(window.confirm('确实要确认收货吗？')){
                _order.orderSuccess(_this.data.orderNumber, function(res){
                    _mm.successTips('确认收货成功');
                    _this.loadDetail();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
        $(document).on('click','.handling',function(){
            alert("请等候处理！");
        });
    },
    // 加载订单列表
    loadDetail : function(){
        var _this           = this,
            orderDetailHtml   = '',
            $content        = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(_this.data.orderNumber, function(res){
            _this.dataFileter(res);
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">'+ errMsg +'</p>'); 
        });
    },
    // 数据的适配
    dataFileter : function(data){
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
        data.isShipped      = data.status == 40;
        data.orderService   = data.status == 50;
        data.handling       = data.status == 70;
    }
};
$(function(){
    page.init();
});