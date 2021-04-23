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
var EliNormalItem = (function (_super) {
    __extends(EliNormalItem, _super);
    function EliNormalItem(x, y) {
        var _this = this;
        //随机颜色算法
        var eliProp = GameConfig.eliProp;
        var random = Math.random();
        var sum = 0;
        var index = 0;
        for (var i = 0; i < eliProp.length; i++) {
            sum += eliProp[i];
            index = i;
            if (sum >= random)
                break;
        }
        _this = _super.call(this, x, y, GameConfig.eliResourceArr[index], index) || this;
        return _this;
    }
    return EliNormalItem;
}(EliBaseItem));
__reflect(EliNormalItem.prototype, "EliNormalItem");
//# sourceMappingURL=EliNormalItem.js.map