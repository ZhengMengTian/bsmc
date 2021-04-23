var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EUIButton = (function () {
    function EUIButton() {
    }
    Object.defineProperty(EUIButton.prototype, "TOUCH_ENABLE", {
        get: function () { return this.objBtn.touchEnabled; },
        set: function (enable) { this.objBtn.touchEnabled = enable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EUIButton.prototype, "ENABLE", {
        get: function () { return this.objBtn.touchEnabled; },
        set: function (enable) {
            this.objBtn.touchEnabled = enable;
            if (enable == true)
                this.objBtn.filters = null;
            else
                this.objBtn.filters = EUIButton.grayFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EUIButton.prototype, "VISIBLE", {
        get: function () { return this.objBtn.visible; },
        set: function (visible) { this.objBtn.visible = visible; },
        enumerable: true,
        configurable: true
    });
    EUIButton.Create = function (objBtn, touchScale) {
        if (touchScale === void 0) { touchScale = 1.1; }
        if (!objBtn)
            return null;
        var btn = EUIButton.s_dicButton[objBtn.hashCode];
        if (btn != null)
            return btn;
        btn = new EUIButton();
        btn.objBtn = objBtn;
        btn.normalScaleX = objBtn.scaleX;
        btn.normalScaleY = objBtn.scaleY;
        btn.touchScaleX = btn.normalScaleX * touchScale;
        btn.touchScaleY = btn.normalScaleY * touchScale;
        btn.objBtn.touchEnabled = true;
        btn.objBtn.addEventListener(egret.Event.REMOVED, EUIButton.onRemoved, EUIButton);
        btn.objBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, EUIButton.onTouchTap, EUIButton);
        btn.objBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, EUIButton.onTouchBegin, EUIButton);
        EUIButton.s_dicButton[btn.objBtn.hashCode] = btn;
        return btn;
    };
    EUIButton.Clean = function () {
        var btn;
        for (var uid in EUIButton.s_dicButton) {
            btn = EUIButton.s_dicButton[uid];
            if (btn && btn.objBtn) {
                btn.objBtn.removeEventListener(egret.Event.REMOVED, EUIButton.onRemoved, EUIButton);
                btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, EUIButton.onTouchTap, EUIButton);
                btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, EUIButton.onTouchBegin, EUIButton);
                btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
                btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
                btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
                btn.objBtn.parent && btn.objBtn.parent.removeChild(btn.objBtn);
            }
        }
        EUIButton.s_dicButton = {};
    };
    EUIButton.onRemoved = function (event) {
        var btn = EUIButton.s_dicButton[event.currentTarget.hashCode];
        if (btn && btn.objBtn) {
            btn.objBtn.removeEventListener(egret.Event.REMOVED, EUIButton.onRemoved, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, EUIButton.onTouchTap, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, EUIButton.onTouchBegin, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
        }
        delete EUIButton.s_dicButton[event.currentTarget.hashCode];
    };
    EUIButton.onTouchTap = function (event) {
        // console.log ("onTouchTap");
        var btn = EUIButton.s_dicButton[event.currentTarget.hashCode];
        if (btn && btn.objBtn.touchEnabled == true && btn.onClick)
            btn.onClick.apply(btn.onClickObj, btn.onClickParams);
    };
    EUIButton.onTouchBegin = function (event) {
        // console.log ("onTouchBegin");
        var btn = EUIButton.s_dicButton[event.currentTarget.hashCode];
        if (btn && btn.objBtn.touchEnabled == true) {
            btn.objBtn.scaleX = btn.touchScaleX;
            btn.objBtn.scaleY = btn.touchScaleY;
            btn.objBtn.addEventListener(egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
            btn.objBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
            btn.objBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
            if (btn.onPress)
                btn.onPress.apply(btn.onPressObj, btn.onPressParams);
        }
    };
    EUIButton.onTouchEnd = function (event) {
        // console.log ("onTouchEnd");
        var btn = EUIButton.s_dicButton[event.currentTarget.hashCode];
        if (btn) {
            btn.objBtn.scaleX = btn.normalScaleX;
            btn.objBtn.scaleY = btn.normalScaleY;
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
        }
    };
    EUIButton.onTouchCancel = function (event) {
        // console.log ("onTouchCancel");
        var btn = EUIButton.s_dicButton[event.currentTarget.hashCode];
        if (btn) {
            btn.objBtn.scaleX = btn.normalScaleX;
            btn.objBtn.scaleY = btn.normalScaleY;
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
        }
    };
    EUIButton.onTouchReleaseOutside = function (event) {
        // console.log ("onTouchReleaseOutside");
        var btn = EUIButton.s_dicButton[event.currentTarget.hashCode];
        if (btn) {
            btn.objBtn.scaleX = btn.normalScaleX;
            btn.objBtn.scaleY = btn.normalScaleY;
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
            btn.objBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
        }
    };
    EUIButton.prototype.SetOnPress = function (callback, callObj, params) {
        this.onPress = callback;
        this.onPressObj = callObj;
        this.onPressParams = params;
    };
    EUIButton.prototype.SetOnClick = function (callback, callObj, params) {
        this.onClick = callback;
        this.onClickObj = callObj;
        this.onClickParams = params;
    };
    EUIButton.s_dicButton = {};
    EUIButton.s_grayColorMatrixFilter = new egret.ColorMatrixFilter([0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0]);
    EUIButton.grayFilters = [EUIButton.s_grayColorMatrixFilter];
    return EUIButton;
}());
__reflect(EUIButton.prototype, "EUIButton");
//# sourceMappingURL=EUIButton.js.map