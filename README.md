##Scope.js
 A mini framework inspired by angularjs scope object.
 One of the most powerful feature of angularjs is its data-binding and dirty-checking mechanism.
 This framework covers *dirty-checking* which is also the cause of *data-binding*.

 The framewokr implements these four main areas of functionality:
 
1.**Scope inheritance**->creating scope hierarchies for sharing data and events.

2.**Dirty checking**->checking for changes in data and calling the appropriate listeners.

3.**Evaluating functions**->Evaluating the functions with the current scope.

4.**Destroying watches**->Abilty to destroy active watches.


#### How is it build?
 The framework is developed in implemented using plain javascript,using no external liberaries.
 It is developed in a TDD enviorment,using jasmine-karma for writting and executing test cases.

#### How to install?
`bower install scope.js`

#### API Documentation
 1.Scope()-> A constructor function for creating new scope objects.
 eg `var scope = new Scope();`

 2.$watch(watchFn,listenerFn)->Method for watching changes in a function,and calling the registered listener.
 eg
```
scope.firstName = 'abc';
 scope.counter = 0;
 var watchFn = function(scope){
 return scope.firstName;
 }
var listenerFn = function(oldValue,newValue,scope){`
return counter++;
}
scope.$watch(watchFn,listenerFn);
```

3)$digest()->Iterates over all the watches that has been registered on the current scope.
If the watch value is changed the corresponding listener functions will be called.
  `scope.$digest();`

4)$eval()->Evaluates the code in the context of a Scope
eg
``` 
scope.value = 100;
var result = scope.$eval(function (scope, arg) {
return (scope.value + arg);
}, 10);
```

5)$apply()->Executest external code or function passed to $apply() using $eval() and then calls $digest();

The detailed documention can be found on [on my blog](http://atishaybaid.blogspot.in/2015/08/angularinternals-scopejs.html)


