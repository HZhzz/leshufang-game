import GameDataCenter from "../../../data/GameDataCenter";
import auto_consignment_record from "../../../data/autoui/consignment/auto_consignment_record";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/consignment/UIConsignment_record")
export default class UIConsignment_record extends UIBase {
	ui: auto_consignment_record = null;

	protected static prefabUrl = "consignment/consignment_record";
	protected static className = "UIConsignment_record";

	onUILoad() {
		this.ui = this.node.addComponent(auto_consignment_record);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);

		this.initEvent(GameEvent.GETJISHOULOGS, this.onGetjishoulogs);
		
		this.ui.list.on('scroll-to-bottom', this.onScrollToBottom.bind(this));
	}

	limit = 20;
	vo: any = null;

	dataMap: any = {};
	onGetjishoulogs(data) {
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

		this.scheduleOnce(() => {
			this.ui.list.getComponent(cc.ScrollView).scrollToTop();
		}, 0.1);
	}
	onScrollToBottom() {
		const listLength = this.ui.list.getComponent(VirtualList).getDataArr().length;
		const page = Math.ceil(listLength / this.limit);
		GameDataCenter.player.getwithdrawlogs(page + 1, this.limit);
	}

	onHide() {

	}

	onStart() {
		GameDataCenter.player.getjishoulogs();
	}

	onClose() {
		UIHelp.CloseUI(UIConsignment_record);
	}
}