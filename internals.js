function Scope() {
    this.$$watches = [];
};


Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn
    };
    this.$$watches.push(watcher);
};



Scope.prototype.$digest = function(){
    var that = this;
    this.$$watches.forEach(function(watcher){
        
        
        var oldValue = watcher.last;
        var newValue = watcher.watchFn(that);
        
        if(newValue!=oldValue){
            watcher.listenerFn(oldValue,newValue,that);
            watcher.last = newValue;
        }
        oldValue = newValue;
        
    });
}



var scope = new Scope();
scope.firstName = 'ram';

scope.$watch(function(scope){return scope.firstName},function(oldValue,newValue,self){console.log("listner called")});
scope.$digest();

scope.$digest();


scope.$digest();



scope.firstName = 'raj';

scope.$digest();
