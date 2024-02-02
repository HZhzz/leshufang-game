import GameDataCenter from "../../../data/GameDataCenter";
import auto_handbook_node from "../../../data/autoui/frist/auto_handbook_node";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIHandbook_node")
export default class UIHandbook_node extends UIBase {
	ui: auto_handbook_node = null;

	protected static prefabUrl = "frist/handbook_node";
	protected static className = "UIHandbook_node";
	vo: any;
	type: number = 0;
	onUILoad() {
		this.ui = this.node.addComponent(auto_handbook_node);
	}

	onShow() {
		this.initEvent(GameEvent.HANDBOOK_LIST, this.initScrollView);
		this.initEvent(GameEvent.GETHANDLISTSUESS, this.onGetList);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.toggle1, this.initPtcar);
		this.onRegisterEvent(this.ui.toggle2, this.initXycar);


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

		this.onGetList()
	}

	//获取列表
	onGetList() {
		//图鉴列表
		GameDataCenter.car.getHandBooklist()
	}
	initScrollView(list) {
		this.vo = list
		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();
		if (this.type == 1) {
			for (let index of list.special) {
				virtualList.push(index);
			}
		} else {
			for (let index of list.normal) {
				virtualList.push(index);
			}
		}
	}

	//切换普通
	initPtcar() {
		this.type = 0
		this.initScrollView(this.vo)
	}
	//切换稀有
	initXycar() {
		this.type = 1
		this.initScrollView(this.vo)
	}
	onClose() {
		UIHelp.CloseUI(UIHandbook_node);
	}
}