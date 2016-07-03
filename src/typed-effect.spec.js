describe('Unit test the typed effect directive', function() {
    var $compile, $rootScope, $timeout, $interval;

    beforeEach(module('angularJSTypedEffect'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$interval_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $interval = _$interval_;
    }));

    it('should correctly apply a typed effect without customisations', function() {
        var element = $compile('<p typed-effect text="\'hi there\'"></p>')($rootScope);

        var isolateScope = element.isolateScope();

        expect(isolateScope.text).toBeDefined();
        expect(isolateScope.text).toEqual('hi there');

        $rootScope.$digest();

        // Check that the element is initially empty.
        expect(element.html()).toEqual('');

        // Check the cursor is then added to the element.
        $timeout.flush();
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
        var element = $compile('<p typed-effect text="\'hi there\'" delay="2000" speed="50" cursor="&blk14;" blink="false"></p>')($rootScope);

        var isolateScope = element.isolateScope();

        expect(isolateScope.text).toBeDefined();
        expect(isolateScope.text).toEqual('hi there');

        expect(element.attr('delay')).toBeDefined();
        expect(parseInt(element.attr('delay'))).toEqual(2000);

        expect(element.attr('speed')).toBeDefined();
        expect(parseInt(element.attr('speed'))).toEqual(50);

        expect(element.attr('cursor')).toBeDefined();
        expect(element.attr('cursor')).toEqual('░');

        expect(element.attr('blink')).toBeDefined();
        expect(element.attr('blink') === 'true').toBeFalsy();

        $rootScope.$digest();

        // Check that the element is initially empty.
        expect(element.html()).toEqual('');

        // Check after specified delay that the custom cursor is added to the element.
        $timeout.flush();
        expect(element.html()).toEqual('<span>░</span>');

        // Check that text is typed out at the custom speed defined.
        $interval.flush(50);
        expect(element.html()).toEqual('h<span>░</span>');
        $interval.flush(350);
        expect(element.html()).toEqual('hi there<span>░</span>');

        // Check the cursor is removed after typing has finished.
        $interval.flush(50);
        expect(element.html()).toEqual('hi there');
    });

    it('should gracefully handle the required text attribute being omitted', function() {
        var element = $compile('<p typed-effect></p>')($rootScope);

        var isolateScope = element.isolateScope();

        expect(isolateScope.text).toBeUndefined();

        $rootScope.$digest();

        // Check that the element is initially empty.
        expect(element.html()).toEqual('');

        // Check the cursor is then added to the element.
        $timeout.flush();
        expect(element.html()).toEqual('<span>|</span>');

        // Check the blinking effect is then added to the cursor since there is no text to type.
        $interval.flush(100);
        expect(element.html()).toEqual('<span class="blink">|</span>');

        // Check the cursor continues to persist.
        $interval.flush(1000);
        expect(element.html()).toEqual('<span class="blink">|</span>');
    });
});
