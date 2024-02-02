import GameDataCenter from "../../../data/GameDataCenter";
import auto_shop_item from "../../../data/autoui/frist/auto_shop_item";
import { GameEvent } from "../../../data/const/EventConst";
import EventMng from "../../../manager/EventMng";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIShop_item")
export default class UIShop_item extends VirtualItem {
	ui: auto_shop_item = null;

	protected static prefabUrl = "frist/shop_item";
	protected static className = "UIShop_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_shop_item);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_buy, this.onClickBuy);

	}

	onHide() {

	}

	onStart() {
	}
	//记载item数据
	onInitItem(vo) {
		console.log(vo);
		this.vo = vo
		UIHelp.SetLabel(this.ui.lab_name, vo.name)
		UIHelp.SetLabel(this.ui.lab_doc1, `每分钟收益: ${vo.coin}个银两`)
		UIHelp.SetLabel(this.ui.doc2, `产奖券${vo.coupon}张/小时`)
		UIHelp.SetLabel(this.ui.btn_buy_lab, Utils.convertShow(vo.price))

		const size = this.ui.img_size.getContentSize();
		console.log(vo.url);

		UIHelp.loadPng(this.ui.sp_img, vo.url);



		// UIHelp.SetSpriteFrame(this.ui.sp_img, vo.url).then(() => {
		// 	// const scale = Math.min(size.width / this.ui.sp_img.width, size.height / this.ui.sp_img.height);
		// 	// console.log(scale);
		// 	// this.ui.sp_img.scale = scale;
		// });
	}

	//购买
	onClickBuy() {
		// UIHelp.ShowTips("敬请期待")
		EventMng.emit(GameEvent.BUY_ITEM, this.vo);
	}
	onClose() {
		UIHelp.CloseUI(UIShop_item);
	}
}