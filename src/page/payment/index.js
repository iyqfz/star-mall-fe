/*
* @Author: UsingLove
* @Date:   2017-10-26 10:33:03
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-10-26 11:13:46
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _payment           = require('service/payment-service.js');
var templateIndex   = require('./index.string');

// page逻辑部分
var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init : function(){
       this.onload();
    },
    onload : function(){
        this.loadPaymentInfo();
    },
    loadPaymentInfo : function(){
        var _this           = this,
            paymentHtml   = '',
            $pageWrap        = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(_this.data.orderNumber, function(res){
            // 渲染HTML
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">'+ errMsg +'</p>'); 
        });
    },
    // 监听订单状态
    listenOrderStatus : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber, function(res){
                if(res == true){
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            });
        }, 2e3);    //2e3  2秒
    }
};
$(function(){
    page.init();
});