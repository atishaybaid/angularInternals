function Scope() {
    this.$$watchers = [];
};


var initialRtnValue = function () {};


Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watch = {
        watchFn: watchFn,
        listenerFn: listenerFn,
        previousValue: initialRtnValue

    };

    this.$$watchers.push(watch);
    this.$lastDirtyWatch = null;


};

Scope.prototype.$digestOnce = function () {
    dirty = false;
    var self = this;

    this.$$watchers.forEach(function (watch) {
        var oldValue, newValue;

        oldValue = watch.previousValue;
        newValue = watch.watchFn(self);

        if (oldValue != newValue) {
            watch.previousValue = newValue;
            watch.listenerFn(oldValue, newValue, self);
            dirty = true;
            this.$lastDirtyWatch = watch;
        }



    });

    return dirty;

};


Scope.prototype.$digest = function () {
    var dirty;
    var limit = 10;
    do {
        limit--;

        dirty = this.$digestOnce();

        if (dirty && !(limit)) {
            throw "10 digest iterations reached";
        }


    } while (dirty);
}


Scope.prototype.$eval = function(evalExp,arg){
    var value = evalExp(this,arg);

    return value;

}


Scope.prototype.$apply = function(expr){
    try{
    this.$eval(expr);
    } finally {
        this.$digest();
    }
}
