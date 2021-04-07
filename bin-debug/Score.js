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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score(x, y, num, container) {
        var _this = _super.call(this) || this;
        var arr = num.toString().split('');
        var spriteSheet = RES.getRes("score_json");
        var space = 0;
        for (var i = 0; i < arr.length; i++) {
            var numBitmap = new egret.Bitmap();
            numBitmap.texture = spriteSheet.getTexture(arr[i]);
            numBitmap.anchorOffsetX = numBitmap.width / 2;
            numBitmap.anchorOffsetY = numBitmap.height / 2;
            numBitmap.x = x + space;
            numBitmap.y = y;
            _this.addChild(numBitmap);
            space += numBitmap.width * 0.85;
        }
        _this.gone(container);
        return _this;
    }
    //分数飘走消失特效
    Score.prototype.gone = function (container) {
        var alpha = 1, x = 20;
        var timer = new egret.Timer(50, 0);
        var timerFunc = function () {
            alpha -= 0.05;
            this.alpha = alpha;
            this.x += x;
            x -= 1;
            if (alpha <= 0) {
                timer.stop();
                container.removeChild(this);
            }
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.start();
    };
    return Score;
}(egret.DisplayObjectContainer));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map