import GameDataCenter from "../../../data/GameDataCenter";
import auto_shop_node from "../../../data/autoui/frist/auto_shop_node";
import { GameEvent } from "../../../data/const/EventConst";
import EventMng from "../../../manager/EventMng";
import { MyTools } from "../../../utils/MyTools";
import { Utils } from "../../../utils/Utils";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIBox from "../zhuanpan/UIBox";
import UISelect_car from "./UISelect_car";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIShop_node")
export default class UIShop_node extends UIBase {
	ui: auto_shop_node = null;
	cboxinfo: any;
	protected static prefabUrl = "frist/shop_node";
	protected static className = "UIShop_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_shop_node);
	}

	onShow() {

		this.initEvent(GameEvent.LOADBOXINFO, this.boxinfo);
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.initEvent(GameEvent.SHOP_LIST, this.initScrollView);
		this.initEvent(GameEvent.GET_MYCARDLIST, this.initUI);
		this.initEvent(GameEvent.BUY_ITEM, this.onBuyItem);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.img_lihe, this.openBox);
		this.onRegisterEvent(this.ui.btn_incheku, this.openCheku);
		this.onRegisterEvent(this.ui.btn_buy_car_close, this.onBuyCarClose);
		this.onRegisterEvent(this.ui.btn_buy, this.onBuy);

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

	onBuyCarClose() {
		this.ui.buy_car_node.active = false;
	}

	selectCarData: any;
	onBuyItem(data) {
		this.ui.buy_car_node.active = true;

		const scrollView = this.ui.ScrollView.getComponent(cc.ScrollView);
		scrollView.stopAutoScroll();
		scrollView.scrollToBottom();

		this.selectCarData = data;

		if (data.type == 1) {
			UIHelp.SetLabel(this.ui.lab_have_zhenzhu, `当前拥有${Utils.convertShow(GameDataCenter.player.goldcoin)}银两`);
			UIHelp.SetLabel(this.ui.buy_power_info, `购买1只${data.name}，需支付银两`);
			UIHelp.SetLabel(this.ui.buy_power_info_have_dou, `${Utils.convertShow(data.price)}个`);

		} else {
			UIHelp.SetLabel(this.ui.lab_have_zhenzhu, `当前拥有${Utils.convertShow(GameDataCenter.player.doudou)}乐豆`);
			UIHelp.SetLabel(this.ui.buy_power_info, `购买1只${data.name}，需支付乐豆`);
			UIHelp.SetLabel(this.ui.buy_power_info_have_dou, `${Utils.convertShow(data.price)}个`);

		}




		if (data.url) {
			this.ui.icon_car.opacity = 0;
			UIHelp.SetSpriteFrame(this.ui.icon_car, data.url).then(() => {
				MyTools.scaleToSize(this.ui.icon_car, this.ui.icon_size);
				this.ui.icon_car.opacity = 255;
			});
		} else {
			this.ui.icon_car.getComponent(cc.Sprite).spriteFrame = this.ui.icon_size.getComponent(cc.Sprite).spriteFrame;
			this.ui.icon_car.scale = 1;
			this.ui.icon_car.width = 220;
			this.ui.icon_car.height = 162;
		}
	}

	onBuy() {
		if (this.selectCarData.id == null) {
			if (GameDataCenter.player.money >= Number(this.cboxinfo.price)) {
				UIHelp.ShowUI(UIBox)
			} else {
				UIHelp.ShowTips("您的银两不足");
			}
			return;
		}
		GameDataCenter.car.ShopBuyCar(this.selectCarData.id);
	}

	onHide() {

	}

	onStart() {
		this.initUI()

		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);

		GameDataCenter.car.getShopList()
		GameDataCenter.car.onLoadBoxInfo()
		GameDataCenter.select.getMygarage()
	}
	initUI() {
		UIHelp.SetLabel(this.ui.lab_gold, Utils.convertShow(GameDataCenter.player.money));
		UIHelp.SetLabel(this.ui.lab_have_zhenzhu, `当前拥有${Utils.convertShow(GameDataCenter.player.money)}银两`);

		let totalnum = GameDataCenter.select.myParkData?.totalnum;
		if (totalnum == null) {
			totalnum = 0;
		}
		// UIHelp.SetLabel(this.ui.lab_cheku, `我的金蟾库：${totalnum}`);
	}
	openBox() {
		EventMng.emit(GameEvent.BUY_ITEM, {
			name: '终极宝箱',
			price: this.cboxinfo.price,
			url: '',
			id: null,
		});
		// if (GameDataCenter.player.money >= Number(this.cboxinfo.price)) {
		// 	UIHelp.ShowUI(UIBox)
		// }
		// else {
		// 	UIHelp.ShowTips("您的银两不足");
		// }
	}
	openCheku() {
		UIHelp.CloseUI(UIShop_node);
		UIHelp.ShowUI(UISelect_car);
	}
	initScrollView(list) {

		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();

		for (let index of list) {
			virtualList.push(index);
		}
	}
	//宝箱信息
	boxinfo(data) {
		this.cboxinfo = data
		UIHelp.SetLabel(this.ui.lab_open_box, Utils.convertShow(Number(data.price)) + "立即开启")
	}
	onClose() {
		UIHelp.CloseUI(UIShop_node);
	}
}