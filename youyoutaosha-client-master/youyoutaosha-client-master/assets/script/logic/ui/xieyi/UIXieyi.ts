import GameDataCenter from "../../../data/GameDataCenter";
import auto_xieyi from "../../../data/autoui/xieyi/auto_xieyi";
import { GameEvent } from "../../../data/const/EventConst";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/xieyi/UIXieyi")
export default class UIXieyi extends UIBase {
	ui: auto_xieyi = null;

	protected static prefabUrl = "xieyi/xieyi";
	protected static className = "UIXieyi";
	type: number = 0
	onUILoad() {
		this.ui = this.node.addComponent(auto_xieyi);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_close, this.onClose);

		this.initEvent(GameEvent.GET_AGREEMENT_SUCCESS, this.onAgreement);
	}

	onInit(params: any): void {
		this.type = params[0]
	}

	onHide() {

	}

	onStart() {
		const scrollList = [this.ui.Scrollys, this.ui.Scrollyh, this.ui.Scrollgy];
		scrollList.forEach((scroll) => {
			scroll.active = false;
		});
		cc.tween(this.node)
			.delay(0.0)
			.call(() => {
				scrollList[this.type].getComponent(cc.ScrollView).scrollToTop();
			})
			.start();

		if (this.type == UIXieyi.GUANYU_WOMEN) {
			scrollList[this.type].active = true;
			return;
		}

		GameDataCenter.account.getAgreement();
	}

	public static YINSI_XIEYI = 0;
	public static YONGHU_XIEYI = 1;
	public static GUANYU_WOMEN = 2;

	onAgreement(data: any) {
		let text: string;
		if (this.type == UIXieyi.YINSI_XIEYI) {
			text = data.yinsi;
		} else if (this.type == UIXieyi.YONGHU_XIEYI) {
			text = data.yonghu;
		}

		if (!text) {
			return;
		}

		this.ui.Scrollys.active = true;
		this.ui.contentys.removeAllChildren();
		console.log('onAgreement');
		const textList = text.split('\n');
		console.log('textList');
		textList.forEach((str, idx) => {
			const delay = idx * 0.1;
			console.log(`delay: ${delay}, idx: ${idx}, str: ${str}`);
			cc.tween(this.node)
				.delay(delay)
				.call(() => {
					console.log(`str: ${str}`);
					const item = cc.instantiate(this.ui.item);
					item.active = true;
					item.getComponent(cc.Label).string = str;
					this.ui.contentys.addChild(item);
					cc.tween(item)
						.set({ opacity: 0 })
						.to(0.2, { opacity: 255 })
						.start();
				})
				.start();
		});
	}

	onClose() {
		UIHelp.CloseUI(UIXieyi);
	}
}