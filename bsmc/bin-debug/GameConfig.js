var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.betArr = [100, 200, 500, 1000]; //倍率列表
    GameConfig.brickNums = [15, 15, 15]; // 各关砖块数
    GameConfig.brickHeight = 28; // 砖块高度
    GameConfig.brickWidth = 26.5; // 砖块宽度
    GameConfig.eliBgHeight = 65; // 元素背景高度
    GameConfig.eliBgWidth = 67; // 元素背景宽度
    GameConfig.eliArea = [
        [3, 1, 4, 4],
        [2, 1, 5, 5],
        [1, 0, 6, 6],
    ];
    GameConfig.eliResourceArr = [
        "main_json.gem_1",
        "main_json.gem_2",
        "main_json.gem_3",
        "main_json.gem_4",
        "main_json.gem_5",
    ];
    GameConfig.eliProp = [0.2, 0.2, 0.2, 0.2, 0.2]; // 各元素出现的概率
    GameConfig.bombProp = [0.9, 0.9, 0.9];
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map