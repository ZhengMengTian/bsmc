var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GameLogic = (function () {
    function GameLogic() {
    }
    GameLogic.getInst = function () {
        if (GameLogic.g_pInst == null) {
            GameLogic.g_pInst = new GameLogic();
        }
        return GameLogic.g_pInst;
    };
    GameLogic.prototype.initGame = function () {
        this.layer = Mainlayer.getInst();
        this.btnStart = EUIButton.Create(this.layer.ksImg);
        this.btnGuaji = EUIButton.Create(this.layer.gjImg);
        this.btnCancel = EUIButton.Create(this.layer.qxgjImg);
        this.btnPoint = EUIButton.Create(this.layer.point);
        this.btnStart.SetOnClick(this.OnStartClick, this);
        this.btnGuaji.SetOnClick(this.OnGuajiClick, this);
        this.btnCancel.SetOnClick(this.OnCancelClick, this);
        this.btnPoint.SetOnClick(this.OnPointClick, this);
        this.layer.point.text = 'x' + GameData.getInst().bet;
        this.createBricks();
        this.createEliBg();
    };
    /*
    **点击开始
    */
    GameLogic.prototype.OnStartClick = function () {
        console.log('kaishi');
        this.layer.ksImg.visible = false;
        this.layer.hsksImg.visible = true;
        this.btnPoint.ENABLE = false;
        this.layer.betBox.Hide();
        this.playAsync();
    };
    /*
    **点击倍率
    */
    GameLogic.prototype.OnPointClick = function () {
        Mainlayer.getInst().betBox.Switch();
    };
    /*
    **点击挂机
    */
    GameLogic.prototype.OnGuajiClick = function () {
        this.layer.gjImg.visible = false;
        this.layer.gjzImg.visible = true;
        this.btnCancel.VISIBLE = true;
        if (this.layer.ksImg.visible == true)
            this.OnStartClick();
    };
    /*
    **点击取消挂机
    */
    GameLogic.prototype.OnCancelClick = function () {
        this.layer.gjImg.visible = true;
        this.layer.gjzImg.visible = false;
        this.btnCancel.VISIBLE = false;
    };
    /*
    **生成砖块
    */
    GameLogic.prototype.createBricks = function () {
        for (var level = GameData.getInst().level; level <= 3; level++) {
            for (var index = 0; index < GameConfig.brickNums[level - 1]; index++) {
                var point = this.getBrickPos(level, index);
                var brick = new BrickItem(level, point.x, point.y);
                GameData.getInst().brickDic[level * 100 + index] = brick;
                this.layer.mainGp.addChild(brick);
            }
        }
    };
    /*
    **获取砖块的位置
    */
    GameLogic.prototype.getBrickPos = function (lv, step) {
        if (lv == 1) {
            var startX = 505;
            var startY = 525;
            return new egret.Point(startX, startY - step * GameConfig.brickHeight);
        }
        else if (lv == 2) {
            var startX = 170;
            var startY = 525;
            return new egret.Point(startX, startY - step * GameConfig.brickHeight);
        }
        else {
            var startX = 153;
            var startY = 550;
            return new egret.Point(startX + step * GameConfig.brickWidth, startY);
        }
    };
    /*
    **生成元素背景
    */
    GameLogic.prototype.createEliBg = function () {
        var config = GameConfig.eliArea[GameData.getInst().level - 1];
        for (var i = config[0]; i < config[0] + config[2]; i++) {
            for (var j = config[1]; j < config[1] + config[3]; j++) {
                var point = this.getEliBgPos(i, j);
                var bg = new EliBgItem(point.x, point.y);
                this.layer.mainGp.addChild(bg);
            }
        }
    };
    /*
    **获取元素背景的位置
    */
    GameLogic.prototype.getEliBgPos = function (x, y) {
        var startX = 170;
        var startY = 116;
        return new egret.Point(startX + y * GameConfig.eliBgWidth, startY + x * GameConfig.eliBgHeight);
    };
    /*
    **清空元素矩阵
    */
    GameLogic.prototype.clearEliData = function () {
        GameData.getInst().eliData = [];
        var config = GameConfig.eliArea[GameData.getInst().level - 1];
        for (var i = config[0]; i < config[0] + config[2]; i++) {
            GameData.getInst().eliData.push([]);
            for (var j = config[1]; j < config[1] + config[3]; j++) {
                GameData.getInst().eliData[i - config[0]].push(null);
            }
        }
    };
    /*
    **开始游戏
    */
    GameLogic.prototype.playAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clearEliData();
                        this.createBomb();
                        this.fillEmptyEli();
                        return [4 /*yield*/, this.eliDrop()];
                    case 1:
                        _a.sent();
                        console.log('掉落完毕');
                        return [4 /*yield*/, this.bombAsync()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    **生成炸弹
    */
    GameLogic.prototype.createBomb = function () {
        var eliData = GameData.getInst().eliData;
        var level = GameData.getInst().level;
        var config = GameConfig.eliArea[level - 1];
        if (Math.random() < GameConfig.bombProp[level - 1]) {
            // 炸弹位置
            var i = Math.floor(Math.random() * config[2]);
            var j = Math.floor(Math.random() * config[3]);
            var point = this.getEliBgPos(i + config[0], j + config[1]);
            var bomb = new EliBombItem(point.x, point.y);
            this.layer.mainGp.addChild(bomb);
            eliData[i][j] = bomb;
        }
    };
    /*
    **填充空的元素矩阵
    */
    GameLogic.prototype.fillEmptyEli = function () {
        var eliData = GameData.getInst().eliData;
        var config = GameConfig.eliArea[GameData.getInst().level - 1];
        for (var i = 0; i < config[2]; i++) {
            for (var j = 0; j < config[3]; j++) {
                if (!eliData[i][j]) {
                    var point = this.getEliBgPos(i + config[0], j + config[1]);
                    var eli = new EliNormalItem(point.x, point.y);
                    this.layer.mainGp.addChild(eli);
                    eliData[i][j] = eli;
                }
            }
        }
    };
    /*
    **未掉落的元素掉落，控制参差不齐掉落
    */
    GameLogic.prototype.eliDrop = function () {
        var arr = [];
        var eliData = GameData.getInst().eliData;
        var config = GameConfig.eliArea[GameData.getInst().level - 1];
        for (var i = 0; i < config[2]; i++) {
            var _loop_1 = function (j) {
                var eli = eliData[i][j];
                if (eli.y <= 0) {
                    arr.push(TimerUtil.wait(80 * (config[2] - i - 1) + Math.random() * 50).then(function () {
                        return eli.drop();
                    }));
                }
            };
            for (var j = 0; j < config[3]; j++) {
                _loop_1(j);
            }
        }
        return Promise.all(arr);
    };
    /*
    **炸弹爆炸逻辑
    */
    GameLogic.prototype.bombAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eliData, level, config, i, j, eli, point;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eliData = GameData.getInst().eliData;
                        level = GameData.getInst().level;
                        config = GameConfig.eliArea[level - 1];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < config[2])) return [3 /*break*/, 7];
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < config[3])) return [3 /*break*/, 6];
                        eli = eliData[i][j];
                        if (!(eli.index === -1)) return [3 /*break*/, 5];
                        point = this.getBrickPos(level, GameData.getInst().brickNum - 1);
                        return [4 /*yield*/, eli.flyTo(point)];
                    case 3:
                        _a.sent();
                        GameData.getInst().brickDic[level * 100 + GameData.getInst().brickNum - 1].visible = false;
                        return [4 /*yield*/, eli.bomb()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        j++;
                        return [3 /*break*/, 2];
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GameLogic.g_pInst = null; //单例
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map