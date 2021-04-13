
class Main extends egret.DisplayObjectContainer {

    private mainContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private comboList:ComboList;  // 连击显示区实例
    private operationDesk:OperationDesk;  // 操作台实例
    private goldCoin:GoldCoin;  // 金币显示区实例
    private elemContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();  //宝石元素的显示容器
    private elemBgContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();  //宝石背景的显示容器
    private brickContainer1:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();  //第一关砖块的显示容器
    private brickContainer2:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();  //第二关砖块的显示容器
    private brickContainer3:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();  //第三关砖块的显示容器
    
    private elementArr;  //用于管理整个棋盘的元素的状态，计算可消除元素
    
    private level = 1;  //初始关卡
    private brickNum;  // 砖块数量
    private n:number; //棋盘边长
    private minNum:number = 2; // 最少多少个相同宝石可消除
    private bombProb = [0.9, 0.9, 0.9];  //三关的炸弹生成概率
    private initGoldCoin:number = 100000000; //初始金币

    private running:boolean = false;  //游戏是否正在进行中
    private auto:boolean = false;  //是否正在挂机

    private hasBomb = false;  // 是否有炸弹

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

        this.comboList = new ComboList(this.stage.stageWidth * 0.16,this.stage.stageHeight * 0.83);
        
        this.operationDesk = new OperationDesk(this.stage.stageWidth * 0.82,this.stage.stageHeight * 0.8, this);

        this.goldCoin = new GoldCoin(this.stage.stageWidth * 0.02,this.stage.stageHeight * 0.05, this.initGoldCoin)

        this.addChild( this.comboList );
        this.addChild( this.operationDesk );
        this.addChild( this.goldCoin );
        this.addChild( this.mainContainer );

        this.initGame(this.level);
    }

    //点击挂机处理函数
    public touchHandlerGj() {
        
        if (this.running) {
            //如果游戏正在进行中，则置auto为true即可
            this.auto = true;
        }
        else {
            //如果游戏未在进行中，则置auto未true同时调用开始游戏函数
            this.auto = true;
            this.startGame();
        }
        
    }

    //点击取消挂机的处理函数
    public touchHandlerGjCancel() {
        
        this.auto = false;

        //重设按钮状态
        this.operationDesk.disableStartButton();
        this.operationDesk.enableGj();
    }

    //创建关卡砖块以及棋盘背景，在每个关卡初始化时调用
    private initGame(level:number=1):void {

        //先清空宝石状态管理数组和各个显示容器
        this.elementArr = [];
        this.mainContainer.removeChildren();
        this.elemContainer.removeChildren();
        this.elemBgContainer.removeChildren();
        this.brickContainer1.removeChildren();
        this.brickContainer2.removeChildren();
        this.brickContainer3.removeChildren();

        this.createBitmapByName("h5by_xyx_zzjm_png", 0, 0, this.mainContainer);  //创建整个棋盘的背景

        switch (level) {
            case 1: 
                this.brickNum = 15;  //第一关砖块15个
                this.n = 4;  //第一关棋盘为4*4
                this.createBitmapByName("h5by_xyx_dyg_png", 10, -265, this.mainContainer);  //关卡标题
                this.elemBgContainer.x = -167;
                this.elemBgContainer.y = -195;
                this.mainContainer.addChild(this.elemBgContainer);

                // 第一关4*4棋盘位于整个盘面的i=3~6，j=1~4
                for (let i = 3; i < 7; i++) {
                    for (let j = 1; j < 5; j++) {
                        this.createElemBg(i, j);
                    }
                }

                this.brickContainer1.x = 170;
                this.brickContainer1.y = 205;
                this.mainContainer.addChild(this.brickContainer1);
                this.createBrick1(this.brickNum);
                this.brickContainer2.x = -165;
                this.brickContainer2.y = 205;
                this.mainContainer.addChild(this.brickContainer2);
                this.createBrick2(this.brickNum);
                this.brickContainer3.x = -182;
                this.brickContainer3.y = 233;
                this.mainContainer.addChild(this.brickContainer3);
                this.createBrick3(this.brickNum);

                this.elemContainer.x = -167;
                this.elemContainer.y = -195;
                this.mainContainer.addChild(this.elemContainer);

                break;
            case 2: 
                this.brickNum = 15;  //第二关砖块15个
                this.n = 5;  //第二关棋盘为5*5
                this.createBitmapByName("h5by_xyx_deg_png", 10, -265, this.mainContainer);  //第二关标题
                this.elemBgContainer.x = -167;
                this.elemBgContainer.y = -195;
                this.mainContainer.addChild(this.elemBgContainer);

                // 第二关5*5棋盘位于整个盘面的i=2~6，j=1~5
                for (let i = 2; i < 7; i++) {
                    for (let j = 1; j < 6; j++) {
                        this.createElemBg(i, j);
                    }
                }

                this.brickContainer2.x = -165;
                this.brickContainer2.y = 205;
                this.mainContainer.addChild(this.brickContainer2);
                this.createBrick2(this.brickNum);
                this.brickContainer3.x = -182;
                this.brickContainer3.y = 233;
                this.mainContainer.addChild(this.brickContainer3);
                this.createBrick3(this.brickNum);
                this.elemContainer.x = -167;
                this.elemContainer.y = -195;
                this.mainContainer.addChild(this.elemContainer);

                break;
            case 3: 
                this.brickNum = 15;  //第三关砖块15个
                this.n = 6;  //第三关棋盘为6*6
                this.createBitmapByName("h5by_xyx_dsg_png", 10, -265, this.mainContainer);  //第三关标题
                this.elemBgContainer.x = -167;
                this.elemBgContainer.y = -195;
                this.mainContainer.addChild(this.elemBgContainer);

                // 第三关6*6棋盘位于整个盘面的i=1~6，j=0~5                
                for (let i = 1; i < 7; i++) {
                    for (let j = 0; j < 6; j++) {
                        this.createElemBg(i, j);
                    }
                }

                this.brickContainer3.x = -182;
                this.brickContainer3.y = 233;
                this.mainContainer.addChild(this.brickContainer3);
                this.createBrick3(this.brickNum);
                this.elemContainer.x = -167;
                this.elemContainer.y = -195;
                this.mainContainer.addChild(this.elemContainer);

                break;
        }
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

    // 游戏开始，扣除金币，移除宝石，创建新宝石
    public startGame():void{
        console.log('游戏开始');

        //判断金币是否足够
        if (this.goldCoin.goldCoin<this.operationDesk.point) {
            console.log('金币不足');
            return;
        }

        //扣除金币开始游戏
        this.goldCoin.add(-this.operationDesk.point);

        //移除连击显示列表中的连击记录
        this.comboList.clearAll();

        this.running = true;

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

    // 创建宝石，执行后续的消除或爆炸逻辑
    private createElement():void {

        //生成炸弹的逻辑
        this.hasBomb = this.ifBomb();
        let bombPosition = {i: -1,j: -1};
        if (this.hasBomb) {
            //随机炸弹位置
            bombPosition = {
                i: Math.floor(Math.random() * this.n),
                j: Math.floor(Math.random() * this.n)
            }
        }

        // 生成宝石或炸弹
        this.elementArr = [];
        let n = 0;
        for (let i = 0; i < this.n; i++) {
            this.elementArr.push([]);
            for (let j = 0; j < this.n; j++) {
                let bg = this.elemBgContainer.getChildAt(n);
                let elem = new MyElement(bg.x, -this.stage.stageHeight/2, bg.y, n , i === bombPosition.i && j === bombPosition.j)
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

        if (this.hasBomb) {

            //调用炸弹爆炸逻辑
            egret.setTimeout(() => {this.bomb(bombPosition);},this,this.n * 100 + 400);
        }
        else {
            //调用消除逻辑
            egret.setTimeout(() => {this.eliminate();},this,this.n * 100 + 400);
        }
    }

    //是否应该生成炸弹
    private ifBomb():boolean {
        if (this.level >= 3 && this.brickNum <= 0) {
            return false;
        }
        return Math.random() < this.bombProb[this.level - 1];
    }

    //炸弹爆炸逻辑
    private bomb(position) {
        // 获取所炸的砖块的位置
        let brickPos = this.getBrickPos();
        // 调用炸弹飞行函数
        this.elementArr[position.i][position.j].bombFly(brickPos.x,brickPos.y, this.elemContainer, this);
        // 修改宝石状态管理矩阵
        this.elementArr[position.i][position.j] = null;
    }

    //炸弹爆炸后
    public afterBomb() {
        this.brickNum--;  //砖块数-1
        switch (this.level) {
            case 1:
                this.brickContainer1.removeChildren();
                this.createBrick1(this.brickNum);
                break;
            case 2:
                this.brickContainer2.removeChildren();
                this.createBrick2(this.brickNum);
                break;
            case 3:
                this.brickContainer3.removeChildren();
                this.createBrick3(this.brickNum);
                break;
            default:
                return;
        }
        if (this.brickNum > 0) {
            // 砖块未消除完毕
            // 整理棋盘，填充空位，调用消除逻辑
            this.sortOut();
            this.fillEmpty();
            egret.setTimeout(() => {this.eliminate();},this,this.n * 100 + 400);
        }
        else if (this.level < 3) {
            //砖块消除完毕
            // 第一、第二关则进入下一关
            this.initGame(++this.level);
            this.startGame();
        }
        else {
            //砖块消除完毕
            // 第三关则回到第一关
            this.level = 1;
            this.initGame(this.level);
            this.startGame();              
        }
        
    }

    //获取砖块的位置坐标
    private getBrickPos() {
        let point:egret.Point;
        let brick;
        switch (this.level) {
            case 1:
                brick = this.brickContainer1.getChildAt(this.brickNum - 1);
                point = this.brickContainer1.localToGlobal(brick.x, brick.y);
                point = this.elemContainer.globalToLocal(point.x,point.y)
                break;
            case 2:
                brick = this.brickContainer2.getChildAt(this.brickNum - 1);
                point = this.brickContainer2.localToGlobal(brick.x, brick.y);
                point = this.elemContainer.globalToLocal(point.x,point.y)
                break;
            case 3:
                brick = this.brickContainer3.getChildAt(this.brickNum - 1);
                point = this.brickContainer3.localToGlobal(brick.x, brick.y);
                point = this.elemContainer.globalToLocal(point.x,point.y)
                break;
            default:
                return point;
        }
        return point;
    }

    // 消除逻辑，计算消除元素，执行消除，推进流程
    private eliminate() {
        // 计算是否有可消除的
        let arr = this.eliminateCalc();

        if (arr.length > 0) {
            //有可消除的元素
            this.eliminateAct(arr);
        }
        else {
            //无可消除的元素，连击列表显示总连击数，推进流程
            this.comboList.showAll();

            if (this.auto) {
                //如果正在挂机
                egret.setTimeout(() => {
                
                    this.startGame();
                },this,800);
            }
            else {
                //如果没有挂机
                this.running = false;
                this.operationDesk.enableStartButton();
            }
            
            
        }
    }

    //消除计算，返回所有可消除宝石的坐标
    //思路：dp中保存的是与(i,j)位置宝石同色且相邻的所有宝石的坐标数组，当相邻同色宝石增加时，需要遍历该数组更新相应位置处的坐标数组
    private eliminateCalc() {
        let elementArr = [], dp = [null], reslut = [];
        let n = this.elementArr.length,m = this.elementArr[0].length;

        //在第一行以及第一列增加边界
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
                //分三种情况
                if (elementArr[i][j].eleIndex === elementArr[i][j-1].eleIndex && elementArr[i][j].eleIndex === elementArr[i-1][j].eleIndex) {
                    //1. 当前位置宝石和上面左面都同色，则需要判断上面左面保存的坐标数组是否相同
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
                    //2. 当前宝石和左面同色
                    let arr = dp[i][j-1].concat(dp[i][j]);
                    arr.forEach((value) => {
                        dp[value.i][value.j] = arr;
                    });
                }
                else if (elementArr[i][j].eleIndex === elementArr[i-1][j].eleIndex) {
                    //当前宝石个上面同色
                    let arr = dp[i-1][j].concat(dp[i][j]);
                    arr.forEach((value) => {
                        dp[value.i][value.j] = arr;
                    });
                }
            }
        }

        //整理出应该被消除的宝石坐标，dp矩阵中长度大于this.minNum的应该被消除
        for (let i = 1; i < n + 1; i++) {
            for (let j = 1; j < m + 1; j++) {
                if (dp[i][j].length >= this.minNum && reslut.indexOf(dp[i][j]) === -1) {
                    reslut.push(dp[i][j]);
                } 
            }
        }
    
        //因为加了边界，所以对应宝石的坐标应该-1
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

            //金币增加
            this.goldCoin.add(score.num);

            //生成连击
            this.comboList.addOne(element.eleIndex,arr[0].length,point.x, point.y, this);

            //修改宝石状态管理矩阵
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
            egret.setTimeout(() => {this.eliminate();},this,this.n * 100 + 400);
        }
    }

    // 分数规则
    private getScore(l:number):number {
        return l*this.operationDesk.point / 10;
    }

    // 整理棋盘，宝石掉落
    private sortOut() {

        let m = this.elementArr.length,n = this.elementArr[0].length;
        let empty = [];
        for (let i = 0; i < n; i++) {
            empty[i] = 0;
        }

        // empty[j]保存的是遍历过程中第i行第j列以下的空位数量
        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {

                if (this.elementArr[i][j]) {
                    //当前位置不是空位
                    if ( empty[j] > 0) {
                        //当前列存在空位，则当前位置处的宝石应该掉落的行数为empty[j]
                        let bg = this.elemBgContainer.getChildAt((i+empty[j])*this.n+j);
                        this.elementArr[i][j].dropTo(bg.x, bg.y);
                        this.elementArr[i+empty[j]][j] = this.elementArr[i][j];
                        this.elementArr[i][j] = null;

                    }
                }
                else {
                    //当前位置是空位
                    empty[j]++;
                }
            }
        }
    }

    //填充空位，遍历this.elementArr数组找出值为null的位置生成宝石即可
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

    // 根据资源名添加显示对象
    private createBitmapByName(name:string, x:number, y:number, container:egret.DisplayObjectContainer, offset:boolean=true) {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        container.addChild(result);
        return result;
    }

    // 点击开始将元素放大
    private touchBegin(evt:egret.TouchEvent):void{
        evt.$target.scaleX = evt.$target.scaleY = 1.1;
    }

    // 点击结束将元素大小重置
    private touchEnd(evt:egret.TouchEvent):void{
        evt.$target.scaleX = evt.$target.scaleY = 1;
    }
}
