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
var eventUtil = (function () {
    function eventUtil() {
    }
    eventUtil.addEventListener = function (target, event, cb, caller) {
        var callBack;
        if (event === egret.TouchEvent.TOUCH_BEGIN) {
            callBack = function (evt) {
                evt.currentTarget.scaleX = evt.currentTarget.scaleY = 1.1;
                cb.call(this);
            };
        }
        else {
            callBack = cb;
        }
        var remember = new EventRemember(target, event, cb, callBack, caller);
        eventUtil.evtPool[remember.myEvtId] = remember;
        target.addEventListener(event, callBack, caller);
    };
    eventUtil.removeEventListener = function (target, event, cb, caller) {
        var key = eventUtil.getRememberKey(target, event, cb, caller);
        if (key) {
            var remember = eventUtil.evtPool[key];
            target.removeEventListener(remember.event, remember.cb2, remember.caller);
            delete eventUtil.evtPool[key];
        }
    };
    eventUtil.getRememberKey = function (target, event, cb, caller) {
        for (var key in eventUtil.evtPool) {
            var remember = eventUtil.evtPool[key];
            if (remember.target === target && remember.event === event && remember.cb === cb && remember.caller === caller) {
                return key;
            }
        }
        return null;
    };
    eventUtil.evtPool = {};
    return eventUtil;
}());
__reflect(eventUtil.prototype, "eventUtil");
var EventRemember = (function (_super) {
    __extends(EventRemember, _super);
    function EventRemember(target, evt, cb, cb2, caller) {
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.evt = evt;
        _this.cb = cb;
        _this.cb2 = cb2;
        _this.caller = caller;
        _this.myEvtId = EventRemember.evtId++;
        return _this;
    }
    EventRemember.evtId = 10000;
    return EventRemember;
}(egret.HashObject));
__reflect(EventRemember.prototype, "EventRemember");
//# sourceMappingURL=eventUtil.js.map