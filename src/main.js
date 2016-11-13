/**
 * Created by yitala on 2016/11/13.
 */
var angular = require('angular');
require('angular-route');
var $ = require('jquery');
require('./asserts/css/bootstrap.css');
require('./asserts/css/basic.css');
require('./asserts/css/iconfont.css');
require('./asserts/css/layout.css');
require('./asserts/css/component.css');
require('./asserts/css/pages.css');
require('./modules/directives/directives');

var app = angular.module("es6-app",['ngRoute','es6-templateString'])
.config(['$routeProvider',function($routeProvider){

    $routeProvider
        .when('/home',{
            template:require('./modules/home/home.html'),
            controller:'HomeController'
        })
        .when('/forOf',{
            template:require('./modules/forOf/forOf.html'),
            controller:'ForOfController'
        })
        .when(
            '/templateString',{
                template:require('./modules/templateString/templateString.html'),
                controller:'templateStringCtrl'
            }
        )
        .when(
            '/restParameters',{
                template:require('./modules/restParameters/restParameters.html'),
                controller:'restParametersCtrl'
            }
        )
        .otherwise({
            redirectTo:'/home'
        })

}]);
app.controller("ForOfController",function($scope){
    const presidents = ['aobama','trump','cliton'];
    const presidentsVotes= [];
    const presidentsVotesTillTrump = [];

    //(1) 数组的内建遍历方法
    presidents.forEach(function (value) {
        let votes = Math.floor(Math.random()*100+1);
        presidentsVotes.push({'name':value,'votes':votes});
    });

    //(2) 遍历数组的正确方式 for of，遍历对象用for in
    for(var value of presidents){

        var votes = Math.floor(Math.random()*100+1);
        presidentsVotesTillTrump.push({'name':value,'votes':votes});
        if(value == 'trump'){
            break;
        }
    }
    $scope.presidentsVotes = presidentsVotes;
    $scope.presidentsVotesTillTrump = presidentsVotesTillTrump;

    //(3) Set 与Map相似，区别：只有Key，没有Value
    var presidentSet = new Set(presidents);
    console.log(presidentSet);

    //(4) map与java中的map一样
    var presidentMap = new Map();
    for(var president of presidentsVotes){
        presidentMap.set(president.name,president.votes);
    }
    $scope.presidentMap = presidentMap;
    //(5) map解构
    for( var[K,V] of presidentMap){
        console.log(K + " got " + V + " votes! ");
    }
    $scope.votes = "please chooce a president!";
    $scope.showVotes = function (name) {
        console.log(name);
        $scope.votes = name + " got " + $scope.presidentMap.get(name) + "!";
    }


}).controller('templateStringCtrl',function ($scope) {
        var myname= "黑客Steve<script>alert('xss');</script>";
        //自己实现的标签，用来转化特殊字符，防止攻击
        var mynameHtml = mSaferHTML`<h3>input my name!</h3><span>${myname}</span>`;
        $("#myname").html(mynameHtml);

        function mSaferHTML(templateData) {
            var s = templateData[0];
            for (var i = 1; i < arguments.length; i++) {
                var arg = String(arguments[i]);

                // 转义占位符中的特殊字符。
                s += arg.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

                // 不转义模板中的特殊字符。
                s += templateData[i];
            }
            return s;
        }
}).controller('restParametersCtrl',function ($scope) {
    //不定参数
    function isContained(s,...contents) {
        for(var value of contents){
            if(s.indexOf(value)==-1){
                return false;
            }
        }
        return true;
    }
    $scope.hasContain = isContained('aobama','ao','ba','aobama');
    $scope.hasContain2 = isContained('aobama','a');
    $scope.hasContain3 = isContained('aobama','bb');

    //默认参数
    function shopping(fisrtBuy="shoes",secondBuy="clothes") {
        return `at 11.11,i will buy ${fisrtBuy} and ${secondBuy}!`;
    }
    function isShoppedShoes(firstBuy="shoes",secondBuy=cal(firstBuy)){
        return `at 11.11,i will buy ${firstBuy} and ${secondBuy}!`;
    }
    function cal(firstBuy){
        if(firstBuy=="fake product"){
            return "stop shoping!"
        }
        else return "皮衣";
    }
    $scope.cart1 = shopping();
    $scope.cart2 = shopping("公牛世家皮鞋");
    $scope.cart3 = shopping("公牛世家皮鞋","斯密特西服");
    $scope.cart4 = isShoppedShoes("fake product");

})