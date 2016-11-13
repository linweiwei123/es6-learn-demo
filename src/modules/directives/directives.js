/**
 * Created by yitala on 2016/11/13.
 */
angular.module('es6-templateString',[])
    .directive('selfIntroduce',function () {
        return{
            restrict:'E',
            replace:'true',
            template:require('./selfIntroduce.html'),
            controller:function ($scope) {
                var my = {name:'lww',age:27};

                //es6 插值，表达式，计算机
                $scope.content = `My name is ${my.name},
                            i am ${my.age+1} years old!,
                my mum is ${calAge(my.age)}`;

                function calAge(age) {
                    return age+24;
                }

                //嵌套
                $scope.myword = `this is my word: ${$scope.content}`;

                //jsonStr
                $scope.jsonStr = `this is the json: ${my.toString()}`;

                //特殊符号
                $scope.specialQuote = `this is the specialQuote: \` $ {`;
            }
        }
    });