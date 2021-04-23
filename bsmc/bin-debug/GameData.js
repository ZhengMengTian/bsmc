var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
        this.level = 1; // 当前关卡，初始第一关
        this.brickNum = GameConfig.brickNums[0]; //当前砖块数
        this.bet = GameConfig.betArr[0]; // 当前倍率
        this.brickDic = {}; // 保存砖块数据
        this.eliData = [];
    }
    GameData.getInst = function () {
        if (GameData.g_pInst == null) {
            GameData.g_pInst = new GameData();
        }
        return GameData.g_pInst;
    };
    GameData.g_pInst = null; //单例
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map