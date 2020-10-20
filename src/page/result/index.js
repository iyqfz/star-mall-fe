/*
* @Author: UsingLove
* @Date:   2017-09-24 10:28:34
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-10-26 11:20:12
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示元素
    $element.show();
})