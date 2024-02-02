import auto_Hotupdate from "../../../data/autoui/hotupdate/auto_Hotupdate";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/hotupdate/UIHotupdate")
export default class UIHotupdate extends UIBase {
	ui: auto_Hotupdate = null;

	protected static prefabUrl = "hotupdate/Hotupdate";
	protected static className = "UIHotupdate";

	@property({ type: cc.Asset })
	manifestUrl: cc.Asset = null;

	public static instance: UIHotupdate = null;

	private _storagePath: string;
	private versionCompareHandle: any;
	private _am: any;
	private _updating: boolean = false;
	private callback: Function;

	checkUpdateOver: boolean = false;
	_checkCb: Function = null;
	onCheckUpdateOver(callback: Function) {
		if (this.checkUpdateOver) {
			callback();
		} else {
			this._checkCb = callback;
		}
	}

	onUILoad() {
		this.ui = this.node.addComponent(auto_Hotupdate);
		console.log("Hotupdate onLoad");

		UIHotupdate.instance = this;

		if (!cc.sys.isNative) {
			this.onClose();

			return
		}

		console.log("this.manifestUrl", this.manifestUrl.nativeUrl);
		//检查热更新
		this.initUpdateManager();
		this.checkUpdate();
	}

	onInit(params) {
		this.callback = params[0];
	}

	onShow() {

	}

	onHide() {

	}

	onStart() {

	}

	initUpdateManager() {
		console.log("initUpdateManager")
		this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'project-remote-asset');
		console.log("this._storagePath", this._storagePath)
		this.versionCompareHandle = function (versionA, versionB) {
			console.log("本地版本为" + versionA + ', 服务器版本为' + versionB);
			cc.sys.localStorage.setItem("localHotUpdateVersion", versionA);
			var vA = versionA.split('.');
			var vB = versionB.split('.');
			for (var i = 0; i < vA.length; ++i) {
				var a = parseInt(vA[i]);
				var b = parseInt(vB[i] || 0);
				if (a === b) {
					continue;
				}
				else {
					return a - b;
				}
			}
			if (vB.length > vA.length) {
				return -1;
			}
			else {
				return 0;
			}
		};

		this._am = new jsb['AssetsManager']('', this._storagePath, this.versionCompareHandle);

		this._am.setVerifyCallback(function (path, asset) {
			var compressed = asset.compressed;

			var expectedMD5 = asset.md5;

			var relativePath = asset.path;

			var size = asset.size;
			if (compressed) {
				console.log("Verification passed : " + relativePath);
				return true;
			}
			else {
				console.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')');
				return true;
			}
		});
		if (cc.sys.os === cc.sys.OS_ANDROID) {
			this._am.setMaxConcurrentTask(2);
		}
	}

	checkUpdate() {
		console.log("检测热更新");
		if (this._updating) {
			console.log('Checking or updating ...');
			return;
		}
		if (this._am.getState() === jsb['AssetsManager'].State.UNINITED) {
			// Resolve md5 url
			var url = this.manifestUrl.nativeUrl;
			// if (cc.loader.md5Pipe) {
			//     url = cc.loader.md5Pipe.transformURL(url);
			// }
			this._am.loadLocalManifest(url);
		}
		if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
			console.log('Failed to load local manifest ...');
			return;
		}
		this._am.setEventCallback(this.checkCb.bind(this))
		this._am.checkUpdate();
		this._updating = true;
	}

	checkCb(event) {
		console.log('checkCb Code: ' + event.getEventCode());
		switch (event.getEventCode()) {
			case jsb['EventAssetsManager'].ERROR_NO_LOCAL_MANIFEST:
				console.log('找不到本地MANIFEST文件');
				break;
			case jsb['EventAssetsManager'].ERROR_DOWNLOAD_MANIFEST:
			case jsb['EventAssetsManager'].ERROR_PARSE_MANIFEST:
				console.log('检测热更新失败 无法下载MANIFEST');
				break;
			case jsb['EventAssetsManager'].ALREADY_UP_TO_DATE://已经是服务器版本
				console.log('********已经是最新版本********');
				this.onClose();
				this.callback && this.callback();
				break;
			case jsb['EventAssetsManager'].NEW_VERSION_FOUND://找到新版本
				console.log('找到新版本.');
				UIHelp.ShowDialog({
					title: "提示",
					content: "发现新版本，是否更新？",
					certainCb: () => {
						this.hotUpdate();
						this.ui.ProgressBar.active = true;
						this.ui.label_tip.active = true;
					},
					cancelCb: () => {
						cc.game.end();
					}
				})
				this._updating = false;
				break;
			default:
				return;
		}
		// this._am.setEventCallback(null)
		// console.log("移除检测回调");
	}

	hotUpdate() {
		console.log('this._am', this._am);
		console.log('this._am', this._updating);
		if (this._am && !this._updating) {
			this._am.setEventCallback(this.updateCb.bind(this))
			if (this._am.getState() === jsb['AssetsManager'].State.UNINITED) {
				this._am.loadLocalManifest(this.manifestUrl.nativeUrl);
			}
			this._am.update();
			this._updating = true;
		} else {
			console.error('update error');
		}
	}
	conver(limit) {
		var size = "";
		if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
			size = limit.toFixed(2) + "B";
		} else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
			size = (limit / 1024).toFixed(2) + "KB";
		} else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
			size = (limit / (1024 * 1024)).toFixed(2) + "MB";
		} else { //其他转化成GB  
			size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
		}

		var sizestr = size + "";
		var len = sizestr.indexOf("\.");
		var dec = sizestr.substr(len + 1, 2);
		if (dec == "00") {//当小数点后为00时 去掉小数部分  
			return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
		}
		return sizestr;
	}

	updateCb(event) {
		var needRestart = false;
		var failed = false;
		console.error('event.code:' + event.getEventCode());
		switch (event.getEventCode()) {
			case jsb['EventAssetsManager'].ERROR_NO_LOCAL_MANIFEST:
				console.log("No local manifest file found, hot update skipped.");
				failed = true;
				break;
			case jsb['EventAssetsManager'].UPDATE_PROGRESSION:
				console.log("UPDATE_PROGRESSION----FILE:", event.getDownloadedFiles() + ' / ' + event.getTotalFiles());
				console.log("UPDATE_PROGRESSION----BYTE:", event.getDownloadedBytes() + ' / ' + event.getTotalBytes());

				var percent = Math.min(Number(event.getDownloadedBytes()) / Number(event.getTotalBytes()), 1);
				this.ui.ProgressBar.getComponent(cc.ProgressBar).progress = percent;
				this.ui.label_tip.getComponent(cc.Label).string = (percent * 100).toFixed(2) + "%";
				break;
			case jsb['EventAssetsManager'].ERROR_DOWNLOAD_MANIFEST:
			case jsb['EventAssetsManager'].ERROR_PARSE_MANIFEST:
				console.log('Fail to download manifest file, hot update skipped.');
				failed = true;
				break;
			case jsb['EventAssetsManager'].ALREADY_UP_TO_DATE:
				console.log('Already up to date with the latest remote version.');
				failed = true;
				break;
			case jsb['EventAssetsManager'].UPDATE_FINISHED:
				console.log('Update finished. ' + event.getMessage());
				needRestart = true;
				break;
			case jsb['EventAssetsManager'].UPDATE_FAILED:
				console.log('Update failed. ' + event.getMessage());
				break;
			case jsb['EventAssetsManager'].ERROR_UPDATING:
				console.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
				break;
			case jsb['EventAssetsManager'].ERROR_DECOMPRESS:
				console.log('Update failed. ' + event.getMessage());
				break;
			default:
				break;
		}

		if (failed) {
			this._am.setEventCallback(null)
			this._updating = false;
		}

		if (needRestart) {
			UIHelp.ShowDialog({
				title: "提示",
				content: "更新完成，是否重启？",
				certainCb: () => {
					console.log("Restart");
					this._am.setEventCallback(null)
					var searchPaths = jsb.fileUtils.getSearchPaths();
					var newPaths = this._am.getLocalManifest().getSearchPaths();
					Array.prototype.unshift(searchPaths, newPaths);
					cc.sys.localStorage.setItem('HotUpdateSearchPaths1', JSON.stringify(searchPaths));
					jsb.fileUtils.setSearchPaths(searchPaths);
					cc.audioEngine.stopAll();
					cc.game.restart();
				},
				cancelCb: () => {
					cc.game.end();
				}
			});
		}
	}

	onClose() {
		console.log('this.checkUpdateOver = true;');
		this.ui.bg.active = false;
		this.checkUpdateOver = true;
		this._checkCb && this._checkCb();
		UIHelp.CloseUI(UIHotupdate);
	}
}