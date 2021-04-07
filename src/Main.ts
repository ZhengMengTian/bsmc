/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc res模块资源加载示例。
 *      通过创建新的group来加载一组文件。
 */

class Main extends egret.DisplayObjectContainer {

    private mainContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private comboList:ComboList;
    private buttonContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private elemContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private elemBgContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private brickContainer1:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private brickContainer2:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private brickContainer3:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private elementArr;
    private n:number; //棋盘边长
    private minNum:number = 4; // 最少多少个相同宝石可消除

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        
        //加载
        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void {

        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        this.createGameScene();
    }

    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    private onResourceProgress(event:RES.ResourceEvent):void {
        
    }

    //创建游戏场景
    private createGameScene():void {

    
        this.mainContainer.x = this.stage.stageWidth / 2;
        this.mainContainer.y = this.stage.stageHeight / 2;
        this.createBitmapByName("h5by_xyx_zzjm_png", 0, 0, this.mainContainer);

        this.comboList = new ComboList(this.stage.stageWidth * 0.16,this.stage.stageHeight * 0.83);

        this.buttonContainer.x = this.stage.stageWidth * 0.82;
        this.buttonContainer.y = this.stage.stageHeight * 0.8;
        this.createBitmapByName("h5by_xyx_zzjmyb_png", 0, 0, this.buttonContainer);
        this.createBitmapByName("h5by_xyx_ks_png", 20, 20, this.buttonContainer);
        this.enableStartButton();

        this.addChild( this.comboList );
        this.addChild( this.buttonContainer );
        this.addChild( this.mainContainer );

        this.initGame();
    }

    // 启用开始按钮
    private enableStartButton():void{
        let startButton = this.buttonContainer.getChildAt(1) as egret.Bitmap;
        var texture:egret.Texture = RES.getRes("h5by_xyx_ks_png");
        startButton.texture = texture;
        startButton.touchEnabled = true;
        startButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        startButton.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        startButton.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        startButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        startButton.addEventListener(egret.TouchEvent.TOUCH_END, this.startGame, this);
    }

    // 禁用开始按钮
    private disableStartButton():void{
        let startButton = this.buttonContainer.getChildAt(1) as egret.Bitmap;
        var texture:egret.Texture = RES.getRes("h5by_xyx_hsks_png");
        startButton.texture = texture;
        startButton.touchEnabled = false;
    }

    //创建关卡砖块以及棋盘背景
    private initGame(level:number=1):void {

        this.n = 4;
        this.createBitmapByName("h5by_xyx_dyg_png", 10, -265, this.mainContainer);

        this.elemBgContainer.x = -167;
        this.elemBgContainer.y = -195;
        this.mainContainer.addChild(this.elemBgContainer);
        for (let i = 3; i < 7; i++) {
            for (let j = 1; j < 5; j++) {
                this.createElemBg(i, j);
            }
        }

        this.brickContainer1.x = 170;
        this.brickContainer1.y = 205;
        this.mainContainer.addChild(this.brickContainer1);
        this.createBrick1(15);
        this.brickContainer2.x = -165;
        this.brickContainer2.y = 205;
        this.mainContainer.addChild(this.brickContainer2);
        this.createBrick2(15);
        this.brickContainer3.x = -182;
        this.brickContainer3.y = 233;
        this.mainContainer.addChild(this.brickContainer3);
        this.createBrick3(15);

        this.elemContainer.x = -167;
        this.elemContainer.y = -195;
        this.mainContainer.addChild(this.elemContainer);
    }

    //创建棋盘背景
    private createElemBg(i:number, j:number):void {
        let sizeX = 67,sizeY = 64;
        this.createBitmapByName("h5by_xyx_fkdb_png", j * sizeX, i * sizeY, this.elemBgContainer);
    }

    //创建砖块1
    private createBrick1(n:number):void {
        let size = 28;
        for (let i = 0; i < n; i++) {
            this.createBitmapByName("gem_brick01_01_png", 0, -i * size, this.brickContainer1);
        }
    }

    //创建砖块2
    private createBrick2(n:number):void {
        let size = 28;
        for (let i = 0; i < n; i++) {
            this.createBitmapByName("gem_brick01_01_png", 0, -i * size, this.brickContainer2);
        }
    }

    //创建砖块3
    private createBrick3(n:number):void {
        let size = 26.5;
        for (let i = 0; i < n; i++) {
            this.createBitmapByName("h5by_xyx_xbs_png", i * size,0 , this.brickContainer3);
        }
    }

    private touchBegin(evt:egret.TouchEvent):void{
        evt.$target.scaleX = evt.$target.scaleY = 1.1;
    }

    private touchEnd(evt:egret.TouchEvent):void{
        evt.$target.scaleX = evt.$target.scaleY = 1;
    }

    private startGame(evt:egret.TouchEvent):void{
        console.log(evt);
        console.log('游戏开始');
        this.comboList.addOne(1,5);
        this.disableStartButton();

        if (this.elemContainer.numChildren !== 0) {
            //先将原来的宝石移除
            for (let i = 0; i < this.elemContainer.numChildren; i++) {
                let elem = this.elemContainer.getChildAt(i) as MyElement;
                elem.remove(this.elemContainer);
            }
            //再添加新的宝石
            egret.setTimeout(() => {
                this.createElement();
            },0 , 300);
        }
        else {
            this.createElement();
        }
    }

    private createElement():void {

        // 生成宝石
        this.elementArr = [];
        let n = 0;
        for (let i = 0; i < this.n; i++) {
            this.elementArr.push([]);
            for (let j = 0; j < this.n; j++) {
                let bg = this.elemBgContainer.getChildAt(n);
                let elem = new MyElement(bg.x, -this.stage.stageHeight/2, bg.y, n)
                this.elemContainer.addChild(elem);
                this.elementArr[i][j] = elem;
                n++; 
            }
        }

        //宝石掉落
        for (let i = 0; i < this.n; i++) {
            //延时调用,实现宝石分行掉落
            egret.setTimeout(function() {
                for (let j = 0; j < this.n; j++) {
                    //从最底下一行开始掉落
                    this.elementArr[this.n - 1 - i][j].drop();
                }
            }, this, i*100);
        }

        //调用消除逻辑
        egret.setTimeout(() => {this.eliminate();},this,this.n * 100 + 300);
        
    }


    private eliminate() {
        // 计算是否有可消除的
        let arr = this.eliminateCalc();
        console.log(arr);
        if (arr.length > 0) {
            this.eliminateAct(arr);
        }
        else {
            this.enableStartButton();
        }
    }

    //消除计算
    private eliminateCalc() {
        let elementArr = [], dp = [null], reslut = [];
        let n = this.elementArr.length,m = this.elementArr[0].length;

        //增加边界
        elementArr.push([]);
        for (let i = 0; i <= m; i++) {
            elementArr[0][i] = {eleIndex: -1};
        }
        for (let i = 0; i < n; i++) {
            elementArr.push([{eleIndex: -1}].concat(this.elementArr[i]));
        }

        for (let i = 1; i < n + 1; i++) {
            dp.push([null]);
            for (let j = 1; j < m + 1; j++) {
                dp[i][j] = [{i:i,j:j}];
                if (elementArr[i][j].eleIndex === elementArr[i][j-1].eleIndex && elementArr[i][j].eleIndex === elementArr[i-1][j].eleIndex) {
                    if (dp[i-1][j] === dp[i][j-1]) {
                        let arr = dp[i][j-1].concat(dp[i][j]);
                        arr.forEach((value) => {
                            dp[value.i][value.j] = arr;
                        });
                    }
                    else {
                        let arr = dp[i][j-1].concat(dp[i-1][j]).concat(dp[i][j]);
                        arr.forEach((value) => {
                            dp[value.i][value.j] = arr;
                        });
                    }
                }
                else if (elementArr[i][j].eleIndex === elementArr[i][j-1].eleIndex) {
                    let arr = dp[i][j-1].concat(dp[i][j]);
                    arr.forEach((value) => {
                        dp[value.i][value.j] = arr;
                    });
                }
                else if (elementArr[i][j].eleIndex === elementArr[i-1][j].eleIndex) {
                    let arr = dp[i-1][j].concat(dp[i][j]);
                    arr.forEach((value) => {
                        dp[value.i][value.j] = arr;
                    });
                }
            }
        }

        //整理出应该被消除的宝石坐标
        for (let i = 1; i < n + 1; i++) {
            for (let j = 1; j < m + 1; j++) {
                if (dp[i][j].length >= this.minNum && reslut.indexOf(dp[i][j]) === -1) {
                    reslut.push(dp[i][j]);
                } 
            }
        }
        reslut.forEach((value) => {
            value.forEach((v) => {
                v.i--;
                v.j--;
            })
        })

        return reslut;
    }

    //执行消除
    private eliminateAct(arr) {
        if (arr.length>0) {
            let element = this.elementArr[arr[0][0].i][arr[0][0].j];
            var point:egret.Point = this.elemContainer.localToGlobal(element.x,element.y);

            //生成分数
            let score = new Score(point.x, point.y, this.getScore(arr[0].length), this);
            this.addChild(score);

            //消除
            arr[0].forEach(v => {
                this.elementArr[v.i][v.j].eliminate(this.elemContainer);
                this.elementArr[v.i][v.j] = null;
            })
            egret.setTimeout(() => {this.eliminateAct(arr.slice(1))},this,300);
        }
        else {

            // 消除完毕
            this.sortOut();
            this.fillEmpty();
            //调用消除逻辑
            egret.setTimeout(() => {this.eliminate();},this,this.n * 100 + 200);
        }
    }

    // 分数规则
    private getScore(l:number):number {
        return l*100;
    }

    // 整理棋盘
    private sortOut() {
        let m = this.elementArr.length,n = this.elementArr[0].length;
        let dp = [], empty = [];
        for (let i = 0; i < n; i++) {
            empty[i] = 0;
        }

        for (let i = m - 1; i >= 0; i--) {
            dp[i] = [];
            for (let j = n - 1; j >= 0; j--) {
                dp[i][j] = 0;
                if (this.elementArr[i][j]) {
                    if ( empty[j] > 0) {
                        let bg = this.elemBgContainer.getChildAt((i+empty[j])*this.n+j);
                        this.elementArr[i][j].dropTo(bg.x, bg.y);
                        this.elementArr[i+empty[j]][j] = this.elementArr[i][j];
                        this.elementArr[i][j] = null;
                    }
                }
                else {
                    empty[j]++;
                }
            }
        }
    }

    //填充空位
    private fillEmpty():void {
        let m = this.elementArr.length,n = this.elementArr[0].length;

        for (let i = m - 1; i >= 0; i--) {
            egret.setTimeout(() => {
                for (let j = n - 1; j >= 0; j--) {
                    if (!this.elementArr[i][j]) {
                        let bg = this.elemBgContainer.getChildAt(i * this.n + j);
                        let elem = new MyElement(bg.x, -this.stage.stageHeight/3, bg.y, i * this.n + j)
                        this.elemContainer.addChild(elem);
                        this.elementArr[i][j] = elem;
                        elem.drop();
                    }
                }
            }, this, (m - i - 1)*50);
        }
    }

    private createBitmapByName(name:string, x:number, y:number, container:egret.DisplayObjectContainer, offset:boolean=true):void {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        container.addChild(result);
    }
}