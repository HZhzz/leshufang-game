const Path=require("path"),Fs=require("fs"),FsExtra=require("fs-extra"),OutPut=Editor.require("packages://hot-update-tools/core/OutPut.js");Vue.component("env-project",{template:Fs.readFileSync(Editor.url("packages://hot-update-tools/panel/env-project.html"),"utf-8"),mixins:[Editor.require("packages://hot-update-tools/panel/mixin.js")],data:()=>({localGameVersion:"-",localGamePackageUrl:"",localGameProjectManifest:"",localGameVersionManifest:""}),created(){this.initLocalGameVersion()},methods:{
    importManifestToGame(){
        let e={
            project:"project.manifest",
            version:"version.manifest"
        },
        t=Path.join(OutPut.manifestDir,e.project);
        if(!Fs.existsSync(t))return void this.log(`[${e.project}]文件不存在: ${t}`);
        let s=Path.join(OutPut.manifestDir,e.version);
        if(!Fs.existsSync(s))return void this.log(`[${e.version}]文件不存在: ${s}`);
        let i=null;
        i=Fs.existsSync(this.localGameProjectManifest)?Path.dirname(this.localGameProjectManifest):Editor.url("db://assets");
        for(let t in e){
            let s=Path.join(OutPut.manifestDir,e[t]),a=Path.join(i,e[t]);
            FsExtra.copyFileSync(s,a);
            let o=Editor.assetdb.remote.fspathToUrl(a);
            Editor.assetdb.refresh(o)
        }
        this.initLocalGameVersion()
        alert("step2：导入manifest====>ok");
    },
    initLocalGameVersion(){
        const e=require("globby");
        let t=Editor.url("db://assets"),s="",i="";
        if(e.sync([Path.join(t,"**/*.manifest")]).forEach(e=>{
            "version.manifest"===Path.basename(e)?s=e:"project.manifest"===Path.basename(e)&&(i=e)
        }),0===s.length)return void this.log("项目中没有配置文件: version.manifest");
        if(0===i.length)return void this.log("项目中没有配置文件: project.manifest");
        this.localGameVersionManifest=s,this.localGameProjectManifest=i;
        let a=null,o=null;
        Fs.existsSync(s)?a=JSON.parse(Fs.readFileSync(s,"utf-8")):this.log("读取项目中的配置文件失败: "+s),
        Fs.existsSync(i)?o=JSON.parse(Fs.readFileSync(i,"utf-8")):this.log("读取项目中的配置文件失败: "+i),
        o&&a&&o.version&&a.version&&o.version===a.version?(this.localGameVersion=o.version,this.localGamePackageUrl=o.packageUrl):this.log("游戏中的 project.manifest 和 version.manifest 中的数据异常,请检查配置文件")
    }
}});