class Score extends egret.DisplayObjectContainer{
	public num:number;
	public constructor(x:number,y:number,num:number, container:egret.DisplayObjectContainer) {
        super();

		let arr = num.toString().split('');
        let spriteSheet:egret.SpriteSheet = RES.getRes(`score_json`);
		let space = 0;
		this.num = num;

		for (let i = 0; i < arr.length; i++) {
			let numBitmap:egret.Bitmap = new egret.Bitmap();
			numBitmap.texture = spriteSheet.getTexture(arr[i]);
			numBitmap.anchorOffsetX = numBitmap.width / 2;
			numBitmap.anchorOffsetY = numBitmap.height / 2;
			numBitmap.x = x + space;
			numBitmap.y = y;
			this.addChild(numBitmap);
			space += numBitmap.width * 0.85;
		}
		
		this.gone(container);
    }

	//分数飘走消失特效
	private gone(container:egret.DisplayObjectContainer):void {
		let alpha = 1, x = 20;
		let timer = new egret.Timer(50, 0);
        let timerFunc = function() {
			alpha -= 0.05;
            this.alpha = alpha;
			this.x += x;
			x -= 1;
			if (alpha <= 0 ) {
				timer.stop();
				container.removeChild(this);
			}
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.start();
	}
}