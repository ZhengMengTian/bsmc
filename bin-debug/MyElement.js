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
var MyElement = (function (_super) {
    __extends(MyElement, _super);
    function MyElement(x, y, to, n, isBomb) {
        if (isBomb === void 0) { isBomb = false; }
        var _this = _super.call(this) || this;
        _this.rate = [0.2, 0.2, 0.2, 0.2, 0.2]; // 各元素出现概率，一共5种元素
        _this.to = to;
        if (isBomb) {
            _this.eleIndex = -1;
        }
        else {
            //随机颜色算法
            var random = Math.random();
            var sum = 0;
            for (var i = 0; i < _this.rate.length; i++) {
                sum += _this.rate[i];
                _this.eleIndex = i;
                if (sum >= random)
                    break;
            }
            _this.eleIndex++; // 宝石类型从1开始，所以下标+1
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
        var alpha = Math.random() * Math.PI * 2; //随机角度
        var v = 20;
        var vX = Math.sin(alpha) * v;
        var vY = Math.cos(alpha) * v;
        var timer = new egret.Timer(30, 30);
        var timerFunc = function () {
            this.x += vX;
            this.y += vY;
            vY += 5; // 模拟重力
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
    //消除效果动画
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
            //从显示容器中移除
            if (elemContainer.contains(_this)) {
                elemContainer.removeChild(_this);
            }
        }, this);
        timer.start();
    };
    //炸弹飞行
    MyElement.prototype.bombFly = function (toX, toY, container, main) {
        var _this = this;
        container.setChildIndex(this, 100); //将炸弹的层级提升，以免被其他宝石遮挡
        var fromX = this.x, fromY = this.y;
        toY += 30; // 终点的y坐标加上砖块的高度，否则会在砖块上方爆炸
        var g = 5;
        var t = 510;
        var deltaT = 30;
        var n = t / deltaT;
        // 计算vX、vY确保n次循环后飞至终点
        var vX = (toX - fromX) / n;
        var vY = (toY - fromY) / n - g * n / 2;
        var timer = new egret.Timer(deltaT, n);
        var timerFunc = function () {
            this.x += vX;
            this.y += vY;
            vY += g; // 模拟重力
            // 飞行过程中缩小
            this.scaleX -= 0.01;
            this.scaleY -= 0.01;
            // 飞行过程中旋转
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