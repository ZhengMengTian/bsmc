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
// 得分效果类
var Score = (function (_super) {
    __extends(Score, _super);
    function Score(x, y, num, container) {
        var _this = _super.call(this) || this;
        _this.num = num;
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