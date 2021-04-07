class MyElement extends egret.Bitmap {

    public eleIndex:number;
    public to:number;
    public n:number;
    public constructor(x:number,y:number,to:number,n:number) {
        super();

        this.to = to;
        this.n = n;

        //随机颜色
        this.eleIndex = Math.floor(Math.random()*5+1);

        var texture:egret.Texture = RES.getRes(`gem_${this.eleIndex}_png`);
        this.texture = texture;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = x;
        this.y = y;

    }

    //掉落效果
    public drop():void {

        //利用wait实现一行宝石参差不齐掉落
        egret.Tween.get(this).wait(Math.random()*100).to({x: this.x,y: this.to+10}, 300, egret.Ease.sineIn).to({x: this.x,y: this.to-10}, 50, egret.Ease.sineIn).to({x: this.x,y: this.to}, 50, egret.Ease.sineIn);
    }

    //掉落效果2
    private dropTo(x:number, y:number):void {

        egret.Tween.get(this).to({x: x,y: y+10}, 200, egret.Ease.sineIn).to({x: x,y: y-10}, 40, egret.Ease.sineIn).to({x: x,y: y}, 40, egret.Ease.sineIn);
    }

    //移除效果
    public remove(elemContainer:egret.DisplayObjectContainer):void {
        let x = (Math.random()-0.5)*10
        let funcChange = ():void => {
            this.x += x;
        };
        egret.Tween.get(this, { onChange:funcChange, onChangeObj:this })
        .to({y: this.stage.stageHeight}, 500, egret.Ease.backIn)
        .call(() => {
            //从显示容器中移除
            if (elemContainer.contains(this)) {
                elemContainer.removeChild(this);
            }
        });
    }

    //消除效果
    public eliminate(elemContainer:egret.DisplayObjectContainer) {
        var texture:egret.SpriteSheet = RES.getRes(`elem_eli_${this.eleIndex}_json`);
        let timer = new egret.Timer(50, 9);
        let index = 0;
        let timerFunc = function() {
            this.texture = texture.getTexture(`elem_eli_${this.eleIndex}_${index}`);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            index++;
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
            if (elemContainer.contains(this)) {
                elemContainer.removeChild(this);
            }
        }, this);
        timer.start();
    }
}