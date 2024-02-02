import GameDataCenter from "../../../data/GameDataCenter";
import auto_select_car from "../../../data/autoui/frist/auto_select_car";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UISelect_car")
export default class UISelect_car extends UIBase {
	ui: auto_select_car = null;

	protected static prefabUrl = "frist/select_car";
	protected static className = "UISelect_car";

	onUILoad() {
		this.ui = this.node.addComponent(auto_select_car);
	}

	onShow() {
		this.initEvent(GameEvent.GET_MYCARDLIST, this.loadList1);
		this.initEvent(GameEvent.GET_MYCARLIST, this.loadList2);
		this.initEvent(GameEvent.STOP_CAR, this.onStopSuccse);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
	}
	list: any[] = [];
	loadList1(data) {
		this.list = [];
		data.list.forEach((item) => {
			this.list.push(item);
		});
		GameDataCenter.select.getMyCar()
	}

	loadList2(data) {
		console.log('loadlist2');
		data.data.list.forEach((item) => {
			this.list.push(item);
		});
		this.initScrollView(this.list);
	}

	onHide() {

	}

	onStart() {
		//车库列表
		GameDataCenter.select.getMygarage()
		
	}

	//停车成功
	onStopSuccse() {
		//车库列表
		GameDataCenter.select.getMygarage()
		//我的停车场
		GameDataCenter.car.getCarList(0);
	}
	//赋值
	initScrollView(list) {
		console.log('data', list);
		const virtualList = this.ui.ScrollView.getComponent(VirtualList);
		virtualList.clearAll();
		if (list.length <= 0) {
			UIHelp.ShowTips("暂无金蟾")
			return;
		}
		for (let index of list) {
			virtualList.push(index);
		}
	}
	onClose() {
		UIHelp.CloseUI(UISelect_car);
	}
}