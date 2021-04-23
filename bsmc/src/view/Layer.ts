class Layer {

	private static m_iWidth: number = 0;

	private static m_iHeight: number = 0;

	/**背景层**/
	private static m_pLayerBase: eui.Group = null;
	/**低于效果层的UI层**/
	private static m_pLayerLowUI:eui.Group = null;
	/**效果层**/
	private static m_pLayerEffect:eui.Group = null;
	/**高于效果层的UI层**/
	private static m_pLayerUI: eui.Group = null;
	/**根节点 */
	private static m_pRoot: egret.DisplayObjectContainer = null;
	/**舞台对象**/
	private static m_pStage: egret.Stage = null;

	public constructor() {
	}

	/**初始化游戏层次结构 **/
	public static init(stage: egret.Stage, root: egret.DisplayObjectContainer, width: number, height: number): void {
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
	}

	/**初始化group层根节点 **/
	private static initGroup(group: eui.Group, name: string): void {
		group.name = name;
		group.width = Layer.m_iWidth;
		group.height = Layer.m_iHeight;
		group.touchChildren = true;
		group.touchEnabled = false;
		Layer.m_pRoot.addChild(group);
	}

	public static get LAYER_BASE(): eui.Group {
		return Layer.m_pLayerBase;
	}

	public static get LAYER_LOW_UI(): eui.Group {
		return Layer.m_pLayerLowUI;
	}

	public static get LAYER_EFFECT(): eui.Group {
		return Layer.m_pLayerEffect;
	}

	public static get LAYER_UI(): eui.Group {
		return Layer.m_pLayerUI;
	}
}