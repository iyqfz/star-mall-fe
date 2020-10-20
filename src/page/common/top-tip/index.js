/*
* @Author: UsingLove
* @Date:   2017-11-07 09:24:51
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-07 11:38:32
*/

'use strict';

require('./index.css');

// 通用页面头部
var topTip = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        $('.remove-top-tip').click(function(){
            $('.top-tip-wrap').css('display','none');
        });
    } 
};

topTip.init();