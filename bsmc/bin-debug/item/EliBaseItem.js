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
var EliBaseItem = (function (_super) {
    __extends(EliBaseItem, _super);
    function EliBaseItem(finalX, finalY, res, index) {
        var _this = _super.call(this) || this;
        _this.finalX = finalX;
        _this.finalY = finalY;
        _this.index = index;
        _this.texture = RES.getRes(res);
        _this.x = finalX;
        _this.y = 0;
        _this.anchorOffsetX = _this.width * 0.5;
        _this.anchorOffsetY = _this.height * 0.5;
        return _this;
    }
    /*
    **掉落
    */
    EliBaseItem.prototype.drop = function () {
        var _this = this;
        return new Promise(function (resolve) {
            egret.Tween.get(_this)
                .to({ y: _this.finalY + 10 }, 300, egret.Ease.sineIn)
                .to({ y: _this.finalY - 10 }, 50, egret.Ease.sineIn)
                .to({ y: _this.finalY }, 50, egret.Ease.sineIn)
                .call(resolve);
        });
    };
    return EliBaseItem;
}(egret.Bitmap));
__reflect(EliBaseItem.prototype, "EliBaseItem");
//# sourceMappingURL=EliBaseItem.js.map