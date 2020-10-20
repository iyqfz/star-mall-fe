/*
* @Author: UsingLove
* @Date:   2017-09-23 08:32:39
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-09 21:25:41
*/

'use strict';
require('./index.css');
require('page/common/top-tip/index.js');
require('page/common/nav-index/index.js');
require('page/common/header-index/index.js');
require('util/slider/index.js'); 
var templateBanner  = require('./banner.string');
var _mm             = require('util/mm.js'); 
 
 $(function(){
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
 });