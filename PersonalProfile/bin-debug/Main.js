//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        //First Page
        var Page1 = new Page();
        this.addChild(Page1);
        Page1.touchEnabled = true;
        pagemove(Page1);
        var Page1_BG = this.createBitmapByName("19_jpg");
        this.addChild(Page1_BG);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        Page1_BG.width = stageW;
        Page1_BG.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("1_jpg");
        this.addChild(icon);
        icon.x = 60;
        icon.y = 70;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "This is Yining Zhu";
        colorLabel.size = 26;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var text_self = new egret.TextField();
        this.addChild(text_self);
        text_self.textColor = 0xffffff;
        text_self.width = 400;
        text_self.size = 20;
        text_self.lineSpacing = 6;
        text_self.x = 200;
        text_self.y = 450;
        text_self.bold = false;
        text_self.textFlow = [
            { text: "老师你好（伸起我的小粗主爪）。喜欢看推理以及科幻类的小说。", style: { "size": 20, "textColor": 0xffffff } },
            { text: "如今专注于三次元，追一下下小明星。平时喜欢画画、看书、看实况（B站喜欢看岚少和C菌）平时还会和别人尬舞！！", style: { "size": 20, "textColor": 0xffffff } },
            { text: "\n特别喜欢角色扮演游戏。入坑作是psp的最终幻想7：降临之子，刷了好多遍。最爱～扎克斯赛高！！", style: { "size": 20, "textColor": 0xffffff } },
            { text: "\n后来在b站混迹，喜欢上岚少那种日式的RPG小游戏，玩了一阵子类似的游戏。（本人胆小，非常害怕恐怖的东西，自己不敢玩就看别人玩啦）", style: { "textColor": 0xffffff } },
            { text: "\n" },
            { text: "暑假的时候，在好基友家里一起play了守望先锋和血缘诅咒以及看门狗。看门狗真是不行，老追车，玩了会儿就不玩了。毕竟不会开车很痛苦。", style: { "size": 20, "textColor": 0xffffff } },
            { text: "很喜欢血缘的设定和屁股的人设，赞！代入感很强，果断的入坑了。", style: { "size": 20, "textColor": 0xffffff } },
            { text: "诶～总之喜欢的东西比较杂。\n", style: { "size": 20, "textColor": 0xffffff } },
            { text: "性格比较开朗、好说话。不是很擅长编程但是觉得很神奇！嗯。。。差不多就这些了 ", style: { "size": 20, "textColor": 0xffffff } },
            { text: "我会努力跟上老师的脚步的。好好加油（发抖、忐忑）", style: { "size": 20, "textColor": 0xffffff } },
        ];
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);
        //Second Page
        var Page2 = new Page();
        this.addChild(Page2);
        Page2.touchEnabled = true;
        pagemove(Page2);
        var topMask1 = new egret.Shape();
        topMask1.graphics.beginFill(0x000000, 1);
        topMask1.graphics.drawRect(0, 0, 300, 300);
        topMask1.graphics.endFill();
        topMask1.y = 33;
        Page2.addChild(topMask1);
        var sky1 = this.createBitmapByName("2_jpg");
        Page2.addChild(sky1);
        Page2.stage.stageWidth = this.stage.stageWidth;
        Page2.stage.stageHeight = this.stage.stageHeight;
        sky1.width = Page2.stage.stageWidth;
        sky1.height = Page2.stage.stageHeight;
        var text_self2 = new egret.TextField();
        this.addChild(text_self2);
        text_self2.textColor = 0xffffff;
        text_self2.width = 400;
        text_self2.size = 20;
        text_self2.lineSpacing = 6;
        text_self2.x = 200;
        text_self2.y = 450;
        text_self2.bold = false;
        text_self2.textFlow = [
            { text: "Let us begin!!", style: { "size": 50, "textColor": 0x000000 } },
        ];
        function pagemove(p) {
            p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, p.mouseDown, p);
            p.addEventListener(egret.TouchEvent.TOUCH_END, p.mouseUp, p);
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        _super.apply(this, arguments);
        this.mouseState = false;
        this.distance = new egret.Point();
    }
    var d = __define,c=Page,p=c.prototype;
    p.mouseDown = function (evt) {
        this.mouseState = true;
        this.distance.y = evt.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    p.mouseMove = function (evt) {
        if (this.mouseState) {
            this.y = evt.stageY - this.distance.y;
            if (this.y < -500) {
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 400, egret.Ease.sineIn)
                    .wait(300).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.parent.addChildAt(this, 0);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (this.y > 500) {
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 400, egret.Ease.sineIn)
                    .wait(300).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.parent.addChildAt(this, 0);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
        }
    };
    p.mouseUp = function (evt) {
        this.mouseState = false;
        if (this.y >= -500) {
            egret.Tween.get(this).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
        }
        if (this.y <= 500) {
            egret.Tween.get(this).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
        }
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    return Page;
}(egret.DisplayObjectContainer));
egret.registerClass(Page,'Page');
/*class Animation
{
    public static Anim_0:number = 0;
    public static Anim_1:number = 1;
}*/
