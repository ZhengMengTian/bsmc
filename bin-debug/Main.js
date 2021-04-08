/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc res模块资源加载示例。
 *      通过创建新的group来加载一组文件。
 */
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.mainContainer = new egret.DisplayObjectContainer();
        _this.buttonContainer = new egret.DisplayObjectContainer();
        _this.elemContainer = new egret.DisplayObjectContainer();
        _this.elemBgContainer = new egret.DisplayObjectContainer();
        _this.brickContainer1 = new egret.DisplayObjectContainer();
        _this.brickContainer2 = new egret.DisplayObjectContainer();
        _this.brickContainer3 = new egret.DisplayObjectContainer();
        _this.level = 1; //初始关卡
        _this.minNum = 4; // 最少多少个相同宝石可消除
        _this.running = false; //游戏是否正在进行中
        _this.auto = false; //是否正在挂机
        _this.bombProb = [0.9, 0.9, 0.9]; //炸弹生成概率
        _this.hasBomb = false; // 是否有炸弹
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //加载
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        this.createGameScene();
    };
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    Main.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    Main.prototype.onResourceProgress = function (event) {
    };
    //创建游戏场景
    Main.prototype.createGameScene = function () {
        this.mainContainer.x = this.stage.stageWidth / 2;
        this.mainContainer.y = this.stage.stageHeight / 2;
        this.comboList = new ComboList(this.stage.stageWidth * 0.16, this.stage.stageHeight * 0.83);
        this.buttonContainer.x = this.stage.stageWidth * 0.82;
        this.buttonContainer.y = this.stage.stageHeight * 0.8;
        this.createBitmapByName("h5by_xyx_zzjmyb_png", 0, 0, this.buttonContainer);
        this.button1 = this.createBitmapByName("h5by_xyx_ks_png", 20, 20, this.buttonContainer);
        this.button2 = this.createBitmapByName("h5by_xyx_gj_png", 20, 80, this.buttonContainer);
        this.enableStartButton();
        this.enableGj();
        this.addChild(this.comboList);
        this.addChild(this.buttonContainer);
        this.addChild(this.mainContainer);
        this.initGame(this.level);
    };
    // 启用开始按钮
    Main.prototype.enableStartButton = function () {
        var _this = this;
        this.buttonContainer.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_ks_png", 20, 20, this.buttonContainer);
        this.button1.touchEnabled = true;
        this.button1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, function () { _this.startGame(); _this.disableStartButton(); }, this);
    };
    // 禁用开始按钮
    Main.prototype.disableStartButton = function () {
        this.buttonContainer.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_hsks_png", 20, 20, this.buttonContainer);
    };
    // 启用挂机按钮
    Main.prototype.enableGj = function () {
        var _this = this;
        this.buttonContainer.removeChild(this.button2);
        this.button2 = this.createBitmapByName("h5by_xyx_gj_png", 20, 80, this.buttonContainer);
        this.button2.touchEnabled = true;
        this.button2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_END, function () { _this.gj(); _this.disableGj(); }, this);
    };
    // 禁用挂机按钮&添加取消挂机按钮
    Main.prototype.disableGj = function () {
        this.buttonContainer.removeChild(this.button2);
        this.button2 = this.createBitmapByName("h5by_xyx_gjz_png", 20, 80, this.buttonContainer);
        this.buttonContainer.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_qxgj_png", 20, 20, this.buttonContainer);
        this.button1.touchEnabled = true;
        this.button1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.gjCancel, this);
    };
    //挂机
    Main.prototype.gj = function () {
        if (this.running) {
            this.auto = true;
        }
        else {
            this.auto = true;
            this.startGame();
        }
    };
    //取消挂机
    Main.prototype.gjCancel = function () {
        this.auto = false;
        this.disableStartButton();
        this.enableGj();
    };
    //创建关卡砖块以及棋盘背景
    Main.prototype.initGame = function (level) {
        if (level === void 0) { level = 1; }
        this.elementArr = [];
        this.mainContainer.removeChildren();
        this.elemContainer.removeChildren();
        this.elemBgContainer.removeChildren();
        this.brickContainer1.removeChildren();
        this.brickContainer2.removeChildren();
        this.brickContainer3.removeChildren();
        this.createBitmapByName("h5by_xyx_zzjm_png", 0, 0, this.mainContainer);
        switch (level) {
            case 1:
                this.brickNum = 15;
                this.n = 4;
                this.createBitmapByName("h5by_xyx_dyg_png", 10, -265, this.mainContainer);
                this.elemBgContainer.x = -167;
                this.elemBgContainer.y = -195;
                this.mainContainer.addChild(this.elemBgContainer);
                for (var i = 3; i < 7; i++) {
                    for (var j = 1; j < 5; j++) {
                        this.createElemBg(i, j);
                    }
                }
                this.brickContainer1.x = 170;
                this.brickContainer1.y = 205;
                this.mainContainer.addChild(this.brickContainer1);
                this.createBrick1(this.brickNum);
                this.brickContainer2.x = -165;
                this.brickContainer2.y = 205;
                this.mainContainer.addChild(this.brickContainer2);
                this.createBrick2(this.brickNum);
                this.brickContainer3.x = -182;
                this.brickContainer3.y = 233;
                this.mainContainer.addChild(this.brickContainer3);
                this.createBrick3(this.brickNum);
                this.elemContainer.x = -167;
                this.elemContainer.y = -195;
                this.mainContainer.addChild(this.elemContainer);
                break;
            case 2:
                this.brickNum = 15;
                this.n = 5;
                this.createBitmapByName("h5by_xyx_deg_png", 10, -265, this.mainContainer);
                this.elemBgContainer.x = -167;
                this.elemBgContainer.y = -195;
                this.mainContainer.addChild(this.elemBgContainer);
                for (var i = 2; i < 7; i++) {
                    for (var j = 1; j < 6; j++) {
                        this.createElemBg(i, j);
                    }
                }
                this.brickContainer2.x = -165;
                this.brickContainer2.y = 205;
                this.mainContainer.addChild(this.brickContainer2);
                this.createBrick2(this.brickNum);
                this.brickContainer3.x = -182;
                this.brickContainer3.y = 233;
                this.mainContainer.addChild(this.brickContainer3);
                this.createBrick3(this.brickNum);
                this.elemContainer.x = -167;
                this.elemContainer.y = -195;
                this.mainContainer.addChild(this.elemContainer);
                break;
            case 3:
                this.brickNum = 15;
                this.n = 6;
                this.createBitmapByName("h5by_xyx_dsg_png", 10, -265, this.mainContainer);
                this.elemBgContainer.x = -167;
                this.elemBgContainer.y = -195;
                this.mainContainer.addChild(this.elemBgContainer);
                for (var i = 1; i < 7; i++) {
                    for (var j = 0; j < 6; j++) {
                        this.createElemBg(i, j);
                    }
                }
                this.brickContainer3.x = -182;
                this.brickContainer3.y = 233;
                this.mainContainer.addChild(this.brickContainer3);
                this.createBrick3(this.brickNum);
                this.elemContainer.x = -167;
                this.elemContainer.y = -195;
                this.mainContainer.addChild(this.elemContainer);
                break;
        }
    };
    //创建棋盘背景
    Main.prototype.createElemBg = function (i, j) {
        var sizeX = 67, sizeY = 64;
        this.createBitmapByName("h5by_xyx_fkdb_png", j * sizeX, i * sizeY, this.elemBgContainer);
    };
    //创建砖块1
    Main.prototype.createBrick1 = function (n) {
        var size = 28;
        for (var i = 0; i < n; i++) {
            this.createBitmapByName("gem_brick01_01_png", 0, -i * size, this.brickContainer1);
        }
    };
    //创建砖块2
    Main.prototype.createBrick2 = function (n) {
        var size = 28;
        for (var i = 0; i < n; i++) {
            this.createBitmapByName("gem_brick01_01_png", 0, -i * size, this.brickContainer2);
        }
    };
    //创建砖块3
    Main.prototype.createBrick3 = function (n) {
        var size = 26.5;
        for (var i = 0; i < n; i++) {
            this.createBitmapByName("h5by_xyx_xbs_png", i * size, 0, this.brickContainer3);
        }
    };
    Main.prototype.touchBegin = function (evt) {
        evt.$target.scaleX = evt.$target.scaleY = 1.1;
    };
    Main.prototype.touchEnd = function (evt) {
        evt.$target.scaleX = evt.$target.scaleY = 1;
    };
    Main.prototype.startGame = function () {
        var _this = this;
        console.log('游戏开始');
        this.running = true;
        this.comboList.clearAll();
        if (this.elemContainer.numChildren !== 0) {
            //先将原来的宝石移除
            for (var i = 0; i < this.elemContainer.numChildren; i++) {
                var elem = this.elemContainer.getChildAt(i);
                elem.remove(this.elemContainer);
            }
            //再添加新的宝石
            egret.setTimeout(function () {
                _this.createElement();
            }, 0, 300);
        }
        else {
            this.createElement();
        }
    };
    Main.prototype.createElement = function () {
        var _this = this;
        //生成炸弹的逻辑
        this.hasBomb = this.ifBomb();
        var bombPosition = { i: -1, j: -1 };
        if (this.hasBomb) {
            //随机炸弹位置
            bombPosition = {
                i: Math.floor(Math.random() * this.n),
                j: Math.floor(Math.random() * this.n)
            };
        }
        // 生成宝石或炸弹
        this.elementArr = [];
        var n = 0;
        for (var i = 0; i < this.n; i++) {
            this.elementArr.push([]);
            for (var j = 0; j < this.n; j++) {
                var bg = this.elemBgContainer.getChildAt(n);
                var elem = new MyElement(bg.x, -this.stage.stageHeight / 2, bg.y, n, i === bombPosition.i && j === bombPosition.j);
                this.elemContainer.addChild(elem);
                this.elementArr[i][j] = elem;
                n++;
            }
        }
        var _loop_1 = function (i) {
            //延时调用,实现宝石分行掉落
            egret.setTimeout(function () {
                for (var j = 0; j < this.n; j++) {
                    //从最底下一行开始掉落
                    this.elementArr[this.n - 1 - i][j].drop();
                }
            }, this_1, i * 100);
        };
        var this_1 = this;
        //宝石掉落
        for (var i = 0; i < this.n; i++) {
            _loop_1(i);
        }
        if (this.hasBomb) {
            //调用炸弹爆炸逻辑
            egret.setTimeout(function () { _this.bomb(bombPosition); }, this, this.n * 100 + 300);
        }
        else {
            //调用消除逻辑
            egret.setTimeout(function () { _this.eliminate(); }, this, this.n * 100 + 300);
        }
    };
    //是否应该生成炸弹
    Main.prototype.ifBomb = function () {
        if (this.level >= 3 && this.brickNum <= 0) {
            return false;
        }
        return Math.random() < this.bombProb[this.level - 1];
    };
    //炸弹爆炸逻辑
    Main.prototype.bomb = function (position) {
        var brickPos = this.getBrickPos();
        this.elementArr[position.i][position.j].bombFly(brickPos.x, brickPos.y, this.elemContainer, this);
        this.elementArr[position.i][position.j] = null;
    };
    //炸弹爆炸后
    Main.prototype.afterBomb = function () {
        var _this = this;
        this.brickNum--;
        switch (this.level) {
            case 1:
                this.brickContainer1.removeChildren();
                this.createBrick1(this.brickNum);
                break;
            case 2:
                this.brickContainer2.removeChildren();
                this.createBrick2(this.brickNum);
                break;
            case 3:
                this.brickContainer3.removeChildren();
                this.createBrick3(this.brickNum);
                break;
            default:
                return;
        }
        if (this.brickNum > 0) {
            this.sortOut();
            this.fillEmpty();
            //调用消除逻辑
            egret.setTimeout(function () { _this.eliminate(); }, this, 400);
        }
        else if (this.level < 3) {
            this.initGame(++this.level);
            this.startGame();
        }
        else {
            // 回到第一关
            this.level = 1;
            this.initGame(this.level);
            this.startGame();
        }
    };
    //获取砖块的位置坐标
    Main.prototype.getBrickPos = function () {
        var point;
        var brick;
        switch (this.level) {
            case 1:
                brick = this.brickContainer1.getChildAt(this.brickNum - 1);
                point = this.brickContainer1.localToGlobal(brick.x, brick.y);
                point = this.elemContainer.globalToLocal(point.x, point.y);
                break;
            case 2:
                brick = this.brickContainer2.getChildAt(this.brickNum - 1);
                point = this.brickContainer2.localToGlobal(brick.x, brick.y);
                point = this.elemContainer.globalToLocal(point.x, point.y);
                break;
            case 3:
                brick = this.brickContainer3.getChildAt(this.brickNum - 1);
                point = this.brickContainer3.localToGlobal(brick.x, brick.y);
                point = this.elemContainer.globalToLocal(point.x, point.y);
                break;
            default:
                return point;
        }
        return point;
    };
    Main.prototype.eliminate = function () {
        var _this = this;
        // 计算是否有可消除的
        var arr = this.eliminateCalc();
        console.log(arr);
        if (arr.length > 0) {
            //有可消除的元素
            this.eliminateAct(arr);
        }
        else {
            //无可消除的元素
            this.comboList.showAll();
            if (this.auto) {
                //如果正在挂机
                egret.setTimeout(function () {
                    _this.startGame();
                }, this, 800);
            }
            else {
                //如果没有挂机
                this.running = false;
                this.enableStartButton();
            }
        }
    };
    //消除计算
    Main.prototype.eliminateCalc = function () {
        var elementArr = [], dp = [null], reslut = [];
        var n = this.elementArr.length, m = this.elementArr[0].length;
        //增加边界
        elementArr.push([]);
        for (var i = 0; i <= m; i++) {
            elementArr[0][i] = { eleIndex: -1 };
        }
        for (var i = 0; i < n; i++) {
            elementArr.push([{ eleIndex: -1 }].concat(this.elementArr[i]));
        }
        for (var i = 1; i < n + 1; i++) {
            dp.push([null]);
            var _loop_2 = function (j) {
                dp[i][j] = [{ i: i, j: j }];
                if (elementArr[i][j].eleIndex === elementArr[i][j - 1].eleIndex && elementArr[i][j].eleIndex === elementArr[i - 1][j].eleIndex) {
                    if (dp[i - 1][j] === dp[i][j - 1]) {
                        var arr_1 = dp[i][j - 1].concat(dp[i][j]);
                        arr_1.forEach(function (value) {
                            dp[value.i][value.j] = arr_1;
                        });
                    }
                    else {
                        var arr_2 = dp[i][j - 1].concat(dp[i - 1][j]).concat(dp[i][j]);
                        arr_2.forEach(function (value) {
                            dp[value.i][value.j] = arr_2;
                        });
                    }
                }
                else if (elementArr[i][j].eleIndex === elementArr[i][j - 1].eleIndex) {
                    var arr_3 = dp[i][j - 1].concat(dp[i][j]);
                    arr_3.forEach(function (value) {
                        dp[value.i][value.j] = arr_3;
                    });
                }
                else if (elementArr[i][j].eleIndex === elementArr[i - 1][j].eleIndex) {
                    var arr_4 = dp[i - 1][j].concat(dp[i][j]);
                    arr_4.forEach(function (value) {
                        dp[value.i][value.j] = arr_4;
                    });
                }
            };
            for (var j = 1; j < m + 1; j++) {
                _loop_2(j);
            }
        }
        //整理出应该被消除的宝石坐标
        for (var i = 1; i < n + 1; i++) {
            for (var j = 1; j < m + 1; j++) {
                if (dp[i][j].length >= this.minNum && reslut.indexOf(dp[i][j]) === -1) {
                    reslut.push(dp[i][j]);
                }
            }
        }
        reslut.forEach(function (value) {
            value.forEach(function (v) {
                v.i--;
                v.j--;
            });
        });
        return reslut;
    };
    //执行消除
    Main.prototype.eliminateAct = function (arr) {
        var _this = this;
        if (arr.length > 0) {
            var element = this.elementArr[arr[0][0].i][arr[0][0].j];
            var point = this.elemContainer.localToGlobal(element.x, element.y);
            //生成分数
            var score = new Score(point.x, point.y, this.getScore(arr[0].length), this);
            this.addChild(score);
            //生成连击
            this.comboList.addOne(element.eleIndex, arr[0].length, point.x, point.y, this);
            //消除
            arr[0].forEach(function (v) {
                _this.elementArr[v.i][v.j].eliminate(_this.elemContainer);
                _this.elementArr[v.i][v.j] = null;
            });
            egret.setTimeout(function () { _this.eliminateAct(arr.slice(1)); }, this, 300);
        }
        else {
            // 消除完毕
            this.sortOut();
            this.fillEmpty();
            //调用消除逻辑
            egret.setTimeout(function () { _this.eliminate(); }, this, this.n * 100 + 200);
        }
    };
    // 分数规则
    Main.prototype.getScore = function (l) {
        return l * 100;
    };
    // 整理棋盘
    Main.prototype.sortOut = function () {
        var m = this.elementArr.length, n = this.elementArr[0].length;
        var dp = [], empty = [];
        for (var i = 0; i < n; i++) {
            empty[i] = 0;
        }
        for (var i = m - 1; i >= 0; i--) {
            dp[i] = [];
            for (var j = n - 1; j >= 0; j--) {
                dp[i][j] = 0;
                if (this.elementArr[i][j]) {
                    if (empty[j] > 0) {
                        var bg = this.elemBgContainer.getChildAt((i + empty[j]) * this.n + j);
                        this.elementArr[i][j].dropTo(bg.x, bg.y);
                        this.elementArr[i + empty[j]][j] = this.elementArr[i][j];
                        this.elementArr[i][j] = null;
                    }
                }
                else {
                    empty[j]++;
                }
            }
        }
    };
    //填充空位
    Main.prototype.fillEmpty = function () {
        var _this = this;
        var m = this.elementArr.length, n = this.elementArr[0].length;
        var _loop_3 = function (i) {
            egret.setTimeout(function () {
                for (var j = n - 1; j >= 0; j--) {
                    if (!_this.elementArr[i][j]) {
                        var bg = _this.elemBgContainer.getChildAt(i * _this.n + j);
                        var elem = new MyElement(bg.x, -_this.stage.stageHeight / 3, bg.y, i * _this.n + j);
                        _this.elemContainer.addChild(elem);
                        _this.elementArr[i][j] = elem;
                        elem.drop();
                    }
                }
            }, this_2, (m - i - 1) * 50);
        };
        var this_2 = this;
        for (var i = m - 1; i >= 0; i--) {
            _loop_3(i);
        }
    };
    Main.prototype.createBitmapByName = function (name, x, y, container, offset) {
        if (offset === void 0) { offset = true; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        container.addChild(result);
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map