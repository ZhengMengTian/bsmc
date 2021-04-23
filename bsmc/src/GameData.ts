class GameData {
	public static g_pInst: GameData = null;  //单例

	private constructor() {
	}

	public static getInst(): GameData {
        if (GameData.g_pInst == null)
        {
            GameData.g_pInst = new GameData();
        }
        return GameData.g_pInst;
    }

	public level:number = 1;  // 当前关卡，初始第一关

    public brickNum:number = GameConfig.brickNums[0];  //当前砖块数

    public bet:number = GameConfig.betArr[0];  // 当前倍率

    public brickDic = {};  // 保存砖块数据

    public eliData:Array<Array<EliBaseItem>> = [];
}