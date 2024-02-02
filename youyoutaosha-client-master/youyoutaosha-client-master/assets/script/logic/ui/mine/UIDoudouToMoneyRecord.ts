import GameDataCenter from "../../../data/GameDataCenter";
import auto_doudouToMoneyRecord from "../../../data/autoui/mine/auto_doudouToMoneyRecord";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIDoudouToMoneyRecord")
export default class UIDoudouToMoneyRecord extends UIBase {
	ui: auto_doudouToMoneyRecord = null;

	protected static prefabUrl = "mine/doudouToMoneyRecord";
	protected static className = "UIDoudouToMoneyRecord";

	onUILoad() {
		this.ui = this.node.addComponent(auto_doudouToMoneyRecord);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);

		this.initEvent(GameEvent.GETWITHDRAWLOGS, this.onGetwithdrawlogs);

		this.ui.list.on('scroll-to-bottom', this.onScrollToBottom.bind(this));
	}
	limit = 20;
	vo: any = null;

	dataMap: any = {};
	onGetwithdrawlogs(data) {
		this.vo = data;

		data.list.forEach(item => {
			this.dataMap[item.id] = item;
		});

		const dataList = Object.values(this.dataMap).sort((a: any, b: any) => {
			return b.id - a.id;
		});

		const virtualList = this.ui.list.getComponent(VirtualList);
		virtualList.clearAll();
		dataList.forEach(item => {
			virtualList.push(item);
		});
	}
	onScrollToBottom() {
		const listLength = this.ui.list.getComponent(VirtualList).getDataArr().length;
		const page = Math.ceil(listLength / this.limit);
		GameDataCenter.player.getwithdrawlogs(page + 1, this.limit);
	}

	onHide() {

	}

	onStart() {
		GameDataCenter.player.getwithdrawlogs(1, this.limit);
		
		this.scheduleOnce(() => {
			this.ui.list.getComponent(cc.ScrollView).scrollToTop();
		}, 0.1);
	}

	onClose() {
		UIHelp.CloseUI(UIDoudouToMoneyRecord);
	}
}