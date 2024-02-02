import GameDataCenter from "../../../data/GameDataCenter";
import auto_order from "../../../data/autoui/consignment/auto_order";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIOrder_item from "./UIOrder_item";
import UIPublish_order from "./UIPublish_order";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/consignment/UIOrder")
export default class UIOrder extends UIBase {
	ui: auto_order = null;

	protected static prefabUrl = "consignment/order";
	protected static className = "UIOrder";
	type = 0
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_order);
	}

	onShow() {
		this.initEvent(GameEvent.MYSALECARLIST, this.initScrollView);

		//发布求购成功
		this.initEvent(GameEvent.APPLIY_BUY_SUCCSE, this.ininUI);
		//发布出售成功
		this.initEvent(GameEvent.APPLIY_SOID_SUCCSE, this.ininUI);
		//取消订单
		this.initEvent(GameEvent.CANCEL_APPLIY, this.ininUI);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.down, this.onPublish);
	}

	dataMap: any = {};
	initScrollView(list) {
		list.forEach(item => {
			this.dataMap[item.id] = item;
		});

		const dataList = Object.values(this.dataMap).sort((a: any, b: any) => {
			return b.id - a.id;
		});

		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();
		dataList.forEach(item => {
			virtualList.push(item);
		});

		this.scheduleOnce(() => {
			this.ui.ScrollView1.getComponent(cc.ScrollView).scrollToTop();
		}, 0.1);
	}
	onHide() {

	}
	onInit(params: any): void {
		this.type = params[0]
	}
	onStart() {

		setTimeout(() => {
			this.ui.ScrollView1.getComponent(cc.ScrollView).scrollToTop()
		}, 1);

		this.ininUI()
	}
	ininUI() {
		if (this.type == 1) {//求购
			UIHelp.SetLabel(this.ui.oder_title, "我的求购")
			GameDataCenter.consignment.getCarMyNeedBuy()
			UIHelp.SetLabel(this.ui.btn_my_shou, "发布求购")
			this.ui.biaoti1.active = false;
			this.ui.biaoti.active = true;
		}
		else { //出售
			UIHelp.SetLabel(this.ui.oder_title, "我的出售")
			UIHelp.SetLabel(this.ui.btn_my_shou, "发布出售")
			GameDataCenter.consignment.getCarMySale()
			this.ui.biaoti1.active = true;
			this.ui.biaoti.active = false;
		}
	}
	//发布订单
	onPublish() {
		UIHelp.ShowUI(UIPublish_order, null, this.type)
	}
	onClose() {
		UIHelp.CloseUI(UIOrder);
	}
}