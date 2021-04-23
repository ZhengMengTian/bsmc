class BrickItem extends egret.Bitmap {
	public constructor(level:number, x:number, y:number) {
		super();
		if (level == 3) this.texture = RES.getRes ("main_json.h5by_xyx_xbs");
		else this.texture = RES.getRes ("main_json.gem_brick01_01");
		this.x = x;
		this.y = y;
		this.anchorOffsetX = this.width * 0.5;
		this.anchorOffsetY = this.height * 0.5;
		this.visible = true;
	}
}