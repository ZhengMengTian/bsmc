//右侧操作台类

class OperationDesk extends egret.DisplayObjectContainer {

	private main;
	private button1;
	private button2;
	private pointContainer:egret.DisplayObjectContainer;
	private pointListContainer:egret.DisplayObjectContainer;	
	private listIsShow:boolean = false;
	private pointList = [100000,200000, 500000, 1000000, 2000000, 5000000, 10000000]
	public point;  //当前倍率

	public constructor(x:number, y:number, main:Main) {
		super();

		this.x = x;
		this.y = y;
		this.main = main;
		this.point = this.pointList[0];

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {

		this.createBitmapByName("h5by_xyx_zzjmyb_png", 0, 0);

		this.pointContainer = new egret.DisplayObjectContainer();
		this.pointContainer.y = -50;
		this.setPoint(this.point);
		this.addChild(this.pointContainer);	
		this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
		this.pointContainer.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{
			if (this.listIsShow) {
				
				this.hideList();
			}
			else {
				
				this.showList();
			}
		}, this);

		this.initList();

        this.button1 = this.createBitmapByName("h5by_xyx_ks_png", 20, 20);
        this.button2 = this.createBitmapByName("h5by_xyx_gj_png", 20, 80);
		this.enableStartButton();
		this.enableGj();

		
	}

	// 启用倍率选择按钮
	private enablePoint() {
		this.pointContainer.filters = [];
		this.pointContainer.touchEnabled = true;
	}

	// 停用倍率选择按钮
	private disablePoint() {
		var colorMatrix = [
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.pointContainer.filters = [colorFlilter];
		this.pointContainer.touchEnabled = false;
	}

	//初始化倍率列表
	private initList() {
		this.pointListContainer = new egret.DisplayObjectContainer();
		this.pointListContainer.y = -120;

		for (let i = 0; i < this.pointList.length; i++) {
			let container = new egret.DisplayObjectContainer();

			let arr = this.pointList[i].toString().split('');
			let spriteSheet:egret.SpriteSheet = RES.getRes(`combo_json`);
			//根据数字长度决定显示位置		
			let base = 20 - arr.length / 2 * 20;
			let space = 0;

			let texture:egret.Texture = RES.getRes('h5by_xyx_sbdb_png');
			let bg = this.createBitmapByTexture(texture,-70,-5,container);
			bg.width *= 8;
			bg.height *= 1.2;

			for (let i = 0; i < arr.length; i++) {
				texture = spriteSheet.getTexture(arr[i]);
				space += this.createBitmapByTexture(texture,base+space,0, container).width * 0.7;
			}

			container.alpha = 0;
			this.pointListContainer.addChild(container);

			//添加点击事件
			container.touchEnabled = true;
			container.addEventListener(egret.TouchEvent.TOUCH_END, () => {this.setPoint(this.pointList[i]);this.hideList();}, this)
		}

	}

	// 启用开始按钮
    public enableStartButton():void{
		this.enablePoint();
        this.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_ks_png", 20, 20);
        this.button1.touchEnabled = true;
        this.button1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{this.main.startGame();this.disableStartButton();}, this);
    }

    // 禁用开始按钮
    public disableStartButton():void{
		this.disablePoint();
        this.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_hsks_png", 20, 20);
    }

    // 启用挂机按钮
    public enableGj() {
        this.removeChild(this.button2);
        this.button2 = this.createBitmapByName("h5by_xyx_gj_png", 20, 80);
        this.button2.touchEnabled = true;
        this.button2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button2.addEventListener(egret.TouchEvent.TOUCH_END, ()=>{this.main.gj();this.disableGj();}, this);
    }

    // 禁用挂机按钮&添加取消挂机按钮
    public disableGj() {
		this.disablePoint();
        this.removeChild(this.button2);
        this.button2 = this.createBitmapByName("h5by_xyx_gjz_png", 20, 80);
        

        this.removeChild(this.button1);
        this.button1 = this.createBitmapByName("h5by_xyx_qxgj_png", 20, 20);
        this.button1.touchEnabled = true;
        this.button1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.button1.addEventListener(egret.TouchEvent.TOUCH_END, this.main.gjCancel, this.main);
    }

	// 设置倍率
	private setPoint(newPont:number) {
		this.point = newPont;
		this.pointContainer.removeChildren();

		let arr = this.point.toString().split('');
        let spriteSheet:egret.SpriteSheet = RES.getRes(`point_json`);
		//根据数字长度决定显示位置		
		let base = -20 - arr.length / 2 * 10;
		let space = 20;

		let texture = spriteSheet.getTexture('x');
		this.createBitmapByTexture(texture,base,0,this.pointContainer);

		for (let i = 0; i < arr.length; i++) {
			texture = spriteSheet.getTexture(arr[i]);
			space += this.createBitmapByTexture(texture,base+space,0, this.pointContainer).width * 0.65;
		}
	}

	//显示倍率列表
	private showList() {
		this.listIsShow = true;
		this.addChild(this.pointListContainer);
		for (let i = 0; i < this.pointListContainer.numChildren; i++) {

			let item = this.pointListContainer.getChildAt(i);
			//上移的动画
			let timer = new egret.Timer(8, 11);
			let l = i * 45;
			let timerFunc = function() {
				item.y -= l / 10;
				item.alpha += 0.1;
			};
			timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
			timer.start();
		}
	}

	//隐藏倍率列表
	private hideList() {
		this.listIsShow = false;
		for (let i = 0; i < this.pointListContainer.numChildren; i++) {

			let item = this.pointListContainer.getChildAt(i);
			//下移的动画
			let timer = new egret.Timer(8, 11);
			let l = item.y;
			let timerFunc = function() {
				item.y -= l / 10;
				item.alpha -= 0.1;
			};
			timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
			timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
				if (this.contains(this.pointListContainer)) {
					this.removeChild(this.pointListContainer);
				}
			}, this)
			timer.start();
		}
	}

	private createBitmapByName(name:string, x:number, y:number) {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
		return result;
    }

	private createBitmapByTexture(texture:egret.Texture, x:number, y:number, container:egret.DisplayObjectContainer) {
        var result:egret.Bitmap = new egret.Bitmap();
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        container.addChild(result);
		return result;
    }

	private touchBegin(evt:egret.TouchEvent):void{
        evt.$target.scaleX = evt.$target.scaleY = 1.1;
    }

    private touchEnd(evt:egret.TouchEvent):void{
        evt.$target.scaleX = evt.$target.scaleY = 1;
    }
}