class MyElement extends egret.Bitmap {

    public eleIndex:number;  // 宝石类型，炸弹是-1
    public to:number;  // 记录宝石将掉落的终点坐标

    private rate = [0.2, 0.2, 0.2, 0.2, 0.2];  // 各元素出现概率，一共5种元素


    public constructor(x:number,y:number,to:number,n:number, isBomb:boolean=false) {
        super();

        this.to = to;

        if (isBomb) {
            this.eleIndex = -1;
        }
        else {
            //随机颜色算法
            let random = Math.random();
            let sum = 0;
            for (let i = 0; i < this.rate.length; i++) {
                sum += this.rate[i];
                this.eleIndex = i;
                if (sum >= random) break;
            }

            this.eleIndex++;  // 宝石类型从1开始，所以下标+1
        }
        

        var texture:egret.Texture = isBomb?RES.getRes(`gem_bomb_png`):RES.getRes(`gem_${this.eleIndex}_png`);
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

    //掉落效果2，填充空位时掉落
    public dropTo(x:number, y:number):void {

        egret.Tween.get(this).to({x: x,y: y+10}, 200, egret.Ease.sineIn).to({x: x,y: y-10}, 40, egret.Ease.sineIn).to({x: x,y: y}, 40, egret.Ease.sineIn);
    }

    //移除效果
    public remove(elemContainer:egret.DisplayObjectContainer):void {

        let alpha = Math.random() * Math.PI * 2;  //随机角度
        let v = 20;
        let vX = Math.sin(alpha) * v;
        let vY = Math.cos(alpha) * v;
        let timer = new egret.Timer(30, 30);
        let timerFunc = function() {
            this.x += vX;
            this.y += vY;
            vY += 5;  // 模拟重力
        };

        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
             //从显示容器中移除
            if (elemContainer.contains(this)) {
                elemContainer.removeChild(this);
            }
        }, this);
        timer.start();

    }

    //消除效果动画
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
             //从显示容器中移除
            if (elemContainer.contains(this)) {
                elemContainer.removeChild(this);
            }
        }, this);
        timer.start();
    }

    //炸弹飞行
    public bombFly(toX:number, toY:number, container:egret.DisplayObjectContainer, main:Main) {

        container.setChildIndex( this, 100 );  //将炸弹的层级提升，以免被其他宝石遮挡

        let fromX = this.x, fromY = this.y;
        toY += 30;  // 终点的y坐标加上砖块的高度，否则会在砖块上方爆炸
        let g = 5;
        let t = 510;
        let deltaT = 30;
        let n = t / deltaT;

        // 计算vX、vY确保n次循环后飞至终点
        let vX = (toX - fromX) / n;
        let vY = (toY - fromY) / n - g * n / 2;

        let timer = new egret.Timer(deltaT, n);
        let timerFunc = function() {

            this.x += vX;
            this.y += vY;

            vY += g;  // 模拟重力
            
            // 飞行过程中缩小
            this.scaleX -= 0.01;
            this.scaleY -= 0.01;
            // 飞行过程中旋转
            this.rotation += 30;
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
            
            // 飞行到终点后爆炸
            this.bomb(container, main);
        }, this);
        timer.start();
    }

    //炸弹爆炸
    private bomb(container:egret.DisplayObjectContainer, main:Main) {
        var texture:egret.SpriteSheet = RES.getRes(`bomb_json`);
        let timer = new egret.Timer(50, 20);
        let index = 0;
        this.rotation = 0;  // 把飞行过程中的旋转量回正
        let timerFunc = function() {
            this.texture = texture.getTexture(`elem_bomb_${index}`);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            index++;
            if (index === 5) {
                // 爆炸动画播放至第5帧时调用爆炸后逻辑，包括清除砖块进入下一关等
                main.afterBomb();
            }
        };
        timer.addEventListener(egret.TimerEvent.TIMER, timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
             if (container.contains(this)) {
                container.removeChild(this);
            }
        }, this);
        timer.start();
    }
}