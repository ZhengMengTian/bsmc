class BetBox extends egret.DisplayObjectContainer {
	private m_arrItem: Array<BetItem> = new Array<BetItem>();
	private m_isShowing: boolean;

	public constructor() {
		super();
		this.m_isShowing = false;
	}

	public Init(): void {
		let arrPoint: Array<number> = GameConfig.betArr;
		let item: BetItem;
		for (let i = 0; i < arrPoint.length; ++i) {
			if (arrPoint[i] == 0) break;
			item = new BetItem(arrPoint[i], this);
			item.visible = false;
			this.m_arrItem.push(item);
			this.addChild(item);
		}
	}

	public OnClick(iPoint: number): void {
		GameData.getInst().bet = iPoint;
		Mainlayer.getInst().point.text = 'x' + iPoint;
		this.Hide();
	}

	public Switch(): void {
		if (this.m_isShowing == true) this.Hide();
		else this.Show();
	}

	public Show(): void {
		let item: BetItem;
		for (let i = 0; i < this.m_arrItem.length; ++i) {
			item = this.m_arrItem[i];
			egret.Tween.removeTweens(item);
			egret.Tween.get(item).to({ visible: true }, 0).to({ alpha: 1, y: -45 * i }, 200);
			item.m_btn.TOUCH_ENABLE = true;
		}
		this.m_isShowing = true;
	}

	public Hide(): void {
		if (this.visible == false) return;
		let item: BetItem;
		for (let i = 0; i < this.m_arrItem.length; ++i) {
			item = this.m_arrItem[i];
			egret.Tween.removeTweens(item);
			egret.Tween.get(item).to({ alpha: 0, y: 0 }, 200).to({ visible: true }, 0);
			item.m_btn.TOUCH_ENABLE = false;
		}
		this.m_isShowing = false;
	}
}

class BetItem extends egret.DisplayObjectContainer {

	private m_imgBg:egret.Bitmap;
	private m_fntPoint:egret.BitmapText;
	public m_btn:EUIButton;
	private m_iPoint:number;
	private m_box:BetBox;

	public constructor (iPoint:number, box:BetBox) {
		super ();
		this.m_imgBg = new egret.Bitmap ();
		this.m_imgBg.texture = RES.getRes ("main_json.h5by_xyx_sbdb");
		this.m_imgBg.scale9Grid = new egret.Rectangle(14, 14, 2, 2);
		this.m_imgBg.width = 180;
		this.m_imgBg.height = 40;
		this.m_imgBg.anchorOffsetX = this.m_imgBg.width * 0.5;
		this.m_imgBg.anchorOffsetY = this.m_imgBg.height * 0.5;
		this.addChild (this.m_imgBg);
		this.m_fntPoint = new egret.BitmapText;
		this.m_fntPoint.font = RES.getRes ("combo_fnt");
		this.m_fntPoint.textAlign = egret.HorizontalAlign.CENTER;
		this.m_fntPoint.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.m_fntPoint.width = 250;
		this.m_fntPoint.height = 40;
		this.m_fntPoint.anchorOffsetX = this.m_fntPoint.width * 0.5;
		this.m_fntPoint.anchorOffsetY = this.m_fntPoint.height * 0.5;
		this.m_fntPoint.letterSpacing = -13;
		this.addChild (this.m_fntPoint);
		this.m_btn = EUIButton.Create (this);
		this.m_btn.SetOnClick (this.OnClick, this);
		this.m_iPoint = iPoint;
		this.m_fntPoint.text = this.m_iPoint+'';
		this.m_box = box;
	}

	public OnClick():void {
		this.m_box.OnClick (this.m_iPoint);
	}

}