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
        _this.showList = []; // 显示的连击记录数组，最多5个
        _this.itemHeight = 65; // 连击项的高度
        _this.totalNum = 0; // 总连击数
        _this.comboContainer = new egret.DisplayObjectContainer; // 连击列表的显示容器实例
        _this.x = x;
        _this.y = y;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    ComboList.prototype.init = function () {
        this.comboContainer.x = 0;
        this.comboContainer.y = -420;
        this.addChild(this.comboContainer);
        //创建底座及背景
        this.createBitmapByName("h5by_xyx_gs_png", 0, -this.stage.stageHeight * 0.32);
        this.createBitmapByName("h5by_xyx_zzjmzb_png", 0, 0);
    };
    // 根据资源名添加显示对象
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
    ComboList.prototype.addOne = function (eleIndex, num, fromX, fromY, maiContainer) {
        this.totalNum++;
        if (this.showList.length < 5) {
            // 小于5条则添加投掷即可
            var index = this.showList.push({ eleIndex: eleIndex, num: num }) - 1;
            var point = this.localToGlobal(-40, -90 - this.itemHeight * index);
            var combo = new ComboItem(0, -90 - this.itemHeight * index, eleIndex, num);
            this.showList[index].combo = combo;
            this.addThrow(combo, eleIndex, fromX, fromY, point.x, point.y, maiContainer);
        }
        else {
            // 大于5条时，删除最旧一条，整体下移，并添加投掷动画
            this.removeChild(this.showList[0].combo);
            this.showList = this.showList.slice(1);
            var _loop_1 = function (i) {
                var item = this_1.showList[i].combo;
                var timer = new egret.Timer(30, 10);
                var timerFunc = function () {
                    item.y += this.itemHeight / 10;
                };
                timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this_1);
                timer.start();
            };
            var this_1 = this;
            for (var i = 0; i < this.showList.length; i++) {
                _loop_1(i);
            }
            var index = this.showList.push({ eleIndex: eleIndex, num: num }) - 1;
            var combo = new ComboItem(0, -90 - this.itemHeight * index, eleIndex, num);
            var point = this.localToGlobal(-40, -90 - this.itemHeight * index);
            this.showList[index].combo = combo;
            this.addThrow(combo, eleIndex, fromX, fromY, point.x, point.y, maiContainer);
        }
    };
    //添加投掷动画
    ComboList.prototype.addThrow = function (combo, eleIndex, fromX, fromY, toX, toY, maiContainer) {
        var _this = this;
        var result = new egret.Bitmap();
        var texture = RES.getRes("gem_" + eleIndex + "_png");
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = fromX;
        result.y = fromY;
        maiContainer.addChild(result);
        var g = 5; // 模拟重力
        var t = 300;
        var deltaT = 30;
        var n = t / deltaT;
        var vX = (toX - fromX) / n;
        var vY = (toY - fromY) / n - g * n / 2;
        var timer = new egret.Timer(deltaT, n);
        var timerFunc = function () {
            result.x += vX;
            result.y += vY;
            vY += g;
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            maiContainer.removeChild(result);
            _this.addChild(combo);
        }, this);
        timer.start();
    };
    //清除所有记录，添加移除的动画
    ComboList.prototype.clearAll = function () {
        var _this = this;
        if (this.totalNum <= 0)
            return;
        this.comboContainer.removeChildren();
        this.totalNum = 0;
        var _loop_2 = function (i) {
            var combo = this_2.showList[i].combo;
            var numChild = combo.numChildren;
            for (var j = 1; j < numChild; j++) {
                combo.removeChildAt(1);
            }
            //移除的动画
            var alpha = Math.random() * Math.PI;
            var v = 40;
            var vX = -Math.sin(alpha) * v * 0.5;
            var vY = Math.cos(alpha) * v;
            var timer = new egret.Timer(30, 30);
            var timerFunc = function () {
                combo.x += vX;
                combo.y += vY;
                vY += 5;
            };
            timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this_2);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                _this.removeChild(combo);
            }, this_2);
            timer.start();
        };
        var this_2 = this;
        for (var i = 0; i < this.showList.length; i++) {
            _loop_2(i);
        }
        this.showList = [];
    };
    //显示最终连击数
    ComboList.prototype.showAll = function () {
        if (this.totalNum <= 0)
            return;
        var texture;
        var arr = this.totalNum.toString().split('');
        var spriteSheet = RES.getRes("record_json");
        var space = -30;
        for (var i = arr.length - 1; i >= 0; i--) {
            texture = spriteSheet.getTexture(arr[i]);
            space -= this.createCombo(texture, space, 0) * 0.85;
        }
        texture = spriteSheet.getTexture('l');
        this.createCombo(texture, 50, 10);
    };
    // 添加连击总数的各个数字
    ComboList.prototype.createCombo = function (texture, x, y) {
        var result = new egret.Bitmap();
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.comboContainer.addChild(result);
        return result.width;
    };
    return ComboList;
}(egret.DisplayObjectContainer));
__reflect(ComboList.prototype, "ComboList");
// 连击列表中各个子项的类
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