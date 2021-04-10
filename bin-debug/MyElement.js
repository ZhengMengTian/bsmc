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
    function MyElement(x, y, to, n, isBomb) {
        if (isBomb === void 0) { isBomb = false; }
        var _this = _super.call(this) || this;
        _this.rate = [0.2, 0.2, 0.2, 0.2, 0.2]; // 各元素出现概率，一共5种元素
        _this.to = to;
        _this.n = n;
        if (isBomb) {
            _this.eleIndex = -1;
        }
        else {
            //随机颜色
            var random = Math.random();
            var sum = 0;
            _this.eleIndex = 0;
            for (var i = 0; i < _this.rate.length; i++) {
                sum += _this.rate[i];
                _this.eleIndex = i;
                if (sum >= random)
                    break;
            }
            _this.eleIndex++;
        }
        var texture = isBomb ? RES.getRes("gem_bomb_png") : RES.getRes("gem_" + _this.eleIndex + "_png");
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
    //掉落效果2，填充空位时掉落
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
        var alpha = Math.random() * Math.PI * 2;
        var v = 40;
        var vX = Math.sin(alpha) * v * 0.5;
        var vY = Math.cos(alpha) * v;
        var timer = new egret.Timer(30, 30);
        var timerFunc = function () {
            this.x += vX;
            this.y += vY;
            vY += 5;
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            //从显示容器中移除
            if (elemContainer.contains(_this)) {
                elemContainer.removeChild(_this);
            }
        }, this);
        timer.start();
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
    //炸弹飞行
    MyElement.prototype.bombFly = function (toX, toY, container, main) {
        var _this = this;
        container.setChildIndex(this, 100);
        var fromX = this.x, fromY = this.y;
        toY += 30;
        var g = 5;
        var t = 510;
        var deltaT = 30;
        var n = t / deltaT;
        var vX = (toX - fromX) / n;
        var vY = (toY - fromY) / n - g * n / 2;
        var timer = new egret.Timer(deltaT, n);
        var timerFunc = function () {
            this.x += vX;
            this.y += vY;
            vY += g;
            this.scaleX -= 0.01;
            this.scaleY -= 0.01;
            this.rotation += 30;
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            // 飞行到终点后爆炸
            _this.bomb(container, main);
        }, this);
        timer.start();
    };
    //炸弹爆炸
    MyElement.prototype.bomb = function (container, main) {
        var _this = this;
        var texture = RES.getRes("bomb_json");
        var timer = new egret.Timer(50, 20);
        var index = 0;
        this.rotation = 0; // 把飞行过程中的旋转量回正
        var timerFunc = function () {
            this.texture = texture.getTexture("elem_bomb_" + index);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            index++;
            if (index === 5) {
                // 爆炸动画播放至第5帧时调用爆炸后逻辑，包括清除砖块进入下一关等
                main.afterBomb();
            }
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            if (container.contains(_this)) {
                container.removeChild(_this);
            }
        }, this);
        timer.start();
    };
    return MyElement;
}(egret.Bitmap));
__reflect(MyElement.prototype, "MyElement");
//# sourceMappingURL=MyElement.js.map