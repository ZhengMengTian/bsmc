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
var BrickItem = (function (_super) {
    __extends(BrickItem, _super);
    function BrickItem(level, x, y) {
        var _this = _super.call(this) || this;
        if (level == 3)
            _this.texture = RES.getRes("main_json.h5by_xyx_xbs");
        else
            _this.texture = RES.getRes("main_json.gem_brick01_01");
        _this.x = x;
        _this.y = y;
        _this.anchorOffsetX = _this.width * 0.5;
        _this.anchorOffsetY = _this.height * 0.5;
        _this.visible = true;
        return _this;
    }
    return BrickItem;
}(egret.Bitmap));
__reflect(BrickItem.prototype, "BrickItem");
//# sourceMappingURL=BrickItem.js.map