class GameConfig {
	public constructor() {
	}

	public static betArr:Array<number> = [100,200,500,1000];  //倍率列表

	public static brickNums:Array<number> = [15,15,15];  // 各关砖块数

	public static brickHeight:number = 28;  // 砖块高度
	public static brickWidth:number = 26.5;  // 砖块宽度

	public static eliBgHeight:number = 65;  // 元素背景高度
	public static eliBgWidth:number = 67;  // 元素背景宽度

	public static eliArea:Array<Array<number>> = [  // 各关棋盘的区域[起始行index, 起始列index, 行数, 列数]
		[3,1,4,4],
		[2,1,5,5],
		[1,0,6,6],
	];

	public static eliResourceArr:Array<string> = [  // 各元素资源数组
		"main_json.gem_1",
		"main_json.gem_2",
		"main_json.gem_3",
		"main_json.gem_4",
		"main_json.gem_5",
	];

	public static eliProp:Array<number> = [0.2, 0.2, 0.2, 0.2, 0.2];  // 各元素出现的概率

	public static bombProp:Array<number> = [0.9, 0.9, 0.9];

}