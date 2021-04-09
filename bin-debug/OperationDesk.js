//右侧操作台类
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
var OperationDesk = (function (_super) {
    __extends(OperationDesk, _super);
    function OperationDesk(x, y, main) {
        var _this = _super.call(this) || this;
        _this.listIsShow = false;
        _this.pointList = [100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000];
        _this.x = x;
        _this.y = y;
        _this.main = main;
        _this.point = _this.pointList[0];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    OperationDesk.prototype.init = function () {
        var _this = this;
        this.createBitmapByName("h5by_xyx_zzjmyb_png", 0, 0);
        this.pointContainer = new egret.DisplayObjectContainer();
        this.pointContainer.y = -50;
        this.setPoint(this.point);
        this.addChild(this.pointContainer);
        this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            if (_this.listIsShow) {
                _this.hideList();
            }
            else {
                _this.showList();
            }
        }, this);
        this.initList();
        this.button1 = this.createBitmapByName("h5by_xyx_ks_png", 20, 20);
        this.button2 = this.createBitmapByName("h5by_xyx_gj_png", 20, 80);
        this.enableStartButton();
        this.enableGj();
    };
    // 启用倍率选择按钮
    OperationDesk.prototype.enablePoint = function () {
        this.pointContainer.filters = [];
        this.pointContainer.touchEnabled = true;
    };
    // 停用倍率选择按钮
    OperationDesk.prototype.disablePoint = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.pointContainer.filters = [colorFlilter];
        this.pointContainer.touchEnabled = false;
    };
    //初始化倍率列表
    OperationDesk.prototype.initList = function () {
        var _this = this;
        this.pointListContainer = new egret.DisplayObjectContainer();
        this.pointListContainer.y = -120;
        var _loop_1 = function (i) {
            var container = new egret.DisplayObjectContainer();
            var arr = this_1.pointList[i].toString().split('');
            var spriteSheet = RES.getRes("combo_json");
            //根据数字长度决定显示位置		
            var base = 20 - arr.length / 2 * 20;
            var space = 0;
            var texture = RES.getRes('h5by_xyx_sbdb_png');
            var bg = this_1.createBitmapByTexture(texture, -70, -5, container);
            bg.width *= 8;
            bg.height *= 1.2;
            for (var i_1 = 0; i_1 < arr.length; i_1++) {
                texture = spriteSheet.getTexture(arr[i_1]);
                space += this_1.createBitmapByTexture(texture, base + space, 0, container).width * 0.7;
            }
            container.alpha = 0;
            this_1.pointListContainer.addChild(container);
            //添加点击事件
            container.touchEnabled = true;
            container.addEventListener(egret.TouchEvent.TOUCH_END, function () { _this.setPoint(_this.pointList[i]); _this.hideList(); }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < this.pointList.length; i++) {
            _loop_1(i);
        }
    };
    // 启用开始按钮
    OperationDesk.prototype.enableStartButton = function () {
        var _this = this;
        this.enablePoint();
        this.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_ks_png", 20, 20);
        this.button1.touchEnabled = true;
        this.button1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, function () { _this.main.startGame(); _this.disableStartButton(); }, this);
    };
    // 禁用开始按钮
    OperationDesk.prototype.disableStartButton = function () {
        this.disablePoint();
        this.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_hsks_png", 20, 20);
    };
    // 启用挂机按钮
    OperationDesk.prototype.enableGj = function () {
        var _this = this;
        this.removeChild(this.button2);
        this.button2 = this.createBitmapByName("h5by_xyx_gj_png", 20, 80);
        this.button2.touchEnabled = true;
        this.button2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_END, function () { _this.main.gj(); _this.disableGj(); }, this);
    };
    // 禁用挂机按钮&添加取消挂机按钮
    OperationDesk.prototype.disableGj = function () {
        this.disablePoint();
        this.removeChild(this.button2);
        this.button2 = this.createBitmapByName("h5by_xyx_gjz_png", 20, 80);
        this.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_qxgj_png", 20, 20);
        this.button1.touchEnabled = true;
        this.button1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.main.gjCancel, this.main);
    };
    // 设置倍率
    OperationDesk.prototype.setPoint = function (newPont) {
        this.point = newPont;
        this.pointContainer.removeChildren();
        var arr = this.point.toString().split('');
        var spriteSheet = RES.getRes("point_json");
        //根据数字长度决定显示位置		
        var base = -20 - arr.length / 2 * 10;
        var space = 20;
        var texture = spriteSheet.getTexture('x');
        this.createBitmapByTexture(texture, base, 0, this.pointContainer);
        for (var i = 0; i < arr.length; i++) {
            texture = spriteSheet.getTexture(arr[i]);
            space += this.createBitmapByTexture(texture, base + space, 0, this.pointContainer).width * 0.65;
        }
    };
    //显示倍率列表
    OperationDesk.prototype.showList = function () {
        this.listIsShow = true;
        this.addChild(this.pointListContainer);
        var _loop_2 = function (i) {
            var item = this_2.pointListContainer.getChildAt(i);
            //上移的动画
            var timer = new egret.Timer(8, 11);
            var l = i * 45;
            var timerFunc = function () {
                item.y -= l / 10;
                item.alpha += 0.1;
            };
            timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this_2);
            timer.start();
        };
        var this_2 = this;
        for (var i = 0; i < this.pointListContainer.numChildren; i++) {
            _loop_2(i);
        }
    };
    //隐藏倍率列表
    OperationDesk.prototype.hideList = function () {
        var _this = this;
        this.listIsShow = false;
        var _loop_3 = function (i) {
            var item = this_3.pointListContainer.getChildAt(i);
            //下移的动画
            var timer = new egret.Timer(8, 11);
            var l = item.y;
            var timerFunc = function () {
                item.y -= l / 10;
                item.alpha -= 0.1;
            };
            timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this_3);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                if (_this.contains(_this.pointListContainer)) {
                    _this.removeChild(_this.pointListContainer);
                }
            }, this_3);
            timer.start();
        };
        var this_3 = this;
        for (var i = 0; i < this.pointListContainer.numChildren; i++) {
            _loop_3(i);
        }
    };
    OperationDesk.prototype.createBitmapByName = function (name, x, y) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
        return result;
    };
    OperationDesk.prototype.createBitmapByTexture = function (texture, x, y, container) {
        var result = new egret.Bitmap();
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        container.addChild(result);
        return result;
    };
    OperationDesk.prototype.touchBegin = function (evt) {
        evt.$target.scaleX = evt.$target.scaleY = 1.1;
    };
    OperationDesk.prototype.touchEnd = function (evt) {
        evt.$target.scaleX = evt.$target.scaleY = 1;
    };
    return OperationDesk;
}(egret.DisplayObjectContainer));
__reflect(OperationDesk.prototype, "OperationDesk");
//# sourceMappingURL=OperationDesk.js.map