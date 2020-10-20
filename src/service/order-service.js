/*
* @Author: UsingLove
* @Date:   2017-10-23 10:09:54
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-15 13:32:17
*/

'use strict';

var _mm = require('util/mm.js');

var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product'),
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create'),
            data    : orderInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/list'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 确认收货
    orderSuccess : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/order_success'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;