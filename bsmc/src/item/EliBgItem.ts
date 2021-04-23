class EliBgItem extends egret.Bitmap {
	public constructor(x:number, y:number) {
		super();
		this.texture = RES.getRes ("main_json.h5by_xyx_fkdb");
		this.x = x;
		this.y = y;
		this.height *= 1.1;
		this.anchorOffsetX = this.width * 0.5;
		this.anchorOffsetY = this.height * 0.5;
		this.visible = true;
	}
}