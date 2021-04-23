class TimerUtil extends egret.HashObject{
	public constructor() {
		super();
	}

	public static wait(time:number):Promise<any> {
		return new Promise(resolve => {
			setTimeout(resolve, time);
		})
	}
}