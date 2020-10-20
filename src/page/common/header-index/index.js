/*
* @Author: UsingLove
* @Date:   2017-11-08 18:41:37
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-09 21:29:40
*/

'use strict';
require('./index.css');
var _mm     = require('util/mm.js');
var _cart   = require('service/cart-service.js');
// 通用页面头部
var header = {
    init : function(){
        this.onLoad();
        this.loadCartCount();
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        // keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        // 点击搜索按钮以后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    // 搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候有keyword,正常跳转到list页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        // 如果keyword为空，直接返回首页
        else{
            _mm.goHome();
        }
    },
    // 加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.my-cart .cart-count').text(res || 0);
        }, function(errMsg){
            $('.my-cart .cart-count').text(0);
        });
    }
};

header.init();