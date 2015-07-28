describe('Test cases for scope', function () {
    it('Global scope object should exists', function () {
        var scope = new Scope();
        expect(scope).toBeDefined();



    });

    describe('Test cases for $digest', function () {
        var scope;

        beforeEach(function () {
            scope = new Scope();
        });
        it('call the listner function of watch', function () {
            var watchFn = function () {};

            var listenerFn = jasmine.createSpy();

            scope.$watch(watchFn, listenerFn);
            scope.$digest();
            expect(listenerFn).toHaveBeenCalled();


        });

        it('call the watch function scope as the argument', function () {

            var watchFn = jasmine.createSpy();
            var listnerFn = function () {};

            scope.$watch(watchFn, listnerFn);
            scope.$digest();
            expect(watchFn).toHaveBeenCalled();


        });

        it('call listener function when watch value changes ', function () {

            scope.firstName = 'abc';
            scope.counter = 0;
            var watchFn = function (scope) {
                return scope.firstName;
            };

            var listenerFn = function(oldValue,newValue,scope){
                scope.counter++;
            }

            scope.$watch(watchFn,listenerFn);
            scope.$digest();
            expect(scope.counter).toBe(1);

             scope.$digest();
            expect(scope.counter).toBe(1);

            scope.firstName = 'xyz';
            scope.$digest();
            expect(scope.counter).toBe(2);






        });

    })


})
