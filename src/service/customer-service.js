/*
* @Author: UsingLove
* @Date:   2017-11-14 16:39:30
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-16 09:42:43
*/

'use strict';

var _mm = require('util/mm.js');

var _customer_service = {
    // 获取全部售后信息
    getServiceList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/customer_service/list'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 删除服务
    deleteService : function(serviceId, orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/customer_service/delete'), 
            data    : {
                id      : serviceId,
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 添加服务
    addSerive : function(orderNo,title,mainContent, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/customer_service/add'), 
            data    : {
                orderNo  : orderNo,
                title  : title,
                mainContent  : mainContent
            },
            success : resolve,
            error   : reject
        });
    },
    // 更新服务
    editService : function(serviceId,title,mainContent, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/customer_service/update'), 
            data    : {
                id          : serviceId,
                title       : title,
                mainContent : mainContent
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _customer_service;