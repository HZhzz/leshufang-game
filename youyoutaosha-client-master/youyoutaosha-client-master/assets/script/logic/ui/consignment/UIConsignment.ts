import GameDataCenter from "../../../data/GameDataCenter";
import auto_consignment from "../../../data/autoui/consignment/auto_consignment";
import { GameEvent } from "../../../data/const/EventConst";
import { MyTools } from "../../../utils/MyTools";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIWithdrawal_record from "../mine/UIWithdrawal_record";
import UIConsignment_record from "./UIConsignment_record";
import UIOrder from "./UIOrder";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/consignment/UIConsignment")
export default class UIConsignment extends UIBase {
	ui: auto_consignment = null;

	protected static prefabUrl = "consignment/consignment";
	protected static className = "UIConsignment";
	buyNumIndex: number = 0
	vo: any;
	type: number = 1
	onUILoad() {
		this.ui = this.node.addComponent(auto_consignment);
	}

	onShow() {
		this.initEvent(GameEvent.OPEN_BUY_CAR, this.onShowBuyCard);
		this.initEvent(GameEvent.SALECARCON_LIST, this.initScrollView);
		this.initEvent(GameEvent.BUYSUPERCARD, this.onCloseBuyCard);
		this.initEvent(GameEvent.ALLSUPERCARLIST, this.initScrollView2);
		//发布求购成功
		this.initEvent(GameEvent.APPLIY_BUY_SUCCSE, this.onSeleteBuy);
		//发布出售成功
		this.initEvent(GameEvent.APPLIY_SOID_SUCCSE, this.onSeleteSale);
		//取消订单
		this.initEvent(GameEvent.CANCEL_APPLIY, this.onCancelOrder);

		this.initEvent(GameEvent.ORDER_SELETECAR, this.onSetSeleteCar);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_my_shou, this.onShowBuyOrder);
		this.onRegisterEvent(this.ui.btn_my_sell, this.onShowSaleOrder);
		this.onRegisterEvent(this.ui.btn_buy_car_close, this.onCloseBuyCard);
		this.onRegisterEvent(this.ui.buy_power_info_jia, this.onAddpower);
		this.onRegisterEvent(this.ui.buy_power_info_jian, this.onjianpower);
		this.onRegisterEvent(this.ui.btn_buy_power_info_all, this.onBuyAll);
		this.onRegisterEvent(this.ui.btn_buy, this.onBuy);

		this.onRegisterEvent(this.ui.all_car, this.onShowAllCard);
		this.onRegisterEvent(this.ui.all_all_car, this.onCloseAllCar);
		this.onRegisterEvent(this.ui.black_back, this.onCloseAllCar);

		this.onRegisterEvent(this.ui.toggle1, this.onSeleteSale);
		this.onRegisterEvent(this.ui.toggle2, this.onSeleteBuy);

		this.onRegisterEvent(this.ui.btn_record, this.onRecord);
	}

	onSetSeleteCar(data: any) {
		this.ui.ba_all.active = false;
		GameDataCenter.consignment.getCarSaleList(this.type, data.id);
	}

	onHide() {

	}
	initScrollView(list) {
		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();
		for (let index of list) {
			virtualList.push(index, this.type);
		}

		// UIHelp.SetLabel(this.ui.all_car, )
	}
	initScrollView2(list) {
		if (this.ui.ba_all.active) {
			const virtualList = this.ui.ScrollView2.getComponent(VirtualList);
			if (virtualList) {
				virtualList.clearAll();
				for (let index of list) {
					virtualList.push(index);
				}
			}
		}
	}
	onStart() {
		setTimeout(() => {
			this.ui.ScrollView1.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		GameDataCenter.consignment.getCarSaleList(this.type)

	}
	onSeleteSale() {
		this.type = 1
		GameDataCenter.consignment.getCarSaleList(this.type)
	}
	onSeleteBuy() {
		this.type = 2
		GameDataCenter.consignment.getCarSaleList(this.type)
	}
	onCancelOrder() {
		GameDataCenter.consignment.getCarSaleList(this.type)
	}
	onClose() {
		UIHelp.CloseUI(UIConsignment);
	}
	onShowBuyOrder() {
		UIHelp.ShowUI(UIOrder, null, 1)
	}
	onShowSaleOrder() {
		UIHelp.ShowUI(UIOrder, null, 2)
	}
	onRecord() {
		UIHelp.ShowUI(UIConsignment_record);
	}

	/**
	 * 
	 * 购买车辆相关
	 * 
	 * 
	 * 
	 */
	//购买信息
	onShowBuyCard(data) {
		this.vo = data
		console.log(data);

		this.ui.icon_car.opacity = 0;
		UIHelp.SetSpriteFrame(this.ui.icon_car, data.url).then(() => {
			MyTools.scaleToSize(this.ui.icon_car, this.ui.icon_size);
			this.ui.icon_car.opacity = 255;
		});

		if (this.type == 1) {
			UIHelp.SetLabel(this.ui.buy_car_title, "购买金蟾")
			UIHelp.SetLabel(this.ui.btn_pow_lab, "确认购买")
		}
		else {
			UIHelp.SetLabel(this.ui.buy_car_title, "出售金蟾")
			UIHelp.SetLabel(this.ui.btn_pow_lab, "确认购买")
		}
		UIHelp.SetLabel(this.ui.lab_have_doudou, `${GameDataCenter.player.doudou}`)
		this.buyNumIndex = 1
		this.onSetBuyNum(1)
		this.ui.buy_car_node.active = true
	}
	//取消购买 //购买成功 //出售成功
	onCloseBuyCard() {

		this.ui.buy_car_node.active = false
	}
	//add
	onAddpower() {
		this.buyNumIndex++;
		this.buyNumIndex > this.vo.totalnum ? this.buyNumIndex = this.vo.totalnum : this.buyNumIndex;
		this.onSetBuyNum(this.buyNumIndex)
	}
	//jian
	onjianpower() {
		this.buyNumIndex--
		this.buyNumIndex <= 0 ? this.buyNumIndex = 1 : this.buyNumIndex;
		this.onSetBuyNum(this.buyNumIndex)

	}
	//all
	onBuyAll() {
		this.buyNumIndex = this.vo.totalnum
		this.onSetBuyNum(this.buyNumIndex)

	}
	//设置购买数量
	onSetBuyNum(num) {

		UIHelp.SetLabel(this.ui.lab_buy_power_info_num, num);
		if (this.type == 1) {
			UIHelp.SetLabel(this.ui.buy_power_info_1, `${this.vo.name}`);
			UIHelp.SetLabel(this.ui.btn_pow_lab, `确认购买`);

		}
		else {
			UIHelp.SetLabel(this.ui.buy_power_info_1, `${this.vo.name}`);
			UIHelp.SetLabel(this.ui.btn_pow_lab, `确认出售`);
		}
		UIHelp.SetLabel(this.ui.buy_power_info_have_dou, `${num * this.vo.price}个`);
	}
	//购买
	onBuy() {
		//购买
		if (this.type == 1) {
			GameDataCenter.consignment.getCarBuyspecial(this.vo.id, this.buyNumIndex)
		}
		//出售
		else {
			GameDataCenter.consignment.getCarSelcspecial(this.vo.id, this.buyNumIndex)
		}

	}

	//全部车辆
	onShowAllCard() {
		GameDataCenter.consignment.getAllSpecialCarlist()
		this.ui.ba_all.active = true
	}
	onCloseAllCar() {
		this.ui.ba_all.active = false;
		GameDataCenter.consignment.getCarSaleList(this.type);
	}
}