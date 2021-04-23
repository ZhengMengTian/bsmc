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
var EliBombItem = (function (_super) {
    __extends(EliBombItem, _super);
    function EliBombItem(x, y) {
        return _super.call(this, x, y, "main_json.gem_bomb", -1) || this;
    }
    Object.defineProperty(EliBombItem.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.x = (1 - value) * (1 - value) * this.P0.x + 2 * value * (1 - value) * this.P1.x + value * value * this.P2.x;
            this.y = (1 - value) * (1 - value) * this.P0.y + 2 * value * (1 - value) * this.P1.y + value * value * this.P2.y;
            this.scaleX -= 0.01;
            this.scaleY -= 0.01;
            this.rotation += 30;
        },
        enumerable: true,
        configurable: true
    });
    EliBombItem.prototype.flyTo = function (point) {
        var _this = this;
        this.P0 = this.parent.localToGlobal(this.x, this.y);
        this.P2 = this.parent.localToGlobal(point.x, point.y);
        this.P1 = new egret.Point(this.P0.x + (this.P2.x - this.P0.x) * Math.random(), Math.min(this.P0.y, this.P2.y) - Math.random() * 200 - 100);
        this.parent.removeChild(this);
        Layer.LAYER_EFFECT.addChild(this);
        return new Promise(function (resolve) {
            egret.Tween.get(_this)
                .to({ factor: 1 }, 600).call(resolve);
        });
    };
    EliBombItem.prototype.bomb = function () {
        var _this = this;
        this.scaleX = this.scaleY = 1;
        this.rotation = 0;
        var sheet = RES.getRes("bomb_json");
        var timer = new egret.Timer(50, 20);
        var index = 0;
        var timerFunc = function () {
            this.texture = sheet.getTexture("elem_bomb_" + index);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            index++;
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            _this.parent.removeChild(_this);
        }, this);
        timer.start();
    };
    return EliBombItem;
}(EliBaseItem));
__reflect(EliBombItem.prototype, "EliBombItem");
//# sourceMappingURL=EliBombItem.js.map