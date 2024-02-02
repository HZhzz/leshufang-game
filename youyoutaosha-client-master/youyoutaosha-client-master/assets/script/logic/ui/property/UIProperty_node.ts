import GameDataCenter from "../../../data/GameDataCenter";
import auto_property_node from "../../../data/autoui/property/auto_property_node";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/property/UIProperty_node")
export default class UIProperty_node extends UIBase {
	ui: auto_property_node = null;

	protected static prefabUrl = "property/property_node";
	protected static className = "UIProperty_node";
	voPt: any
	voSp: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_property_node);
	}

	onShow() {
		this.initEvent(GameEvent.GET_MYCARDLIST, this.initScrollView);
		this.initEvent(GameEvent.GET_MYRAREPARK, this.initXiyouScrollView);
		this.initEvent(GameEvent.SELL_ALLCAR_SUCCSE, this.onAllSellCarSuccse);


		this.onRegisterEvent(this.ui.btn_sell, this.onSell);
		this.onRegisterEvent(this.ui.btn_sale, this.onSellAll);
		this.onRegisterEvent(this.ui.sale_close, this.oncloseSale);

		// 防止显示不全
		let parentScrollView = this.getParentScrollView();
		if (parentScrollView) {
			this.ui.ScrollView.on('scroll-to-top', () => {
				parentScrollView.scrollToTop(0.5);
			});
			// this.ui.ScrollView.on('scroll-to-bottom', () => {
			// 	parentScrollView.scrollToBottom(0.5);
			// });
			this.ui.ScrollView1.on('scroll-to-top', () => {
				parentScrollView.scrollToTop(0.5);
			});
			this.ui.ScrollView1.on('scroll-to-bottom', () => {
				parentScrollView.scrollToBottom(0.5);
			});
		}
	}

	getParentScrollView() {
		let node = this.node;
		do {
			node = node.parent;
			const scrollView = node.getComponent(cc.ScrollView);
			if (scrollView) {
				return scrollView;
			}
		} while (node.parent);
	}

	onHide() {

	}

	onStart() {
		//车库列表
		GameDataCenter.select.getMygarage()
		//稀有列表
		GameDataCenter.select.getMyXiyouCar()
	}
	//普通车辆
	initScrollView(data) {
		let list = data.list
		this.voPt = data

		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();
		for (let index of list) {
			virtualList.push(index);
		}


	}
	//稀有车辆
	initXiyouScrollView(data) {
		//稀有车总价个
		UIHelp.SetLabel(this.ui.lab_num, data.totalprice.toFixed(2))

		//稀有车数据
		let list = data.list
		const virtualList = this.ui.ScrollView.getComponent(VirtualList);
		virtualList.clearAll();

		for (let index of list) {
			virtualList.push(index);
		}
	}
	onClose() {
		UIHelp.CloseUI(UIProperty_node);
	}

	//打开出售
	onSell() {
		this.ui.sale_node.active = true
		const virtualList2 = this.ui.ScrollView2.getComponent(VirtualList);
		virtualList2.clearAll();
		let allSellPrice = 0
		for (let i = 0; i < this.voPt.list.length; i++) {
			allSellPrice += Number(this.voPt.list[i].sellprice) * this.voPt.list[i].num
		}

		for (let index of this.voPt.list) {
			virtualList2.push(index);

		}

		this.node.parent.parent.parent.getComponent(cc.ScrollView).scrollToBottom(0.5);

		UIHelp.SetLabel(this.ui.sale_num, `确认出售我的所有普通金蟾，共${this.voPt.totalnum}只`)
		UIHelp.SetLabel(this.ui.sale_lab_money, `预计能获得 ${allSellPrice}`)
	}
	//一键出售
	onSellAll() {
		if (this.voPt.totalnum == 0) {
			UIHelp.ShowTips("没有可出售的普通金蟾");
			return;
		}
		GameDataCenter.select.SetSellAllCarPt();
	}
	//一键出售成功
	onAllSellCarSuccse() {
		//关闭
		this.oncloseSale()
		//车库列表
		GameDataCenter.select.getMygarage()
	}
	oncloseSale() {
		this.ui.sale_node.active = false
	}
}