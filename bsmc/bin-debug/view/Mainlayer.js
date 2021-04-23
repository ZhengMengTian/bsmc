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
var Mainlayer = (function (_super) {
    __extends(Mainlayer, _super);
    function Mainlayer() {
        var _this = _super.call(this) || this;
        _this.mainGp = null;
        _this.opGp = null;
        _this.lvImg = null;
        _this.ksImg = null;
        _this.hsksImg = null;
        _this.qxgjImg = null;
        _this.gjImg = null;
        _this.gjzImg = null;
        _this.point = null;
        _this.skinName = "mainSkin";
        return _this;
    }
    Mainlayer.getInst = function () {
        if (Mainlayer.g_pInst == null) {
            Mainlayer.g_pInst = new Mainlayer();
        }
        return Mainlayer.g_pInst;
    };
    Mainlayer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        GameLogic.getInst().initGame();
        this.createBetBox();
    };
    /*
    **生成倍率选择框
    */
    Mainlayer.prototype.createBetBox = function () {
        this.betBox = new BetBox();
        this.betBox.x = 160;
        this.betBox.y = 290;
        this.opGp.addChild(this.betBox);
        this.betBox.Init();
    };
    Mainlayer.g_pInst = null; //单例
    return Mainlayer;
}(eui.Component));
__reflect(Mainlayer.prototype, "Mainlayer");
//# sourceMappingURL=Mainlayer.js.map