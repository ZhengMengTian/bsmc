class GoldCoin extends egret.DisplayObjectContainer {
	public goldCoin:number;  // 当前金币
	public constructor(x:number, y:number, initGoldCoin:number) {
		super();

		this.x = x;
		this.y = y;
		this.goldCoin = initGoldCoin;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.removeChildren();
		let arr = this.goldCoin.toString().split('');
        let spriteSheet:egret.SpriteSheet = RES.getRes(`goldCoin_json`);
		let space = 40;

		// 添加背景框
		let texture:egret.Texture = RES.getRes('h5by_xyx_jbdb-_png');
		let bg = this.createBitmapByTexture(texture,0,-5);
		bg.width *= 6;
		bg.height *= 1.2;

		// 添加金币图形
		texture = spriteSheet.getTexture('coin');
		this.createBitmapByTexture(texture,10,0, 0.4);

		// 添加数字
		for (let i = 0; i < arr.length; i++) {
			texture = spriteSheet.getTexture(arr[i]);
			space += this.createBitmapByTexture(texture,space,0,0.3).width * 0.3;
		}
	}

	// 改变金币数并重绘
	public add(addCoin:number) {
		this.goldCoin += addCoin;
		this.init();
	}

	private createBitmapByTexture(texture:egret.Texture, x:number, y:number, scale:number=1) {
        var result:egret.Bitmap = new egret.Bitmap();
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
		result.scaleX = result.scaleY = scale;
        this.addChild(result);
		return result;
    }
}