class EliBaseItem extends egret.Bitmap {

	public constructor(public finalX:number, public finalY:number,res:string, public index:number) {
		super();
		this.texture = RES.getRes (res);
		this.x = finalX;
		this.y = 0;
		this.anchorOffsetX = this.width * 0.5;
		this.anchorOffsetY = this.height * 0.5;
	}

	/*
	**掉落
	*/
	public drop () {
		return new Promise(resolve=>{
			egret.Tween.get(this)
			.to({y: this.finalY+10}, 300, egret.Ease.sineIn)
			.to({y: this.finalY-10}, 50, egret.Ease.sineIn)
			.to({y: this.finalY}, 50, egret.Ease.sineIn)
			.call(resolve);
		})
	}
}