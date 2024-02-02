import GameDataCenter from "../../../data/GameDataCenter";
import auto_doudouGive from "../../../data/autoui/mine/auto_doudouGive";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIDoudouToMoneyRecord from "./UIDoudouToMoneyRecord";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIDoudouGive")
export default class UIDoudouGive extends UIBase {
	ui: auto_doudouGive = null;

	protected static prefabUrl = "mine/doudouGive";
	protected static className = "UIDoudouGive";

	onUILoad() {
		this.ui = this.node.addComponent(auto_doudouGive);
	}

	onShow() {
		this.initEvent(GameEvent.GIVEDOUDOU_SUCESS, this.onClose);
		this.initEvent(GameEvent.GetFee, this.onGetFee);
		this.initEvent(GameEvent.GetLove, this.onGetLove);

		this.onRegisterEvent(this.ui.btn_record, this.onRecord);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_give, this.onGive);
		GameDataCenter.player.getFee()
		GameDataCenter.player.getaixin();
	}

	onGetLove(res: {
		data: {
			fen_aixinzhi: number,
			goldcoin_aixinzhi: number,
			love: string,
		},
		errcode: number
	}) {
		if (res.errcode) {

			return;
		}
		let str: string = "乐豆";
		let key: string = "fen_aixinzhi";
		if (this.typeCache == 1) {
			str = "乐豆";
			key = "fen_aixinzhi";
			this.ui.lab_aixinc.getComponent(cc.RichText).string = `<color=#333333>可赠送${str}:</c><color=#FE3E00>${Utils.convertShow(GameDataCenter.player.doudou)}个</color>`;

		} else if (this.typeCache == 2) {
			str = "金币";
			key = "goldcoin_aixinzhi";
			this.ui.lab_aixinc.getComponent(cc.RichText).string = `<color=#333333>可赠送${str}:</c><color=#FE3E00>${Utils.convertShow(GameDataCenter.player.goldcoin)}个</color>`;
		}
		let love: number = parseFloat(res.data.love);
		let count: number = 0;
		if (love) {
			count = (res.data[key] / love);
		}
		this.ui.lab_aixin.getComponent(cc.RichText).string = `<color=#333333>拥有爱心值:</c><color=#FE3E00>${love}个</color>`;
		// this.ui.lab_aixinc.getComponent(cc.RichText).string = `<color=#333333>可赠送${str}:</c><color=#FE3E00>${count.toFixed(0)}个</color>`;

	}

	onGetFee(res: { errcode: number, errmsg: string, data: { fee: { normal: number, huiyuan: number, dawanjia: number } } }) {
		let str: string = "";
		if (res.errcode) {
			str = "获取手续费信息失败，请关闭页面重试";
		} else {
			let data = res.data.fee;
			str = `普通用户手续费${data.normal}%,VIP手续费${data.huiyuan}%，大玩家手续费${data.dawanjia}%`;
		}
		UIHelp.SetLabel(this.ui.lab_content, str);

	}
	//乐豆兑换记录
	onRecord() {
		UIHelp.ShowUI(UIDoudouToMoneyRecord);
	}

	onHide() {

	}
	protected typeCache: number = null;
	onInit(type: number): void {
		this.typeCache = type;
	}
	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		this.initUI()
	}
	initUI() {
		if (this.typeCache == 1) {
			let std = '<color=#350000>拥有乐豆:</color>';
			std += `<color=#FE3E00><size=40>${Utils.convertShow(GameDataCenter.player.doudou)}</size></color>`;
			std += '<color=#350000>个</color>';
			this.ui.lab_doudou.getComponent(cc.RichText).string = std;
			UIHelp.SetLabel(this.ui.lab_close_title, `乐豆转赠`);
		} else if (this.typeCache == 2) {
			let std = '<color=#350000>拥有金币:</color>';
			std += `<color=#FE3E00><size=40>${Utils.convertShow(GameDataCenter.player.goldcoin)}</size></color>`;
			std += '<color=#350000>个</color>';
			this.ui.lab_doudou.getComponent(cc.RichText).string = std;
			UIHelp.SetLabel(this.ui.lab_close_title, `金币转赠`);
		}


	}
	onGive() {
		let id = this.ui.EditBox.getComponent(cc.EditBox).string
		let num = this.ui.EditBox1.getComponent(cc.EditBox).string
		if (id && num) {
			if (this.typeCache == 1) {
				GameDataCenter.player.onGiveSomebadyDou(num, id)
			} else if (this.typeCache == 2) {
				GameDataCenter.player.onGiveSomebadyGold(num, id)
			}

		}
		else {
			UIHelp.ShowTips("输入正确的信息")
		}

	}
	onClose() {
		UIHelp.CloseUI(UIDoudouGive);
	}
}