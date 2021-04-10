class ComboList extends egret.DisplayObjectContainer {

	public showList = [];  // 显示的连击记录数组，最多5个
	public itemHeight = 65;  // 连击项的高度
	public totalNum = 0;   // 总连击数
	public comboContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer;  // 连击列表的显示容器实例
	public constructor(x:number, y:number) {
		super();

		this.x = x;
		this.y = y;

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.comboContainer.x = 0;
		this.comboContainer.y = -420;
		this.addChild(this.comboContainer);

		//创建底座及背景
		this.createBitmapByName("h5by_xyx_gs_png", 0, -this.stage.stageHeight*0.32);
		this.createBitmapByName("h5by_xyx_zzjmzb_png", 0, 0);
	}

	// 根据资源名添加显示对象
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
	public addOne(eleIndex:number, num:number, fromX:number, fromY:number, maiContainer:egret.DisplayObjectContainer) {
		this.totalNum++;
		if (this.showList.length < 5) {
			// 小于5条则添加投掷即可
			let index = this.showList.push({eleIndex,num}) - 1;
			let point = this.localToGlobal(-40, -90 - this.itemHeight * index);
			let combo = new ComboItem(0,-90 - this.itemHeight * index,eleIndex,num);
			this.showList[index].combo = combo;
			this.addThrow(combo,eleIndex, fromX, fromY, point.x, point.y, maiContainer);
		}
		else {
			// 大于5条时，删除最旧一条，整体下移，并添加投掷动画
			this.removeChild(this.showList[0].combo);
			this.showList = this.showList.slice(1);

			for (let i = 0; i < this.showList.length; i++) {

				let item = this.showList[i].combo;

				let timer = new egret.Timer(30, 10);
				let timerFunc = function() {
					item.y += this.itemHeight / 10;
				};
				timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
				timer.start();
			}

			let index = this.showList.push({eleIndex,num}) - 1;
			let combo = new ComboItem(0,-90 - this.itemHeight * index,eleIndex,num);
			let point = this.localToGlobal(-40, -90 - this.itemHeight * index);
			this.showList[index].combo = combo;
			this.addThrow(combo,eleIndex, fromX, fromY, point.x, point.y, maiContainer);

		}
	}

	//添加投掷动画
	private addThrow(combo:ComboItem,eleIndex:number, fromX:number, fromY:number, toX:number, toY:number, maiContainer:egret.DisplayObjectContainer) {
		var result:egret.Bitmap = new egret.Bitmap();
		var texture:egret.Texture = RES.getRes(`gem_${eleIndex}_png`);
		result.texture = texture;
		result.anchorOffsetX = result.width / 2;
		result.anchorOffsetY = result.height / 2;
		result.x = fromX;
		result.y = fromY;
		maiContainer.addChild(result);

		let g = 5;  // 模拟重力
        let t = 300;
        let deltaT = 30;
        let n = t / deltaT;
        let vX = (toX - fromX) / n;
        let vY = (toY - fromY) / n - g * n / 2;
        let timer = new egret.Timer(deltaT, n);
        let timerFunc = function() {
            result.x += vX;
            result.y += vY;

            vY += g;

        };

		timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
		timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
			maiContainer.removeChild(result);
			this.addChild(combo);
		}, this);
		timer.start();
	}

	//清除所有记录，添加移除的动画
	public clearAll():void {

		if (this.totalNum <= 0) return;
		this.comboContainer.removeChildren();
		this.totalNum = 0;
		for (let i = 0; i < this.showList.length; i++) {

			let combo:ComboItem = this.showList[i].combo;
			let numChild = combo.numChildren;
			for (let j = 1; j < numChild; j++) {
				combo.removeChildAt(1);
			}

			//移除的动画
			let alpha = Math.random() * Math.PI;
			let v = 40;
			let vX = -Math.sin(alpha) * v * 0.5;
			let vY = Math.cos(alpha) * v;
			let timer = new egret.Timer(30, 30);
			let timerFunc = function() {
				combo.x += vX;
				combo.y += vY;
				vY += 5;
			};
			timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
			timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
				this.removeChild(combo);
			}, this);
			timer.start();
		}
		this.showList = [];
	}

	//显示最终连击数
	public showAll():void {

		if (this.totalNum <= 0)return;

		let texture;

		let arr = this.totalNum.toString().split('');
        let spriteSheet:egret.SpriteSheet = RES.getRes(`record_json`);
		let space = -30;

		for (let i = arr.length - 1; i >= 0; i--) {
			
			texture = spriteSheet.getTexture(arr[i]);
			space -= this.createCombo(texture,space,0) * 0.85;
		}

		texture = spriteSheet.getTexture('l');
		this.createCombo(texture,50,10);
	}

	// 添加连击总数的各个数字
	private createCombo(texture:egret.Texture, x:number, y:number) {
        var result:egret.Bitmap = new egret.Bitmap();
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.comboContainer.addChild(result);
		return result.width;
    }
}


// 连击列表中各个子项的类
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