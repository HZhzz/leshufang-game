const Path=require("path"),
Fs=require("fire-fs"),
CfgUtil=Editor.require("packages://hot-update-tools/core/CfgUtil.js"),
Util=Editor.require("packages://hot-update-tools/core/Util.js"),
OutPut=Editor.require("packages://hot-update-tools/core/OutPut.js"),
GoogleAnalytics=Editor.require("packages://hot-update-tools/core/GoogleAnalytics.js"),
Electron=require("electron");
Vue.component("manifest-gen",
    {
        template:Fs.readFileSync(Editor.url("packages://hot-update-tools/panel/manifest-gen.html"),"utf-8"),
        mixins:[Editor.require("packages://hot-update-tools/panel/mixin.js")],
        data:()=>({
            version:"",
            serverRootDir:"",
            remoteServerVersion:"",
            hotAddressArray:[],
            resourceRootDir:"",
            genManifestDir:"",
            isShowUseAddrBtn:!1,
            isShowDelAddrBtn:!1
        }),
        computed:{
            isValidResDir(){
                return!(!this.resourceRootDir||!Fs.existsSync(this.resourceRootDir))
            }
        },
        created(){
            this.$nextTick(()=>{
                let e=CfgUtil.cfgData;
                e&&(this.version=e.version,this.serverRootDir=e.serverRootDir,this.resourceRootDir=e.resourceRootDir,this.hotAddressArray=e.hotAddressArray||[]),
                this.genManifestDir=OutPut.manifestDir,
                this._getRemoteServerVersion(),
                this._initResourceBuild()
            })
        },
        methods:{
            _initResourceBuild(){
                let e=Editor.Project.path,
                t=Path.join(e,"local/builder.json");
                if(Fs.existsSync(t)){
                    let s=JSON.parse(Fs.readFileSync(t,"utf-8")),
                    i=s.buildPath,
                    r=Path.join(e,i),
                    o=Path.join(r,`jsb-${s.template}`);
                    if(!Fs.existsSync(o)){
                        let e=Path.join(r,s.platform);
                        Fs.existsSync(e)&&(o=e)
                    }
                    this._checkResourceRootDir(o)
                }else this.log("发现没有构建项目, 使用前请先构建项目!")
            },
            _isVersionPass(e,t){
                if(void 0===e||null===e||void 0===t||null===t)return!1;
                let s=e.split("."),
                i=t.split("."),
                r=s.length>i.length?s.length:i.length;
                for(let e=0;e<r;e++){
                    let t=s[e],r=i[e];
                    if(void 0===t&&void 0!==r)return!1;
                    if(void 0!==t&&void 0===r)return!0;
                    if(t&&r&&parseInt(t)>parseInt(r))return!0
                }
                return!1
            },
            _updateShowUseAddrBtn(){
                // let e=this.$els.address.value;
                // this.serverRootDir===e&&(this.isShowUseAddrBtn=!1)
            },
            _addHotAddress(e){
                let t=!0;
                for(let s=0;s<this.hotAddressArray.length;s++){
                    if(this.hotAddressArray[s]===e){
                        t=!1;
                        break
                    }
                }
                t&&(this.hotAddressArray.push(e),
                this.log("[HotAddress]历史记录添加成功:"+e))
            },
            _getRemoteServerVersion(){
                if(this.serverRootDir.length<=0)return;
                this.remoteServerVersion=null;
                let e=this.serverRootDir+"/version.manifest",
                t=new XMLHttpRequest;
                t.onreadystatechange=(()=>{
                    if(4===t.readyState&&t.status>=200&&t.status<400){
                        let e=t.responseText,s=null;
                        try{s=JSON.parse(e)}
                        catch(e){
                            return void this.log("获取远程版本号失败!")
                        }
                        this.remoteServerVersion=s.version
                    }else t.status
                }),
                t.open("get",e,!0),
                t.setRequestHeader("If-Modified-Since","0"),
                t.send()
            },
            onClickGenCfg(e){
                GoogleAnalytics.eventCustom("GenManifest"),
                !this.version||this.version.length<=0?this.log("[生成] 版本号未填写"):!this.serverRootDir||this.serverRootDir.length<=0?this.log("[生成] 服务器地址未填写"):0!==this.resourceRootDir.length?this._checkResourceRootDir(this.resourceRootDir)&&(!this.genManifestDir||this.genManifestDir.length<=0?this.log("[生成] manifest文件生成地址未填写"):Fs.existsSync(this.genManifestDir)?(this._saveConfig(),this._genVersion(this.version,this.serverRootDir,this.resourceRootDir,this.genManifestDir)):this.log("[生成] manifest存储目录不存在: "+this.genManifestDir)):this.log("[生成] 请先指定 <build项目资源文件目录>")
            },
            onClickOpenVersionDir(){
                this.openDir(OutPut.versionsDir)
            },
            onOpenManifestDir(){
                this.openDir(this.genManifestDir)
            },
            onOpenResourceDir(){
                this.openDir(this.resourceRootDir)
            },
            onSelectResourceRootDir(){
                let e=Editor.Dialog.openFile({title:"选择构建后的根目录",defaultPath:Editor.projectInfo.path,properties:["openDirectory"]});
                if(-1!==e){
                    let t=e[0];
                    this._checkResourceRootDir(t)&&(this.resourceRootDir=t,this._saveConfig())
                }
            },
            onBtnClickDelSelectedHotAddress(){
                let e=this.$els.address.value;
                if(this.hotAddressArray.length>0){
                    let t=!1;
                    for(let s=0;s<this.hotAddressArray.length;){
                        let i=this.hotAddressArray[s];
                        i===e?(this.hotAddressArray.splice(s,1),t=!0,this.log("删除历史地址成功: "+i)):s++
                    }t&&(this.isShowDelAddrBtn=!1,this.isShowUseAddrBtn=!1,this._saveConfig())
                }else this.log("历史地址已经为空")
            },
            onBtnClickUseSelectedHotAddress(){
                this.$els;
                let e=this.$els.address.value;
                this.serverRootDir=e,
                this.onInPutUrlOver(),
                this._updateShowUseAddrBtn()
            },
            onChangeSelectHotAddress(e){
                GoogleAnalytics.eventCustom("ChangeSelectHotAddress"),this.isShowUseAddrBtn=!0,this.isShowDelAddrBtn=!0,this._updateShowUseAddrBtn()
            },
            userLocalIP(){
                GoogleAnalytics.eventCustom("useLocalIP");
                let e=Editor.require("packages://hot-update-tools/core/Util.js").getLocalIP();
                e.length>0&&(this.serverRootDir="http://"+e,
                this.onInPutUrlOver(null))
            },
            onInPutUrlOver(e){
                let t=this.serverRootDir;
                if("http://"===t||"https://"===t||"http"===t||"https"===t||"http:"===t||"https:"===t)return;
                let s=t.indexOf("http://"),
                i=t.indexOf("https://");
                if(-1===s&&-1===i){
                    /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(t)||(this.log(t+" 不是以http://https://开头，或者不是网址, 已经自动修改"),
                    this.serverRootDir="http://"+this.serverRootDir,this._getRemoteServerVersion())
                }else this._getRemoteServerVersion();this._addHotAddress(this.serverRootDir),this._updateShowUseAddrBtn(),this._saveConfig()
            },
            _saveConfig(){
                let e={version:this.version,serverRootDir:this.serverRootDir,resourceRootDir:this.resourceRootDir,genManifestDir:OutPut.manifestDir,localServerPath:this.localServerPath,hotAddressArray:this.hotAddressArray};
                CfgUtil.saveConfig(e)
            },
            onInputVersionOver(){
                let e=CfgUtil.cfgData.genVersion,
                t=(CfgUtil.cfgData.buildTime,CfgUtil.cfgData.genTime,this.remoteServerVersion);
                null!==t&&void 0!==t&&(this._isVersionPass(this.version,t)?(this.log("上次构建时版本号: "+e),
                this._isVersionPass(this.version,e)?this.log("版本通过验证!"):this.log("[Warning] 要构建的版本低于上次构建版本: "+this.version+"<="+e)):this.log("[Warning] version 填写的版本低于远程版本")),
                this._saveConfig()
            },
            onStopTouchEvent(e){
                e.preventDefault(),
                e.stopPropagation()
            },
            onBtnClickHelpDoc(){
                GoogleAnalytics.eventDoc();
                Electron.shell.openExternal("https://tidys.github.io/plugin-docs-oneself/docs/hot-update-tools/")
            },
            onBtnClickTellMe(){
                GoogleAnalytics.eventQQ();
                Electron.shell.openExternal("http://wpa.qq.com/msgrd?v=3&uin=774177933&site=qq&menu=yes")
            },
            _genVersion(e,t,s,i){
                this.log("[Build] 开始生成manifest配置文件....");
                let r={version:e,packageUrl:t,remoteManifestUrl:"",remoteVersionUrl:"",assets:{},searchPaths:[]};
                "/"===t[t.length-1]?(r.remoteManifestUrl=t+"project.manifest",r.remoteVersionUrl=t+"version.manifest"):(r.remoteManifestUrl=t+"/project.manifest",r.remoteVersionUrl=t+"/version.manifest");
                let o=i,n=s,l=(e,t)=>{
                    let s=Fs.statSync(e);
                    if(!s.isDirectory())return;
                    let i,r,o,a,h,d=Fs.readdirSync(e);
                    for(let c=0;c<d.length;++c)"."!==d[c][0]&&(i=Path.join(e,d[c]),(s=Fs.statSync(i)).isDirectory()?l(i,t):s.isFile()&&(r=s.size,o=require("crypto").createHash("md5").update(Fs.readFileSync(i)).digest("hex"),a=".zip"===Path.extname(i).toLowerCase(),h=(h=Path.relative(n,i)).replace(/\\/g,"/"),t[h=encodeURI(h)]={size:r,md5:o},a&&(t[h].compressed=!0)))
                };
                l(Path.join(n,"src"),r.assets),
                l(Path.join(n,Util.manifestResDir),r.assets);
                let a=Path.join(o,"project.manifest"),
                h=Path.join(o,"version.manifest");
                (e=>{try{Fs.mkdirSync(e)}catch(e){if("EEXIST"!==e.code)throw e}})(o),
                Fs.writeFileSync(a,JSON.stringify(r)),
                this.log("[Build] 生成 project.manifest成功"),
                delete r.assets,
                delete r.searchPaths,
                Fs.writeFileSync(h,JSON.stringify(r)),
                this.log("[Build] 生成 version.manifest成功"),
                this._packageVersion()
            },
            _packageDir(e,t){
                let s=Fs.readdirSync(e);
                for(let i=0;i<s.length;i++){
                    let r=s[i],
                    o=Path.join(e,r),
                    n=Fs.statSync(o);
                    n.isFile()?t.file(r,Fs.readFileSync(o)):n.isDirectory()&&this._packageDir(o,t.folder(r))
                }
            },
            _packageVersion(){
                let{manifestResDir:e}=Util;
                this.log("[Pack] 开始打包版本 ...");
                let t=new(Editor.require("packages://hot-update-tools/node_modules/jszip")),
                s=Path.join(this.genManifestDir,"version.manifest");
                t.file("version.manifest",Fs.readFileSync(s));
                let i=Path.join(this.genManifestDir,"project.manifest");
                t.file("project.manifest",Fs.readFileSync(i));
                let r=Path.join(this.resourceRootDir,"src");
                this._packageDir(r,t.folder("src"));
                let o=Path.join(this.resourceRootDir,e);
                this._packageDir(o,t.folder(e));
                let n=Fs.readFileSync(s,"utf-8"),l=JSON.parse(n).version;
                if(this.log("[Pack] 打包版本:"+l),l!==this.version)return void this.log("[Pack] 打包版本和当前填写的版本不一致,出现异常,停止打包!");
                let a="ver_"+(l=l.replace(".","_"))+".zip",
                h=OutPut.versionsDir,
                d=Path.join(h,a);
                Fs.existsSync(d)&&(Fs.unlinkSync(d),this.log("[Pack] 发现该版本的zip, 已经删除!")),
                t.generateNodeStream({type:"nodebuffer",streamFiles:!0}).pipe(Fs.createWriteStream(d)).on("finish",()=>{
                    this.log("[Pack] 打包成功: "+d)
                    alert("step1：生成热更包====>ok");
                }).on("error",e=>{
                    this.log("[Pack] 打包失败:"+e.message)
                })
            },
            _checkResourceRootDir(e){
                if(Fs.existsSync(e)){
                    let t=Path.join(e,"src");
                    if(!Fs.existsSync(t))return this.log(`没有发现 ${t}, 请先构建项目.`),!1;
                    let s=["res","assets"];
                    for(let t=0;t<s.length;t++){
                        let i=s[t];
                        if(Fs.existsSync(Path.join(e,i))){
                            Util.manifestResDir=i;
                            break
                        }
                    }
                    return Util.manifestResDir?(this.resourceRootDir=e,this._saveConfig(),!0):(this.log(`没有发现资源目录${s.toString()}, 请先构建项目.`),!1)
                }return this.log(`没有发现 ${e}, 请先构建项目.`),!1
            }
        }
    }
);