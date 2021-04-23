class GameLogic {

	public static g_pInst: GameLogic = null;  //单例

	private constructor() {
	}

	public static getInst(): GameLogic {
		if (GameLogic.g_pInst == null) {
			GameLogic.g_pInst = new GameLogic();
		}
		return GameLogic.g_pInst;
	}

	public btnStart: EUIButton;
	public btnGuaji: EUIButton;
	public btnCancel: EUIButton;
	public btnPoint: EUIButton;

	public layer: Mainlayer;

	public initGame(): void {
		this.layer = Mainlayer.getInst();

		this.btnStart = EUIButton.Create(this.layer.ksImg);
		this.btnGuaji = EUIButton.Create(this.layer.gjImg);
		this.btnCancel = EUIButton.Create(this.layer.qxgjImg);
		this.btnPoint = EUIButton.Create(this.layer.point);

		this.btnStart.SetOnClick(this.OnStartClick, this);
		this.btnGuaji.SetOnClick(this.OnGuajiClick, this);
		this.btnCancel.SetOnClick(this.OnCancelClick, this);
		this.btnPoint.SetOnClick(this.OnPointClick, this);

		this.layer.point.text = 'x' + GameData.getInst().bet;

		this.createBricks();
		this.createEliBg();

	}

	/*
	**点击开始
	*/
	public OnStartClick(): void {
		console.log('kaishi');

		this.layer.ksImg.visible = false;
		this.layer.hsksImg.visible = true;
		this.btnPoint.ENABLE = false;

		this.layer.betBox.Hide();

		this.playAsync();

	}

	/*
	**点击倍率
	*/
	public OnPointClick(): void {
		Mainlayer.getInst().betBox.Switch();
	}

	/*
	**点击挂机
	*/
	public OnGuajiClick(): void {
		this.layer.gjImg.visible = false;
		this.layer.gjzImg.visible = true;
		this.btnCancel.VISIBLE = true;
		if (this.layer.ksImg.visible == true) this.OnStartClick ();
	}

	/*
	**点击取消挂机
	*/
	public OnCancelClick(): void {
		this.layer.gjImg.visible = true;
		this.layer.gjzImg.visible = false;
		this.btnCancel.VISIBLE = false;
	}

	/*
	**生成砖块
	*/
	public createBricks() {
		for (let level = GameData.getInst().level; level<= 3; level++) {
			for (let index = 0; index < GameConfig.brickNums[level - 1]; index++) {
				let point:egret.Point = this.getBrickPos(level, index);
				let brick = new BrickItem(level, point.x, point.y);
				GameData.getInst().brickDic[level*100 + index] = brick;
				this.layer.mainGp.addChild(brick);
			}
		}
	}

	/*
	**获取砖块的位置
	*/
	private getBrickPos(lv:number, step: number):egret.Point {
		if (lv == 1) {
			let startX = 505;
			let startY = 525;
			return new egret.Point (startX, startY - step * GameConfig.brickHeight);
		} else if (lv == 2) {
			let startX = 170;
			let startY = 525;
			return new egret.Point (startX, startY - step * GameConfig.brickHeight);
		} else {
			let startX = 153;
			let startY = 550;
			return new egret.Point (startX + step * GameConfig.brickWidth, startY);
		}
	}

	/*
	**生成元素背景
	*/
	private createEliBg() {
		let config = GameConfig.eliArea[GameData.getInst().level - 1];
		for (let i = config[0]; i < config[0]+config[2]; i++) {
			for (let j = config[1]; j < config[1]+config[3]; j++) {
				let point:egret.Point = this.getEliBgPos(i, j);
				let bg = new EliBgItem(point.x, point.y);
				this.layer.mainGp.addChild(bg);
			}
		}
	}

	/*
	**获取元素背景的位置
	*/
	private getEliBgPos(x:number, y:number):egret.Point {
		let startX = 170;
		let startY = 116;
		return new egret.Point (startX + y * GameConfig.eliBgWidth, startY + x * GameConfig.eliBgHeight);
		
	}

	/*
	**清空元素矩阵
	*/
	private clearEliData() {
		GameData.getInst().eliData = [];
		let config = GameConfig.eliArea[GameData.getInst().level - 1];
		for (let i = config[0]; i < config[0]+config[2]; i++) {
			GameData.getInst().eliData.push([]);
			for (let j = config[1]; j < config[1]+config[3]; j++) {
				GameData.getInst().eliData[i - config[0]].push(null);
			}
		}
	}

	/*
	**开始游戏
	*/
	private async playAsync() {

		this.clearEliData();

		this.createBomb();

		this.fillEmptyEli();

		await this.eliDrop();
		console.log('掉落完毕')

		await this.bombAsync();
	}

	/*
	**生成炸弹
	*/
	private createBomb() {
		let eliData = GameData.getInst().eliData;
		let level = GameData.getInst().level;
		let config = GameConfig.eliArea[level - 1];

		if (Math.random() < GameConfig.bombProp[level - 1]) {
			// 炸弹位置
			let i = Math.floor(Math.random() * config[2]);
			let j = Math.floor(Math.random() * config[3]);

			let point:egret.Point = this.getEliBgPos(i + config[0], j + config[1]);
			let bomb = new EliBombItem(point.x, point.y);
			this.layer.mainGp.addChild(bomb);
			eliData[i][j] = bomb;
		}
	}

	/*
	**填充空的元素矩阵
	*/
	private fillEmptyEli() {
		let eliData = GameData.getInst().eliData;
		let config = GameConfig.eliArea[GameData.getInst().level - 1];
		for (let i = 0; i < config[2]; i++) {
			for (let j = 0; j < config[3]; j++) {
				
				if (!eliData[i][j]) {
					let point:egret.Point = this.getEliBgPos(i + config[0], j + config[1]);
					let eli = new EliNormalItem(point.x, point.y);
					this.layer.mainGp.addChild(eli);
					eliData[i][j] = eli;
				}
			}
		}
	}

	/*
	**未掉落的元素掉落，控制参差不齐掉落
	*/
	private eliDrop() {
		let arr = [];
		let eliData = GameData.getInst().eliData;
		let config = GameConfig.eliArea[GameData.getInst().level - 1];
		for (let i = 0; i < config[2]; i++) {
			for (let j = 0; j < config[3]; j++) {
				let eli = eliData[i][j];
				if (eli.y <= 0) {  // 在空中未掉落
					arr.push(TimerUtil.wait(80 * (config[2] - i - 1) + Math.random() * 50).then(() => {
						return eli.drop();
					}))
				}
			}
		}
		return Promise.all(arr);
	}

	/*
	**炸弹爆炸逻辑
	*/
	private async bombAsync() {
		let eliData = GameData.getInst().eliData;
		let level = GameData.getInst().level;
		let config = GameConfig.eliArea[level - 1];
		for (let i = 0; i < config[2]; i++) {
			for (let j = 0; j < config[3]; j++) {
				let eli = eliData[i][j];
				if (eli.index === -1) {  // 此处是炸弹
					// 获取应该炸的砖块的位置
					let point:egret.Point = this.getBrickPos(level, GameData.getInst().brickNum - 1);
					await (eli as EliBombItem).flyTo(point);
					GameData.getInst().brickDic[level * 100 + GameData.getInst().brickNum - 1].visible = false;
					await (eli as EliBombItem).bomb();
				}
			}
		}
	}
}