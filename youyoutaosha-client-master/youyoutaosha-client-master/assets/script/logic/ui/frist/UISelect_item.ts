import GameDataCenter from "../../../data/GameDataCenter";
import auto_select_item from "../../../data/autoui/frist/auto_select_item";
import { MyTools } from "../../../utils/MyTools";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UISelect_item")
export default class UISelect_item extends VirtualItem {
	ui: auto_select_item = null;

	protected static prefabUrl = "frist/select_item";
	protected static className = "UISelect_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_select_item);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_stop, this.onStop);
		this.onRegisterEvent(this.ui.btn_sell, this.onSell);
	}

	onHide() {

	}

	onStart() {

	}
	formatTimestamp(timestamp: number): string {
		const date = new Date(timestamp);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		const day = String(date.getDate()).padStart(2, '0');

		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		return formattedDateTime;
	}
	//记载item数据
	onInitItem(vo) {
		console.log('sunstones', vo);
		this.vo = vo
		if (vo.type == "1") {
			UIHelp.SetLabel(this.ui.lab_name, vo.name + "x" + vo.num)
			UIHelp.SetLabel(this.ui.lab_doc1, `产银两：${vo.coin}个/分钟`)
			UIHelp.SetLabel(this.ui.lab_doc2, `产奖券：${vo.coupon}张/小时`)
			this.ui.btn_stop.active = true;
			this.ui.btn_sell.active = true;
		} else {
			UIHelp.SetLabel(this.ui.lab_name, vo.name)
			UIHelp.SetLabel(this.ui.lab_doc1, `过期时间`)
			if (parseInt(vo.day) > 0) {
				const dateString = vo.create_time;
				const timestamp = new Date(dateString).getTime();
				let time = timestamp + parseInt(vo.day) * 1000 * 86400;
				let t = time - new Date().getTime();
				let d = Math.floor(t / 1000 / 86400);
				// let str = this.formatTimestamp(time);
				UIHelp.SetLabel(this.ui.lab_doc2, d + "天")
			} else {
				UIHelp.SetLabel(this.ui.lab_doc2, `永久`)
			}


			this.ui.btn_stop.active = false;
			this.ui.btn_sell.active = false;
		}


		this.ui.sp_car.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.sp_car, vo.url).then(() => {
			MyTools.scaleToSize(this.ui.sp_car, this.ui.sp_size);
			this.ui.sp_car.opacity = 255;
		});
	}
	//停车 
	onStop() {
		GameDataCenter.select.setStopCar(this.vo.goodsid)
	}
	//出售
	onSell() {
		GameDataCenter.select.SetSellCarPt(this.vo.goodsid);
	}
	onClose() {
		UIHelp.CloseUI(UISelect_item);
	}
}