/* globals angular */
(function() {
    'use strict';

    angular
        .module('angularJSTypedEffect', [])
        .directive('typedEffect', typedEffect);

    typedEffect.$inject = ['$interval', '$timeout'];

    function typedEffect($interval, $timeout) {
        var directive = {
            restrict: 'A',
            scope: {
                text: '<',
                callback: '&'
            },
            link: link
        };

        return directive;

        function link(scope, element, attrs) {
            var i = 0, interval,
                text = scope.text || '',
                delay = parseInt(attrs.delay) || 0,
                speed = parseInt(attrs.speed) || 100,
                cursor = attrs.cursor || '|',
                blink = attrs.blink ? attrs.blink === 'true' : true;

            cursor = angular.element('<span>' + cursor + '</span>');

            $timeout(typeText, delay);

            function typeText() {
                typeChar();
                interval = $interval(typeChar, speed);

                function typeChar() {
                    if (i <= text.length) {
                        element.html(text.substring(0, i)).append(cursor);
                        i++;
                    } else {
                        $interval.cancel(interval);

                        if (blink) {
                            cursor.addClass('blink');
                        } else {
                            cursor.remove();
                        }

                        if (attrs.callback) {
                            scope.callback();
                        }
                    }
                }
            }
        }
    }
})();
