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
var ComboList = (function (_super) {
    __extends(ComboList, _super);
    function ComboList(x, y) {
        var _this = _super.call(this) || this;
        _this.history = [];
        _this.itemHeight = 65;
        _this.x = x;
        _this.y = y;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    ComboList.prototype.init = function () {
        this.createBitmapByName("h5by_xyx_gs_png", 0, -this.stage.stageHeight * 0.32);
        this.createBitmapByName("h5by_xyx_zzjmzb_png", 0, 0);
    };
    ComboList.prototype.createBitmapByName = function (name, x, y) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
    };
    //增加一条记录
    ComboList.prototype.addOne = function (eleIndex, num) {
        if (this.history.length < 5) {
            var index = this.history.push({ eleIndex: eleIndex, num: num }) - 1;
            this.addChild(new ComboItem(0, -90 - this.itemHeight * index, eleIndex, num));
        }
    };
    //清除所有记录
    ComboList.prototype.clearAll = function () {
    };
    //显示最终连击数
    ComboList.prototype.showAll = function () {
    };
    return ComboList;
}(egret.DisplayObjectContainer));
__reflect(ComboList.prototype, "ComboList");
var ComboItem = (function (_super) {
    __extends(ComboItem, _super);
    function ComboItem(x, y, eleIndex, num) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        var texture = RES.getRes("gem_" + eleIndex + "_png");
        _this.createBitmapByTexture(texture, -40, 0);
        var arr = num.toString().split('');
        var spriteSheet = RES.getRes("combo_json");
        var space = 50;
        texture = spriteSheet.getTexture('x');
        _this.createBitmapByTexture(texture, 10, 0);
        for (var i = 0; i < arr.length; i++) {
            texture = spriteSheet.getTexture(arr[i]);
            space += _this.createBitmapByTexture(texture, space, 0) * 0.85;
        }
        return _this;
    }
    ComboItem.prototype.createBitmapByTexture = function (texture, x, y) {
        var result = new egret.Bitmap();
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
        return result.width;
    };
    return ComboItem;
}(egret.DisplayObjectContainer));
__reflect(ComboItem.prototype, "ComboItem");
//# sourceMappingURL=ComboList.js.map