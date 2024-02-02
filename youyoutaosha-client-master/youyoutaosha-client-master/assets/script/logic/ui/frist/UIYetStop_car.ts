import GameDataCenter from "../../../data/GameDataCenter";
import auto_yetStop_car from "../../../data/autoui/frist/auto_yetStop_car";
import { MyTools } from "../../../utils/MyTools";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIEarly_back from "./UIEarly_back";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIYetStop_car")
export default class UIYetStop_car extends UIBase {
	ui: auto_yetStop_car = null;

	protected static prefabUrl = "frist/yetStop_car";
	protected static className = "UIYetStop_car";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_yetStop_car);
	}

	onShow() {
		this.onRegisterEvent(this.ui.car, this.onTakeBackCar);
	}

	onHide() {

	}

	onStart() {

	}
	onInitItem(vo) {
		this.vo = vo
		UIHelp.SetLabel(this.ui.yet_info_yin, `+${vo.getcoin / 10}`)
		UIHelp.SetLabel(this.ui.yet_info_gold, `+${vo.getcoupon / 10}`)
		this.action();
		this.ui.car.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.car, vo.url).then(() => {
			MyTools.scaleToSize(this.ui.car, this.ui.carSize);
			this.ui.car.opacity = 255;
		});
	}

	action() {
		let node: cc.Node = this.ui.yet_info;
		node.scale = 0;
		node.opacity = 255;
		cc.tween(node)
			.to(0.2, { scale: 1 })
			.delay(2 - 0.2)
			.to(0.2, { opacity: 0 })
			.delay(8 - 0.2)
			.call(() => {
				this.action();
			})
			.start();
	}

	//收回
	onTakeBackCar() {
		if (this.vo.minute >= 720 || this.vo.hour >= 12) {
			// 直接尝试回收，若失败再弹出提示
			GameDataCenter.select.getBackCar(this.vo.parkid);
			return;
		}
		//刷新我的停车场
		GameDataCenter.car.getCarList(0);
		//弹出提示
		UIHelp.ShowUI(UIEarly_back, null, this.vo.parkid);
	}
	onClose() {
		UIHelp.CloseUI(UIYetStop_car);
	}
}