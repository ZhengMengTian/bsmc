class EliBombItem extends EliBaseItem {

	public constructor(x:number, y:number) {
		super(x,y,"main_json.gem_bomb", -1);
	}

	public get factor():number{
		return 0;
	}

	public set factor(value:number) {
		this.x = (1 - value) * (1 - value) * this.P0.x + 2 * value * (1 - value) * this.P1.x + value * value * this.P2.x;
        this.y = (1 - value) * (1 - value) * this.P0.y + 2 * value * (1 - value) * this.P1.y + value * value * this.P2.y;
		
		this.scaleX -= 0.01;
		this.scaleY -= 0.01;

		this.rotation += 30;
	}

	private P0:egret.Point;
	private P1:egret.Point;
	private P2:egret.Point;

	public flyTo(point:egret.Point) {
		this.P0 = this.parent.localToGlobal(this.x, this.y);
		this.P2 = this.parent.localToGlobal(point.x, point.y);
		this.P1 = new egret.Point(this.P0.x + (this.P2.x - this.P0.x) * Math.random(), Math.min(this.P0.y, this.P2.y) - Math.random() * 200 - 100);

		this.parent.removeChild(this);
		Layer.LAYER_EFFECT.addChild(this);

		return new Promise(resolve => {
			egret.Tween.get(this)
			.to({factor: 1}, 600).call(resolve);
		})
	}

	public bomb() {
		this.scaleX = this.scaleY = 1;
		this.rotation = 0;

		var sheet:egret.SpriteSheet = RES.getRes(`bomb_json`);
        let timer = new egret.Timer(50, 20);
        let index = 0;
        let timerFunc = function() {
            this.texture = sheet.getTexture(`elem_bomb_${index}`);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            index++;
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
             this.parent.removeChild(this);
        }, this);
        timer.start();
	}
}