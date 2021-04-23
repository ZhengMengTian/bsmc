class Mainlayer extends eui.Component {

	public static g_pInst: Mainlayer = null;  //单例

	private constructor() {
		super();

		this.skinName = "mainSkin";
	}

	public static getInst(): Mainlayer {
        if (Mainlayer.g_pInst == null)
        {
            Mainlayer.g_pInst = new Mainlayer();
        }
        return Mainlayer.g_pInst;
    }

	protected childrenCreated(): void{
		super.childrenCreated();

		GameLogic.getInst().initGame();

		this.createBetBox();



	}

	public betBox:BetBox; // 倍率选择框

	public eliBgLayer:egret.DisplayObjectContainer;

	public mainGp:eui.Group = null;
	public opGp:eui.Group = null;
	public lvImg:eui.Image = null;
	public ksImg:eui.Image = null;
	public hsksImg:eui.Image = null;
	public qxgjImg:eui.Image = null;
	public gjImg:eui.Image = null;
	public gjzImg:eui.Image = null;
	public point:eui.BitmapLabel = null;

	/*
	**生成倍率选择框
	*/
	public createBetBox():void {
		this.betBox = new BetBox();
		this.betBox.x = 160;
		this.betBox.y = 290;
		this.opGp.addChild(this.betBox);
		this.betBox.Init();
	}
}