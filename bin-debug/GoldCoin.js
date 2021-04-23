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
var GoldCoin = (function (_super) {
    __extends(GoldCoin, _super);
    function GoldCoin(x, y, initGoldCoin) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.goldCoin = initGoldCoin;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GoldCoin.prototype.init = function () {
        this.removeChildren();
        var arr = this.goldCoin.toString().split('');
        var spriteSheet = RES.getRes("goldCoin_json");
        var space = 40;
        // 添加背景框
        var texture = RES.getRes('h5by_xyx_jbdb-_png');
        var bg = this.createBitmapByTexture(texture, 0, -5);
        bg.width *= 6;
        bg.height *= 1.2;
        // 添加金币图形
        texture = spriteSheet.getTexture('coin');
        this.createBitmapByTexture(texture, 10, 0, 0.4);
        // 添加数字
        for (var i = 0; i < arr.length; i++) {
            texture = spriteSheet.getTexture(arr[i]);
            space += this.createBitmapByTexture(texture, space, 0, 0.3).width * 0.3;
        }
    };
    // 改变金币数并重绘
    GoldCoin.prototype.add = function (addCoin) {
        this.goldCoin += addCoin;
        this.init();
    };
    GoldCoin.prototype.createBitmapByTexture = function (texture, x, y, scale) {
        if (scale === void 0) { scale = 1; }
        var result = new egret.Bitmap();
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        result.scaleX = result.scaleY = scale;
        this.addChild(result);
        return result;
    };
    return GoldCoin;
}(egret.DisplayObjectContainer));
__reflect(GoldCoin.prototype, "GoldCoin");
//# sourceMappingURL=GoldCoin.js.map