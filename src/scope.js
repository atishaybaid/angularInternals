function Scope() {
    this.$$watchers = [];
};



Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watch = {
        watchFn: watchFn,
        listenerFn: listenerFn,
        previousValue: ''
    };

    this.$$watchers.push(watch);


};


Scope.prototype.$digest = function () {
    var self = this;
    this.$$watchers.forEach(function (watch) {
        var oldValue, newValue;

        oldValue = watch.previousValue;
        newValue = watch.watchFn(self);

        if (oldValue != newValue) {
            watch.previousValue = newValue;
            watch.listenerFn(oldValue,newValue,self)
        }



    });
};


