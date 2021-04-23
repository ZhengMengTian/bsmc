class EliNormalItem extends EliBaseItem {

	public constructor(x:number, y:number) {
		 //随机颜色算法
		let eliProp = GameConfig.eliProp;
		let random = Math.random();
		let sum = 0;
		let index = 0;
		for (let i = 0; i < eliProp.length; i++) {
			sum += eliProp[i];
			index = i;
			if (sum >= random) break;
		}
		super(x,y,GameConfig.eliResourceArr[index], index);

	}
}