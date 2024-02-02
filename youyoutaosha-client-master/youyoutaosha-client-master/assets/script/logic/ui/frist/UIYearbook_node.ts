import GameDataCenter from "../../../data/GameDataCenter";
import auto_yearbook_node from "../../../data/autoui/frist/auto_yearbook_node";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIYearbook_node")
export default class UIYearbook_node extends UIBase {
	ui: auto_yearbook_node = null;

	protected static prefabUrl = "frist/yearbook_node";
	protected static className = "UIYearbook_node";
	voing: any;
	voed: any;
	type: number = 1;
	onUILoad() {
		this.ui = this.node.addComponent(auto_yearbook_node);
	}

	onShow() {
		this.initEvent(GameEvent.YEATBOOK_LIST, this.initScrollView);
		this.initEvent(GameEvent.YEATBOOK_LIST_ED, this.initScrollView2);
		this.initEvent(GameEvent.YEATBOOK_PRIZE, this.onShouJied);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.toggle1, this.onShouJiIng);
		this.onRegisterEvent(this.ui.toggle2, this.onShouJied);

		// 防止显示不全
		this.ui.ScrollView1.on('scroll-to-top', () => {
			const scrollView = this.ui.ScrollView.getComponent(cc.ScrollView);
			scrollView.scrollToTop(0.5);
		});
		this.ui.ScrollView1.on('scroll-to-bottom', () => {
			const scrollView = this.ui.ScrollView.getComponent(cc.ScrollView);
			scrollView.scrollToBottom(0.5);
		});
	}

	onHide() {

	}

	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		this.onShouJied();
	}
	initScrollView(data) {
		console.log(data);
		let list = data.list
		this.voing = list
		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();
		for (let index of list) {
			virtualList.push(index);
		}
	}
	initScrollView2(data) {
		let list = data.list
		this.voed = list
		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();
		for (let index of list) {
			virtualList.push(index);
		}
	}
	//收集中
	onShouJiIng() {
		GameDataCenter.car.getYeatBookJqlist()
	}
	//已经集齐
	onShouJied() {
		GameDataCenter.car.getYeatBooklist()
	}
	onClose() {
		UIHelp.CloseUI(UIYearbook_node);
	}
}