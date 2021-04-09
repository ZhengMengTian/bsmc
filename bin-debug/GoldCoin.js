var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        var texture = RES.getRes('h5by_xyx_jbdb-_png');
        var bg = this.createBitmapByTexture(texture, 0, -5);
        bg.width *= 6;
        bg.height *= 1.2;
        texture = spriteSheet.getTexture('coin');
        this.createBitmapByTexture(texture, 10, 0, 0.4);
        for (var i = 0; i < arr.length; i++) {
            texture = spriteSheet.getTexture(arr[i]);
            space += this.createBitmapByTexture(texture, space, 0, 0.3).width * 0.3;
        }
    };
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