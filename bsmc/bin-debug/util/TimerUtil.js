var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TimerUtil = (function (_super) {
    __extends(TimerUtil, _super);
    function TimerUtil() {
        return _super.call(this) || this;
    }
    TimerUtil.wait = function (time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    };
    return TimerUtil;
}(egret.HashObject));
__reflect(TimerUtil.prototype, "TimerUtil");
//# sourceMappingURL=TimerUtil.js.map