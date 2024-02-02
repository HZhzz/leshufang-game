import GameDataCenter from "../../../data/GameDataCenter";
import auto_mine_node from "../../../data/autoui/mine/auto_mine_node";
import { GameEvent } from "../../../data/const/EventConst";
import { DeviceModule } from "../../../data/model/DeviceModule";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIFriend_invite_list from "../friend/UIFriend_invite_list";
import UIAli from "./UIAli";
import UIHelpCenter from "./UIHelpCenter";
import UIMine_world from "./UIMine_world";
import UISet from "./UISet";
import UISuperVip_node from "./UISuperVip_node";
import UIWithdrawal_node from "./UIWithdrawal_node";
import UIVip_node from "../frist/UIVip_node";
import { VideoEvent } from "../../../data/const/VideoEvent";
import { ConfigModule } from "../../../data/model/ConfigModule";
import UITicket_node from "../ticket/UITicket_node";
import UIShare_node from "../friend/UIShare_node";
import { Utils } from "../../../utils/Utils";
import UIZhuanpan from "../zhuanpan/UIZhuanpan";
import UIDoudouGive from "./UIDoudouGive";
import UIWithdrawal_record from "./UIWithdrawal_record";
import UIInvite_info from "./UIInvite_info";
import UIDoudouToMoney from "./UIDoudouToMoney";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIMine_node")
export default class UIMine_node extends UIBase {
	ui: auto_mine_node = null;

	protected static prefabUrl = "mine/mine_node";
	protected static className = "UIMine_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_mine_node);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.initEvent(GameEvent.VIPGUANFEPIRZE, this.onVipInfo);
		this.initEvent(GameEvent.VIPFREEAD_SUCCESS, this.vipfreeadSuccess);

		this.onRegisterEvent(this.ui.btn_check_doudou, this.onShowyyd);
		this.onRegisterEvent(this.ui.btn_check_doudou1, this.onGoldCoinLog);
		this.onRegisterEvent(this.ui.btn_check_doudou22, this.onShowDoudouWorld);
		this.onRegisterEvent(this.ui.userinfo_node_set, this.onSet);
		this.onRegisterEvent(this.ui.btn_tixian, this.onTixian);
		this.onRegisterEvent(this.ui.btn_smrz, this.onAli);
		this.onRegisterEvent(this.ui.btn_lhcsr, this.onbuySuperVip);
		this.onRegisterEvent(this.ui.btn_yqm, this.onShowInvite);
		this.onRegisterEvent(this.ui.btn_help, this.onShowHelp);
		this.onRegisterEvent(this.ui.btn_guafen, this.onVipCanyu);
		this.onRegisterEvent(this.ui.btn_lingqu, this.onVipCanyu);

		this.onRegisterEvent(this.ui.btn_check_updata, this.onCheckUpdata);

		this.onRegisterEvent(this.ui.line_yaoqing, this.onShowInvite);
		this.onRegisterEvent(this.ui.line_shiming, this.onAli);
		this.onRegisterEvent(this.ui.line_choujiang, this.onChoujiang);
		this.onRegisterEvent(this.ui.line_bangzhu, this.onShowHelp);

		this.onRegisterEvent(this.ui.btn_check_doudou2, this.onGive1);
		this.onRegisterEvent(this.ui.btn_check_doudou21, this.onGive2);
		this.onRegisterEvent(this.ui.line_doudouworld, this.onShowDoudouWorld);

	}
	onShowDoudouWorld() {
		UIHelp.ShowUI(UIMine_world);
	}

	onChoujiang() {
		UIHelp.ShowUI(UIWithdrawal_record, null, "issue");
	}

	onHide() {

	}

	vipfreeadSuccess() {
		GameDataCenter.player.onGetVipGuaFenInfo()
	}

	onStart() {
		GameDataCenter.player.onGetVipGuaFenInfo();
		GameDataCenter.player.getUserInfo();

		this.initUI();
	}
	initUI() {

		console.log('GameDataCenter.player.doudouInfo.fentomoneylibi = ' + GameDataCenter.player.doudouInfo.fentomoneylibi);
		//豆变现
		let doutoyuan = GameDataCenter.player.doudou * GameDataCenter.player.doudouInfo.fentomoneylibi;

		UIHelp.SetLabel(this.ui.userinfo_node_doudou, Utils.convertShow(GameDataCenter.player.doudou));
		UIHelp.SetLabel(this.ui.redpack_num, GameDataCenter.player.cash)
		UIHelp.SetLabel(this.ui.userinfo_node_id, "ID:" + GameDataCenter.player.id)
		console.log(GameDataCenter.player);
		let cutUserName: string = Utils.cutString(GameDataCenter.player.name, 10) || " ";
		UIHelp.SetLabel(this.ui.userinfo_node_name, cutUserName);
		UIHelp.SetSpriteFrame(this.ui.userinfo_node_face, GameDataCenter.player.avatar)
		UIHelp.SetLabel(this.ui.userinfo_node_doudou1, Utils.convertShow(GameDataCenter.player.goldcoin));
		this.ui.user_vip_info.active = false
		this.ui.user_vip_superman.active = false
		// this.ui.btn_lhcsr.active = true
		if (GameDataCenter.player.isVip()) {
			this.ui.user_vip_info.active = true
		}
		if (GameDataCenter.player.isFounder()) {
			// this.ui.user_vip_info.active = true
			// this.ui.user_vip_superman.active = true
			this.ui.btn_lhcsr.active = false
		}

		UIHelp.SetLabel(this.ui.label_jiangjuan, `${Utils.convertShow(GameDataCenter.player.coupon)}张`);
		UIHelp.SetLabel(this.ui.label_zhenzhu, `${Utils.convertShow(GameDataCenter.player.money)}个`);

		UIHelp.SetLabel(this.ui.versionLbl, "版本:" + ConfigModule.VERSION);

		let huiyuanendtime: number = GameDataCenter.player.huiyuanendtime;
		if (huiyuanendtime == 0) {
			this.ui.huiyuandate.getComponent(cc.Label).string = "未开通";
		} else {
			let date: Date = new Date();
			if (date.getTime() >= huiyuanendtime * 1000) {
				this.ui.huiyuandate.getComponent(cc.Label).string = "已过期";
			} else {

				let str = Utils.timestampToDateString(huiyuanendtime);

				this.ui.huiyuandate.getComponent(cc.Label).string = str + "到期";
			}

		}
	}

	_canyu: number = 0;
	_canget = false;
	vo: any;
	//vip瓜分信息
	onVipInfo(data) {
		this.vo = data;
		console.log('????????', this.vo);
		UIHelp.SetLabel(this.ui.vip_node_renshu, `${data.todaycount}人参与`)
		UIHelp.SetLabel(this.ui.vip_node_content_lab, `昨日奖池共计<color=#EF8E39>${data.yestodayfen}</c>乐豆，每人瓜分${data.yestodayaverage}个`)
		this._canget = data.canget > 0;
		this._canyu = data.canyu;

		let joined: number = this.getSelfNumber(this.vo.canyu);
		if(!joined){
			this.ui.canyuText.active = false;
			this.ui.btn_guafen.active = true;
		}else{
			this.ui.canyuText.active = true;
			this.ui.btn_guafen.active = false;
		}
		// if (this._canyu == 1) {
		// 	this.ui.canyuText.active = true;
		// 	this.ui.btn_guafen.active = false;
		// } else {
		// 	this.ui.canyuText.active = false;
		// 	this.ui.btn_guafen.active = true;
		// }
		if (this.canGuaFen()) {

			UIHelp.SetLabel(this.ui.lab_guafen, "领取");
			this.ui.btn_lingqu.active = true;
		} else {
			UIHelp.SetLabel(this.ui.lab_guafen, "参与瓜分");
			this.ui.btn_lingqu.active = false;
		}
	}
	canGuaFen() {
		let joined: number = this.getSelfNumber(this.vo.canyu);
		let reward: number = this.getSelfNumber(this.vo.canget);
		if (joined && reward) {
			return true;
		}
		return false;
	}


	getSelfNumber(value: any) {
		let num: number = null;
		console.log(typeof (value));
		if (typeof (value) == "string") {
			let arr: string[] = value.split('.');
			if (arr.length == 1) {
				num = parseInt(value);
			} else {
				num = parseFloat(value);
			}
			return num;
		} else if (typeof (value) == "number") {
			return value;
		} else {
			return 0;
		}
	}

	//参与瓜分
	onVipCanyu() {
		if (!GameDataCenter.player.isVip()) {
			UIHelp.ShowUI(UIVip_node);
			return;
		}

		let joined: number = this.getSelfNumber(this.vo.canyu);
		let reward: number = this.getSelfNumber(this.vo.canget);
		console.log('?????', joined, reward);
		if (joined && reward) {
			GameDataCenter.player.onGetVipFen();
			return;
		}
		if (joined && !reward) {
			UIHelp.ShowTips("瓜分中，请耐心等待。");
			return;
		}
		if (!joined && !reward) {
			GameDataCenter.zhuanpan.vipfreead("VIP瓜分乐豆");
			return;
		}
		if (!joined && reward) {
			GameDataCenter.zhuanpan.vipfreead("VIP瓜分乐豆");
			console.log('????');
		}



		// if (parseInt(this.vo.canyu) == 1 && this.vo.canget) {
		// 	//能领取

		// 	return;
		// }
		// if (parseInt(this.vo.canyu) == 0 && (parseInt(this.vo.canget) == 0 || this.vo.canget == "" || this.vo.canget == null)) {
		// 	//能参与
		// 	if (GameDataCenter.player.isVip()) {
		// 		GameDataCenter.zhuanpan.vipfreead("VIP瓜分乐豆");
		// 		return;
		// 	}
		// 	return;
		// }
		// if (!this.canCanyu()) {
		// 	UIHelp.ShowTips("瓜分中，请耐心等待。");
		// 	return;
		// }
		// if (this.canGuaFen()) {
		// 	GameDataCenter.player.onGetVipFen();
		// 	return;
		// }


		//看视频参与瓜分
		// GameDataCenter.baseSdk.createVideo(VideoEvent.VIPGETDOUDOU, ConfigModule.VIDEO_NAME.VIPGETDOUDOU, ConfigModule.VIDEO_ID.VIPGETDOUDOU);
	}
	// 可参与
	canCanyu() {
		console.log("可参与", this._canyu);
		return this._canyu == 0;
	}

	/**
	 * 	//赠送
	 * @param type 1乐豆 2金币
	 */
	onGive1() {
		UIHelp.ShowUI(UIDoudouGive, null, 1)
	}
	onGive2() {
		UIHelp.ShowUI(UIDoudouGive, null, 2)
	}
	//我的yyd
	onShowyyd() {
		UIHelp.ShowUI(UIWithdrawal_record, null, "fen");
		// UIHelp.ShowUI(UIDoudouToMoney);
	}

	onGoldCoinLog() {
		UIHelp.ShowUI(UIWithdrawal_record, null, "goldcoin");
		// UIHelp.ShowUI(UIDoudouToMoney);
	}
	onShowHelp() {
		UIHelp.ShowUI(UIHelpCenter)
	}
	/**
	 * 提现
	 */
	onTixian() {
		UIHelp.ShowUI(UIWithdrawal_node)
	}
	onClose() {
		UIHelp.CloseUI(UIMine_node);
	}
	onSet() {
		UIHelp.ShowUI(UISet)
	}
	//购买Vip
	onbuySuperVip() {
		UIHelp.ShowUI(UISuperVip_node)
	}

	//邀请啊
	onShowInvite() {
		UIHelp.ShowUI(UIInvite_info);
	}

	//检查更新
	onCheckUpdata() {
		if (!cc.sys.isNative) {
			return
		}
		const localVersion = cc.sys.localStorage.getItem("localHotUpdateVersion");
		UIHelp.ShowTips(localVersion);
	}

	//实名
	onAli() {
		//进行实名
		if (!Boolean(GameDataCenter.player.realnanme)) {
			UIHelp.ShowUI(UIAli)
		}
		else {
			UIHelp.ShowTips("您已经完成了实名认证")
		}
	}

}