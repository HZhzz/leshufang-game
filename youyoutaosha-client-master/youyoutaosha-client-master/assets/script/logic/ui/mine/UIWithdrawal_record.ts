import GameDataCenter from "../../../data/GameDataCenter";
import auto_withdrawal_record from "../../../data/autoui/mine/auto_withdrawal_record";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIWithdrawal_record")
export default class UIWithdrawal_record extends UIBase {
	ui: auto_withdrawal_record = null;

	protected static prefabUrl = "mine/withdrawal_record";
	protected static className = "UIWithdrawal_record";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_withdrawal_record);
	}

	onShow() {
		this.initEvent(GameEvent.GetGiveLogs, this.onSetLogs);
		this.initEvent(GameEvent.GAME_LOGS, this.onSetLogs2);
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.ui.ScrollView.on('scroll-to-bottom', () => {
			if (this.type == 1) {
				this.onScrollToBottom();
			} else {
				this.onScrollToBottom2();
			}

		});
		this.ui.ScrollView.on('scroll-to-top', () => {
			if (this.type == 1) {
				this.onScrollToTop.bind(this)
			} else {
				this.onScrollToTop2.bind(this)
			}
		});
	}

	onHide() {

	}
	onInit(params: any): void {
		this.vo = params[0]
	
	}

	limit = 15;
	onStart() {
		if(this.vo == "issue"){
			this.ui.ToggleContainer.active = false;
			this.onClick2();
		}else{
			this.onClick1();
		}
	}
	type: number = 1;
	onClick1() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		this.type = 1;
		GameDataCenter.player.getGiveLogs(this.vo, 1, this.limit);
	}

	onClick2() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		this.type = 2;

		GameDataCenter.player.onGetLogs(this.vo, 1, this.limit);
	}

	//设置记录信息
	onSetLogs(data) {
		console.log('on data', data);
		const virtualList = this.ui.ScrollView.getComponent(VirtualList);
		virtualList.clearAll();
		for (let item of data.data.list) {
			virtualList.push({ ...item, type: this.vo });
		}
	}
	onSetLogs2(data) {
		console.log('on data', data);
		const virtualList = this.ui.ScrollView.getComponent(VirtualList);
		virtualList.clearAll();
		for (let item of data.list) {
			virtualList.push({ ...item, type: this.vo });
		}
	}
	onScrollToTop() {
		console.log('???');

		GameDataCenter.player.getGiveLogs(this.vo, 1, this.limit);
	}
	onScrollToBottom() {
		console.log('???');
		const listLength = this.ui.ScrollView.getComponent(VirtualList).getDataArr().length;
		const page = Math.ceil(listLength / this.limit);
		GameDataCenter.player.getGiveLogs(this.vo, page + 1, this.limit);
	}
	onScrollToTop2() {
		console.log('???');

		GameDataCenter.player.onGetLogs(this.vo, 1, this.limit);
	}
	onScrollToBottom2() {
		console.log('???');

		const listLength = this.ui.ScrollView.getComponent(VirtualList).getDataArr().length;
		const page = Math.ceil(listLength / this.limit);
		GameDataCenter.player.onGetLogs(this.vo, page + 1, this.limit);
	}
	onClose() {
		UIHelp.CloseUI(UIWithdrawal_record);
	}
}