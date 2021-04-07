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
var MyElement = (function (_super) {
    __extends(MyElement, _super);
    function MyElement(x, y, to, n) {
        var _this = _super.call(this) || this;
        _this.to = to;
        _this.n = n;
        //随机颜色
        _this.eleIndex = Math.floor(Math.random() * 5 + 1);
        var texture = RES.getRes("gem_" + _this.eleIndex + "_png");
        _this.texture = texture;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    //掉落效果
    MyElement.prototype.drop = function () {
        //利用wait实现一行宝石参差不齐掉落
        egret.Tween.get(this).wait(Math.random() * 100).to({ x: this.x, y: this.to + 10 }, 300, egret.Ease.sineIn).to({ x: this.x, y: this.to - 10 }, 50, egret.Ease.sineIn).to({ x: this.x, y: this.to }, 50, egret.Ease.sineIn);
    };
    //掉落效果2
    MyElement.prototype.dropTo = function (x, y) {
        egret.Tween.get(this).to({ x: x, y: y + 10 }, 200, egret.Ease.sineIn).to({ x: x, y: y - 10 }, 40, egret.Ease.sineIn).to({ x: x, y: y }, 40, egret.Ease.sineIn);
    };
    //移除效果
    MyElement.prototype.remove = function (elemContainer) {
        var _this = this;
        var x = (Math.random() - 0.5) * 10;
        var funcChange = function () {
            _this.x += x;
        };
        egret.Tween.get(this, { onChange: funcChange, onChangeObj: this })
            .to({ y: this.stage.stageHeight }, 500, egret.Ease.backIn)
            .call(function () {
            //从显示容器中移除
            if (elemContainer.contains(_this)) {
                elemContainer.removeChild(_this);
            }
        });
    };
    //消除效果
    MyElement.prototype.eliminate = function (elemContainer) {
        var _this = this;
        var texture = RES.getRes("elem_eli_" + this.eleIndex + "_json");
        var timer = new egret.Timer(50, 9);
        var index = 0;
        var timerFunc = function () {
            this.texture = texture.getTexture("elem_eli_" + this.eleIndex + "_" + index);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            index++;
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            if (elemContainer.contains(_this)) {
                elemContainer.removeChild(_this);
            }
        }, this);
        timer.start();
    };
    return MyElement;
}(egret.Bitmap));
__reflect(MyElement.prototype, "MyElement");
//# sourceMappingURL=MyElement.js.map