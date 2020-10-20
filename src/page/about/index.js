/*
* @Author: UsingLove
* @Date:   2017-11-14 14:34:04
* @Last Modified by:   UsingLove
* @Last Modified time: 2017-11-14 14:46:39
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');

// page逻辑部分
var page = {
    init : function(){
        this.onload();
    },
    onload : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'about'
        });
    }
};
$(function(){
    page.init();
});