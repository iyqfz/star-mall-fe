/*
* @Author: UsingLove
* @Date:   2017-11-14 14:53:59
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-12-04 11:25:59
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm                         = require('util/mm.js');
var navSide                     = require('page/common/nav-side/index.js');
var _customer_service           = require('service/customer-service.js');
var Pagination                  = require('util/pagination/index.js');
var templateIndex               = require('./index.string');

// page逻辑部分
var page = {
    data : {
        listParam : {
            pageNum     : 1,
            pageSize    : 2
        }
    },
    init : function(){
        this.onload();
        this.loadServiceList();
        this.bindEvent();
    },
    onload : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'customer-service'
        });
    },
    loadServiceList : function(){
        var _this               = this,
            serviceListHtml     = '',
            $serviceList        = $('.customer-service-list');
        $serviceList.html('<div class="loading"></div>');
        _customer_service.getServiceList(_this.data.listParam, function(res){
            _this.dataFileter(res);
            serviceListHtml = _mm.renderHtml(templateIndex, res);
            $serviceList.html(serviceListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },function(errMsg){
            $serviceList.html('<p class="err-tip">加载失败，请刷新后重试</p>'); 
        });
    },
    bindEvent : function(){
        var _this = this;
        // 撤销服务
        $(document).on('click','.delete-btn',function(){
            if(window.confirm('确实要删除该订单服务吗？')){
                var serviceId = $(this).parents('.list-item').data('service-id');
                var orderNumber = $(this).parents('.list-item').data('order-no');

                _customer_service.deleteService(serviceId, orderNumber, function(res){
                    _mm.successTips('该服务删除成功');
                    _this.loadServiceList();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
        // 编辑服务
        $(document).on('click','.edit-btn',function(){
            var title = $('.service-title').text();
            var mainContent = $('.service-main-content').text();
            var serviceId = $(this).parents('.list-item').data('service-id');
            var orderNumber = $(this).parents('.list-item').data('order-no');

            window.location.href = './customer-service-form.html?orderNumber=' + orderNumber + '&serviceId='+ serviceId + '&title=' + title + '&mainContent=' + mainContent;
        });
    },
    // 数据的适配
    dataFileter : function(data){
        var _this = this;
        $.each(data.list, function(index, val){
            data.list[index].createTime = _this.format(val.createTime);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadServiceList();
            }
        }));
    },
    // 时间戳转换
    format : function(timestamp){
        //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
        var time    = new Date(timestamp);
        var year    = time.getFullYear();
        var month   = time.getMonth()+1;
        var date    = time.getDate();
        var hours   = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        return year+'-'+this.add0(month)+'-'+this.add0(date)+' '+this.add0(hours)+':'+this.add0(minutes)+':'+this.add0(seconds);
    },
    add0 : function (m){
        return m<10?'0'+m:m 
    }
};
$(function(){
    page.init();
});