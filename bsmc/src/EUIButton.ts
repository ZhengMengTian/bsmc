
class EUIButton {
	private static s_dicButton = {};
	private static s_grayColorMatrixFilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter ([0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0]);

	public normalScaleX:number;
	public normalScaleY:number;
	public touchScaleX:number;
	public touchScaleY:number;
	public objBtn:egret.DisplayObject;

	public onPress:Function;
	public onPressObj:Object;
	public onPressParams:any;
	public onClick:Function;
	public onClickObj:Object;
	public onClickParams:any;

	private static grayFilters = [EUIButton.s_grayColorMatrixFilter];
	public get TOUCH_ENABLE ():boolean {return this.objBtn.touchEnabled;}
	public set TOUCH_ENABLE (enable:boolean) {this.objBtn.touchEnabled = enable;}

	public get ENABLE ():boolean {return this.objBtn.touchEnabled;}
	public set ENABLE (enable:boolean) {
		this.objBtn.touchEnabled = enable;
		
		if (enable == true) this.objBtn.filters = null;
		else this.objBtn.filters = EUIButton.grayFilters;
	}

	public get VISIBLE ():boolean {return this.objBtn.visible;}
	public set VISIBLE (visible:boolean) {this.objBtn.visible = visible;}

	public static Create (objBtn:egret.DisplayObject, touchScale:number = 1.1):EUIButton {
		if (!objBtn) return null;
		let btn:EUIButton = EUIButton.s_dicButton[objBtn.hashCode];
		if (btn != null) 
			return btn;
		
		btn = new EUIButton ();
		btn.objBtn = objBtn;
		btn.normalScaleX = objBtn.scaleX;
		btn.normalScaleY = objBtn.scaleY;
		btn.touchScaleX = btn.normalScaleX * touchScale;
		btn.touchScaleY = btn.normalScaleY * touchScale;
		btn.objBtn.touchEnabled = true;
		btn.objBtn.addEventListener (egret.Event.REMOVED, EUIButton.onRemoved, EUIButton)
		btn.objBtn.addEventListener (egret.TouchEvent.TOUCH_TAP, EUIButton.onTouchTap, EUIButton);
		btn.objBtn.addEventListener (egret.TouchEvent.TOUCH_BEGIN, EUIButton.onTouchBegin, EUIButton);        
		EUIButton.s_dicButton[btn.objBtn.hashCode] = btn;
		return btn;
	}

	public static Clean ():void {
		let btn:EUIButton;
		for(let uid in EUIButton.s_dicButton){
			btn = EUIButton.s_dicButton[uid];
			if (btn && btn.objBtn) {
				btn.objBtn.removeEventListener (egret.Event.REMOVED, EUIButton.onRemoved, EUIButton)
				btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_TAP, EUIButton.onTouchTap, EUIButton);
				btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_BEGIN, EUIButton.onTouchBegin, EUIButton);
				btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
				btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
				btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
				btn.objBtn.parent && btn.objBtn.parent.removeChild(btn.objBtn);
			}
		}
		EUIButton.s_dicButton = {};
	}

	private static onRemoved (event:egret.TouchEvent):void {
		let btn = EUIButton.s_dicButton[event.currentTarget.hashCode];
		if (btn && btn.objBtn) {
			btn.objBtn.removeEventListener (egret.Event.REMOVED, EUIButton.onRemoved, EUIButton)
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_TAP, EUIButton.onTouchTap, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_BEGIN, EUIButton.onTouchBegin, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
		}
		delete EUIButton.s_dicButton[event.currentTarget.hashCode];
	}

	private static onTouchTap (event:egret.TouchEvent):void {
		// console.log ("onTouchTap");
		let btn:EUIButton = EUIButton.s_dicButton[event.currentTarget.hashCode];
		if (btn && btn.objBtn.touchEnabled == true && btn.onClick) btn.onClick.apply (btn.onClickObj, btn.onClickParams);
	}

	private static onTouchBegin (event:egret.TouchEvent):void {
		// console.log ("onTouchBegin");
		let btn:EUIButton = EUIButton.s_dicButton[event.currentTarget.hashCode];
		if (btn && btn.objBtn.touchEnabled == true) {
			btn.objBtn.scaleX = btn.touchScaleX;
			btn.objBtn.scaleY = btn.touchScaleY;
			btn.objBtn.addEventListener (egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
			btn.objBtn.addEventListener (egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
			btn.objBtn.addEventListener (egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
			if (btn.onPress) btn.onPress.apply (btn.onPressObj, btn.onPressParams);
		}
	}

	private static onTouchEnd (event:egret.TouchEvent):void {
		// console.log ("onTouchEnd");
		let btn:EUIButton = EUIButton.s_dicButton[event.currentTarget.hashCode];
		if (btn) {
			btn.objBtn.scaleX = btn.normalScaleX;
			btn.objBtn.scaleY = btn.normalScaleY;
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
		}
	}

	private static onTouchCancel (event:egret.TouchEvent):void {
		// console.log ("onTouchCancel");
		let btn:EUIButton = EUIButton.s_dicButton[event.currentTarget.hashCode];
		if (btn) {
			btn.objBtn.scaleX = btn.normalScaleX;
			btn.objBtn.scaleY = btn.normalScaleY;
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
		}
	}

	private static onTouchReleaseOutside (event:egret.TouchEvent):void {
		// console.log ("onTouchReleaseOutside");
		let btn:EUIButton = EUIButton.s_dicButton[event.currentTarget.hashCode];
		if (btn) {
			btn.objBtn.scaleX = btn.normalScaleX;
			btn.objBtn.scaleY = btn.normalScaleY;
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_END, EUIButton.onTouchEnd, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_CANCEL, EUIButton.onTouchCancel, EUIButton);
			btn.objBtn.removeEventListener (egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, EUIButton.onTouchReleaseOutside, EUIButton);
		}
	}

	public SetOnPress (callback:Function, callObj?:Object, params?:any[]):void {
		this.onPress = callback;
		this.onPressObj = callObj;
		this.onPressParams = params;
	}

	public SetOnClick (callback:Function, callObj?:Object, params?:any[]):void {
		this.onClick = callback;
		this.onClickObj = callObj;
		this.onClickParams = params;
	}
}