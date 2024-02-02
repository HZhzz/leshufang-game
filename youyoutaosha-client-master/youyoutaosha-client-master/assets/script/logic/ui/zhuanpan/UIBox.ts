import GameDataCenter from "../../../data/GameDataCenter";
import auto_box from "../../../data/autoui/zhuanpan/auto_box";
import { GameEvent } from "../../../data/const/EventConst";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/zhuanpan/UIBox")
export default class UIBox extends UIBase {
	ui: auto_box = null;

	protected static prefabUrl = "zhuanpan/box";
	protected static className = "UIBox";

	onUILoad() {
		this.ui = this.node.addComponent(auto_box);
	}

	onShow() {
		this.initEvent(GameEvent.OPENBOXINFO, this.initUI);

		this.onRegisterEvent(this.ui.btn_huifu, this.onClose);
	}

	onHide() {

	}

	isNull:boolean = false;
	async initUI(data) {
		console.error('initUI',data);
		let url: string = null;
		switch (data.prize.type) {
			case 3:
				url = data.prize.goods_img;
				break;
			case 4:

				break;

			default:
				url = data.prize.url;
				break;
		}
		if (url) {
			await UIHelp.SetSpriteFrame(this.ui.car, url)
			UIHelp.resetImageSizeOnlyNode(this.ui.car);
		} else {
			this.isNull = true;
			UIHelp.ShowDialog({
				title: "开宝箱失败",
				content: "谢谢参与，再接再励",
			});
			UIHelp.CloseUI(UIBox);
		}

	}
	onStart() {
		GameDataCenter.car.onOpenBoxInfo()
	}

	onClose() {
		if(!this.isNull){
			UIHelp.ShowDialog({
				title: "提示",
				content: "领取成功",
			})
		}
		UIHelp.CloseUI(UIBox);
	}
}