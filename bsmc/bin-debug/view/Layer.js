var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Layer = (function () {
    function Layer() {
    }
    /**初始化游戏层次结构 **/
    Layer.init = function (stage, root, width, height) {
        Layer.m_pStage = stage;
        Layer.m_pRoot = root;
        Layer.m_iWidth = width;
        Layer.m_iHeight = height;
        Layer.m_pLayerBase = new eui.Group();
        Layer.initGroup(Layer.m_pLayerBase, "layerBase");
        Layer.m_pLayerLowUI = new eui.Group();
        Layer.initGroup(Layer.m_pLayerLowUI, "layerLowUI");
        Layer.m_pLayerEffect = new eui.Group();
        Layer.initGroup(Layer.m_pLayerEffect, "layerEffect");
        Layer.m_pLayerUI = new eui.Group();
        Layer.initGroup(Layer.m_pLayerUI, "layerUI");
    };
    /**初始化group层根节点 **/
    Layer.initGroup = function (group, name) {
        group.name = name;
        group.width = Layer.m_iWidth;
        group.height = Layer.m_iHeight;
        group.touchChildren = true;
        group.touchEnabled = false;
        Layer.m_pRoot.addChild(group);
    };
    Object.defineProperty(Layer, "LAYER_BASE", {
        get: function () {
            return Layer.m_pLayerBase;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer, "LAYER_LOW_UI", {
        get: function () {
            return Layer.m_pLayerLowUI;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer, "LAYER_EFFECT", {
        get: function () {
            return Layer.m_pLayerEffect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer, "LAYER_UI", {
        get: function () {
            return Layer.m_pLayerUI;
        },
        enumerable: true,
        configurable: true
    });
    Layer.m_iWidth = 0;
    Layer.m_iHeight = 0;
    /**背景层**/
    Layer.m_pLayerBase = null;
    /**低于效果层的UI层**/
    Layer.m_pLayerLowUI = null;
    /**效果层**/
    Layer.m_pLayerEffect = null;
    /**高于效果层的UI层**/
    Layer.m_pLayerUI = null;
    /**根节点 */
    Layer.m_pRoot = null;
    /**舞台对象**/
    Layer.m_pStage = null;
    return Layer;
}());
__reflect(Layer.prototype, "Layer");
//# sourceMappingURL=Layer.js.map