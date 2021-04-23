class eventUtil {
	public constructor() {
	}

	private static evtPool = {};

	public static addEventListener(target:egret.EventDispatcher ,event:string, cb:Function, caller:any):void {
		let callBack:Function;
		if (event === egret.TouchEvent.TOUCH_BEGIN) {
			callBack = function(evt:egret.TouchEvent) {
				evt.currentTarget.scaleX = evt.currentTarget.scaleY = 1.1;
				cb.call(this);
			}
		}
		else {
			callBack = cb;
		}

		let remember = new EventRemember(target, event, cb, callBack, caller);
		eventUtil.evtPool[remember.myEvtId] = remember;
		target.addEventListener(event, callBack, caller);
	}

	public static removeEventListener(target:egret.EventDispatcher ,event:string, cb:Function, caller:any):void {
		let key = eventUtil.getRememberKey(target ,event, cb, caller);
		if (key) {
			let remember = eventUtil.evtPool[key];
			target.removeEventListener(remember.event,remember.cb2,remember.caller);

			delete eventUtil.evtPool[key];
		}
	}

	private static getRememberKey(target:egret.EventDispatcher ,event:string, cb:Function, caller:any) {
		for (let key in eventUtil.evtPool) {
			let remember = eventUtil.evtPool[key];
			if (remember.target === target && remember.event === event && remember.cb === cb && remember.caller === caller) {
				return key;
			}
		}
		return null;
	}
}

class EventRemember extends egret.HashObject{
	public static evtId:number = 10000;
	public myEvtId:number = EventRemember.evtId++;
	public constructor(public target:egret.EventDispatcher, public evt:string, public cb:Function, public cb2:Function, public caller:any) {
		super();
	}
}