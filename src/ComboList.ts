class ComboList extends egret.DisplayObjectContainer {

	public history = [];
	public itemHeight = 65;
	public constructor(x:number, y:number) {
		super();

		this.x = x;
		this.y = y;

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.createBitmapByName("h5by_xyx_gs_png", 0, -this.stage.stageHeight*0.32);
		this.createBitmapByName("h5by_xyx_zzjmzb_png", 0, 0);
	}

	private createBitmapByName(name:string, x:number, y:number):void {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
    }

	//增加一条记录
	public addOne(eleIndex:number, num:number):void {

		if (this.history.length < 5) {
			let index = this.history.push({eleIndex,num}) - 1;
			this.addChild(new ComboItem(0,-90 - this.itemHeight * index,eleIndex,num));
		}
	}

	//清除所有记录
	public clearAll():void {

	}

	//显示最终连击数
	public showAll():void {

	}
}

class ComboItem extends egret.DisplayObjectContainer {
	public constructor(x:number, y:number, eleIndex:number, num:number) {
		super();

		this.x = x;
		this.y = y;

		let texture = RES.getRes(`gem_${eleIndex}_png`);
		this.createBitmapByTexture(texture,-40,0);

		let arr = num.toString().split('');
        let spriteSheet:egret.SpriteSheet = RES.getRes(`combo_json`);
		let space = 50;

		
		texture = spriteSheet.getTexture('x');
		this.createBitmapByTexture(texture,10,0);

		for (let i = 0; i < arr.length; i++) {
			
			texture = spriteSheet.getTexture(arr[i]);
			space += this.createBitmapByTexture(texture,space,0) * 0.85;
		}
	}

	private createBitmapByTexture(texture:egret.Texture, x:number, y:number) {
        var result:egret.Bitmap = new egret.Bitmap();
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
		return result.width;
    }
	
}