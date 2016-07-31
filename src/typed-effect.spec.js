'use strict';

describe('Unit test the typed effect directive', function() {
    var $compile, $rootScope, $timeout, $interval, element, isolateScope;

    beforeEach(module('angularJSTypedEffect'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$interval_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $interval = _$interval_;
    }));

    it('should correctly apply a typed effect without customisations', function() {
        element = $compile('<p typed-effect text="\'hi there\'"></p>')($rootScope);

        isolateScope = element.isolateScope();

        expect(isolateScope.text).toBeDefined();
        expect(isolateScope.text).toEqual('hi there');

        $rootScope.$digest();

        // Check that the element is initially empty.
        expect(element.html()).toEqual('');

        // Check the cursor is then added to the element.
        $timeout.flush(0);
        expect(element.html()).toEqual('<span>|</span>');

        // Check that text is typed out at the default speed.
        $interval.flush(100);
        expect(element.html()).toEqual('h<span>|</span>');
        $interval.flush(700);
        expect(element.html()).toEqual('hi there<span>|</span>');

        // Check the blinking effect is then added to the cursor.
        $interval.flush(100);
        expect(element.html()).toEqual('hi there<span class="blink">|</span>');

        // Check the cursor continues to persist after typing has finished.
        $interval.flush(1000);
        expect(element.html()).toEqual('hi there<span class="blink">|</span>');
    });

    it('should correctly apply a typed effect with customisations', function() {
        var scope = $rootScope.$new();

        scope.typed = function() {};

        spyOn(scope, 'typed');

        element = $compile('<p typed-effect text="\'hi there\'" delay="500" speed="50" cursor="&blk14;" blink="false" callback="typed()"></p>')(scope);

        isolateScope = element.isolateScope();

        expect(isolateScope.text).toBeDefined();
        expect(isolateScope.text).toEqual('hi there');

        expect(element.attr('delay')).toBeDefined();
        expect(parseInt(element.attr('delay'))).toEqual(500);

        expect(element.attr('speed')).toBeDefined();
        expect(parseInt(element.attr('speed'))).toEqual(50);

        expect(element.attr('cursor')).toBeDefined();
        expect(element.attr('cursor')).toEqual('░');

        expect(element.attr('blink')).toBeDefined();
        expect(element.attr('blink') === 'true').toBeFalsy();

        expect(isolateScope.callback).toBeDefined();

        scope.$digest();

        // Check that the element is initially empty.
        expect(element.html()).toEqual('');

        // Check that typing doesn't start until after specified delay.
        $timeout.flush(400);
        expect(element.html()).toEqual('');

        // Check after specified delay that the custom cursor is added to the element.
        $timeout.flush(500);
        expect(element.html()).toEqual('<span>░</span>');

        // Check that text is typed out at the custom speed defined.
        $interval.flush(50);
        expect(element.html()).toEqual('h<span>░</span>');
        $interval.flush(350);
        expect(element.html()).toEqual('hi there<span>░</span>');

        // Check callback function isn't triggered before typing has finished.
        expect(scope.typed).not.toHaveBeenCalled();

        // Check the cursor is removed after typing has finished.
        $interval.flush(50);
        expect(element.html()).toEqual('hi there');

        // Check callback function is triggered after typing has finished.
        expect(scope.typed).toHaveBeenCalled();
    });

    it('should gracefully handle the required text attribute being omitted', function() {
        element = $compile('<p typed-effect></p>')($rootScope);

        isolateScope = element.isolateScope();

        expect(isolateScope.text).toBeUndefined();

        $rootScope.$digest();

        // Check that the element is initially empty.
        expect(element.html()).toEqual('');

        // Check the cursor is then added to the element.
        $timeout.flush(0);
        expect(element.html()).toEqual('<span>|</span>');

        // Check the blinking effect is then added to the cursor since there is no text to type.
        $interval.flush(100);
        expect(element.html()).toEqual('<span class="blink">|</span>');

        // Check the cursor continues to persist.
        $interval.flush(1000);
        expect(element.html()).toEqual('<span class="blink">|</span>');
    });
});
