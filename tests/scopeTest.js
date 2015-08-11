    describe('Test cases for scope', function () {
        it('Global scope object should exists', function () {
            var scope = new Scope();
            expect(scope).toBeDefined();

        });

         var scope;

            beforeEach(function () {
                scope = new Scope();
            });

        describe('Test cases for $digest', function () {

            it('call the listner function of watch', function () {
                var watchFn = function () {};

                var listenerFn = jasmine.createSpy();

                scope.$watch(watchFn, listenerFn);
                scope.$digest();
                expect(listenerFn).toHaveBeenCalled();

            });

            it('call the watch function with scope as the argument', function () {

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

                var listenerFn = function (oldValue, newValue, scope) {
                    scope.counter++;
                }

                scope.$watch(watchFn, listenerFn);
                scope.$digest();
                expect(scope.counter).toBe(1);

                scope.$digest();
                expect(scope.counter).toBe(1);

                scope.firstName = 'xyz';
                scope.$digest();
                expect(scope.counter).toBe(2);

            });


            it('call the listener for the undefined values also', function () {
                scope.counter = 0;
                var watchFn = function (scope) {
                    return scope.value;
                };

                var listenerFn = function (oldValue, newValue, scope) {
                    scope.counter++
                };

                scope.$watch(watchFn, listenerFn);
                scope.$digest();
                expect(scope.counter).toBe(1);

            });


            it('triggers chained watchers in the same digest',function(){
                 scope.firstName = 'abc';
                 scope.lastName = 'xyz';
                 scope.counter = 0;

                  var watchFn = function (scope) {
                     return scope.firstName;
                 };

                 var listenerFn = function (oldValue, newValue, scope) {scope.counter++};

                  scope.$watch(watchFn,listenerFn);


                 var watchFn2 = function (scope) {
                     return scope.lastName;
                 };

                 var listenerFn2 = function (oldValue, newValue, scope) {scope.firstName = 'abcd'};

                 scope.$watch(watchFn2,listenerFn2);

                 scope.$digest();


                 expect(scope.counter).toBe(2);

             });

            it('throw exception when digest cycle exceeds 10 runs',function(){
                scope.counter1 = 0;
                scope.counter2 = 0;

                var watchfn = function(scope){
                    return scope.counter1;
                };

                var listenerfn = function(oldValue,newValue,scope){
                    scope.counter2++;
                };

                scope.$watch(watchfn,listenerfn);

                var watchfn2 = function(scope){
                    return scope.counter2;
                };

                var listenerfn2 = function(oldValue,newValue,scope){
                    scope.counter1++;
                };

                scope.$watch(watchfn2,listenerfn2);

                expect((function() { scope.$digest(); })).toThrow();


            });


            xit('ends the diget cycle when last watch is clean',function(){

                var loopExecution = 0;
                scope.arr =[1,2];


                    var watchFn = function(scope){
                        loopExecution++;
                        return scope.arr[0];

                    }

                    var listenerFn = function(oldValue,newValue,scope){};
                    scope.$watch(watchFn,listenerFn);


                 var watchFn2 = function(scope){
                        loopExecution++;
                        return scope.arr[1];

                    }

                    var listenerFn2 = function(oldValue,newValue,scope){};

                scope.$watch(watchFn2,listenerFn2);





                scope.$digest();
                expect(loopExecution).toBe(4);

                scope.arr[0]=5;
                scope.$digest();

                expect(loopExecution).toBe(7);

            });
        });

        describe('test case for $eval()',function(){
            it('executes the function when passed to $eval',function(){

                scope.value = 100;

                var result = scope.$eval(function(scope){
                    return scope.value
                });

                expect(result).toBe(100);

            });

            it('passes the second argument to $eval() straight',function(){
               scope.value = 100;


                var result = scope.$eval(function(scope,arg){
                    return (scope.value+arg);
                },10);

                expect(result).toBe(110);

            });

        });

        describe('test case for $apply()',function(){
            it('executes function passed in $apply and calls $digest()',function(){

                scope.firstName = 'ABC';
                scope.counter = 0;

                var watchFn = function(scope){
                    return scope.firstName;
                };

                var listenerFn = function(oldValue,newValue,scope){
                    scope.counter++;
                };


                scope.$watch(watchFn,listenerFn);
                scope.$digest();

                expect(scope.counter).toBe(1);

                scope.$apply(function(scope){
                scope.firstName = 'xyz';
                });


                expect(scope.counter).toBe(2);



            });
        })

    })
