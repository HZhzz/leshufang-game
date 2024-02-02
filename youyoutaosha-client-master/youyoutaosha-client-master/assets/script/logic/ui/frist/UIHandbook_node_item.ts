import GameDataCenter from "../../../data/GameDataCenter";
import auto_handbook_node_item from "../../../data/autoui/frist/auto_handbook_node_item";
import { GameEvent } from "../../../data/const/EventConst";
import { MyTools } from "../../../utils/MyTools";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIShop_node from "./UIShop_node";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIHandbook_node_item")
export default class UIHandbook_node_item extends VirtualItem {
	ui: auto_handbook_node_item = null;

	protected static prefabUrl = "frist/handbook_node_item";
	protected static className = "UIHandbook_node_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_handbook_node_item);
	}

	onShow() {
		this.initEvent(GameEvent.GETHANDLISTSUESS, this.onGetHandListSuccess);

		this.onRegisterEvent(this.ui.img_go, this.onChickGo);
		this.onRegisterEvent(this.ui.btn_lingqu_red, this.onChickLingquRed);
		this.onRegisterEvent(this.ui.btn_lingqu_dou, this.onChickLingquRed);
		this.onRegisterEvent(this.ui.btn_lingqu_gold, this.onChickLingquRed);
		this.onRegisterEvent(this.ui.btn_lingqu_coupon, this.onChickLingquRed);
	}

	onGetHandListSuccess(data) {
		console.log(data);
	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		this.vo = vo
		console.log(vo);
		this.ui.img_red.active = false
		this.ui.img_dou.active = false
		this.ui.img_gold.active = false
		this.ui.img_go.active = false
		this.ui.img_coupon.active = false
		//未拥有
		if (vo.receive == 0) {
			this.ui.img_go.active = true
		}
		//可领取
		else if (vo.receive == 1) {
			//fen悠游豆coin银两money现金
			if (vo.prizetype == "fen") {
				this.ui.img_dou.active = true
				UIHelp.SetLabel(this.ui.lab_num_dou, vo.prizenum + "个")
			}
			else if (vo.prizetype == "coin") {
				this.ui.img_gold.active = true
				UIHelp.SetLabel(this.ui.lab_num_gold, vo.prizenum + "个")
			}
			else if (vo.prizetype == "money") {
				this.ui.img_red.active = true
				UIHelp.SetLabel(this.ui.lab_num_red, vo.prizenum + "个")
			}
			else if (vo.prizetype == "coupon") {
				this.ui.img_coupon.active = true
				UIHelp.SetLabel(this.ui.lab_num_coupon, vo.prizenum + "张")
			}
		}
		UIHelp.SetLabel(this.ui.book_name, vo.name)
		let str1: string = vo.type == 2 ? "乐豆" : "银两";
		let str2: string = vo.type == 2 ? "个/天" : "个/分";
		if (vo.type == 2) {
			UIHelp.SetLabel(this.ui.book_doc_1, `产${str1}: ${vo.fen}${str2}`)
		} else {
			UIHelp.SetLabel(this.ui.book_doc_1, `产${str1}: ${vo.coin}${str2}`)
		}
		UIHelp.SetLabel(this.ui.book_doc_2, `产奖券: ${vo.coupon}张/${vo.type == 2 ? "天" : "时"}`)
		this.ui.book_img.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.book_img, vo.url).then(() => {
			MyTools.scaleToSize(this.ui.book_img, this.ui.book_size);
			this.ui.book_img.opacity = 255;
		});
	}

	//点击go
	onChickGo() {
		UIHelp.ShowUI(UIShop_node)
	}
	//可能以后要加
	//领取红包
	onChickLingquRed() {
		GameDataCenter.player.onGethandbookprize(this.vo.id)
	}
	// //领取乐豆
	// onChickLingquDou() {
	// 	GameDataCenter.player.onGethandbookprize(this.vo.id)
	// }
	// //领取银两
	// onChickLingquYin() {
	// 	GameDataCenter.player.onGethandbookprize(this.vo.id)
	// }
	onClose() {
		UIHelp.CloseUI(UIHandbook_node_item);
	}
}