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
var BetBox = (function (_super) {
    __extends(BetBox, _super);
    function BetBox() {
        var _this = _super.call(this) || this;
        _this.m_arrItem = new Array();
        _this.m_isShowing = false;
        return _this;
    }
    BetBox.prototype.Init = function () {
        var arrPoint = GameConfig.betArr;
        var item;
        for (var i = 0; i < arrPoint.length; ++i) {
            if (arrPoint[i] == 0)
                break;
            item = new BetItem(arrPoint[i], this);
            item.visible = false;
            this.m_arrItem.push(item);
            this.addChild(item);
        }
    };
    BetBox.prototype.OnClick = function (iPoint) {
        GameData.getInst().bet = iPoint;
        Mainlayer.getInst().point.text = 'x' + iPoint;
        this.Hide();
    };
    BetBox.prototype.Switch = function () {
        if (this.m_isShowing == true)
            this.Hide();
        else
            this.Show();
    };
    BetBox.prototype.Show = function () {
        var item;
        for (var i = 0; i < this.m_arrItem.length; ++i) {
            item = this.m_arrItem[i];
            egret.Tween.removeTweens(item);
            egret.Tween.get(item).to({ visible: true }, 0).to({ alpha: 1, y: -45 * i }, 200);
            item.m_btn.TOUCH_ENABLE = true;
        }
        this.m_isShowing = true;
    };
    BetBox.prototype.Hide = function () {
        if (this.visible == false)
            return;
        var item;
        for (var i = 0; i < this.m_arrItem.length; ++i) {
            item = this.m_arrItem[i];
            egret.Tween.removeTweens(item);
            egret.Tween.get(item).to({ alpha: 0, y: 0 }, 200).to({ visible: true }, 0);
            item.m_btn.TOUCH_ENABLE = false;
        }
        this.m_isShowing = false;
    };
    return BetBox;
}(egret.DisplayObjectContainer));
__reflect(BetBox.prototype, "BetBox");
var BetItem = (function (_super) {
    __extends(BetItem, _super);
    function BetItem(iPoint, box) {
        var _this = _super.call(this) || this;
        _this.m_imgBg = new egret.Bitmap();
        _this.m_imgBg.texture = RES.getRes("main_json.h5by_xyx_sbdb");
        _this.m_imgBg.scale9Grid = new egret.Rectangle(14, 14, 2, 2);
        _this.m_imgBg.width = 180;
        _this.m_imgBg.height = 40;
        _this.m_imgBg.anchorOffsetX = _this.m_imgBg.width * 0.5;
        _this.m_imgBg.anchorOffsetY = _this.m_imgBg.height * 0.5;
        _this.addChild(_this.m_imgBg);
        _this.m_fntPoint = new egret.BitmapText;
        _this.m_fntPoint.font = RES.getRes("combo_fnt");
        _this.m_fntPoint.textAlign = egret.HorizontalAlign.CENTER;
        _this.m_fntPoint.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.m_fntPoint.width = 250;
        _this.m_fntPoint.height = 40;
        _this.m_fntPoint.anchorOffsetX = _this.m_fntPoint.width * 0.5;
        _this.m_fntPoint.anchorOffsetY = _this.m_fntPoint.height * 0.5;
        _this.m_fntPoint.letterSpacing = -13;
        _this.addChild(_this.m_fntPoint);
        _this.m_btn = EUIButton.Create(_this);
        _this.m_btn.SetOnClick(_this.OnClick, _this);
        _this.m_iPoint = iPoint;
        _this.m_fntPoint.text = _this.m_iPoint + '';
        _this.m_box = box;
        return _this;
    }
    BetItem.prototype.OnClick = function () {
        this.m_box.OnClick(this.m_iPoint);
    };
    return BetItem;
}(egret.DisplayObjectContainer));
__reflect(BetItem.prototype, "BetItem");
//# sourceMappingURL=BetBox.js.map