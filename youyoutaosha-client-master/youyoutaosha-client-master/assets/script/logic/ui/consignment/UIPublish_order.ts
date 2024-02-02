import GameDataCenter from "../../../data/GameDataCenter";
import auto_publish_order from "../../../data/autoui/consignment/auto_publish_order";
import { GameEvent } from "../../../data/const/EventConst";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIWithdrawal_record from "../mine/UIWithdrawal_record";
import UIConsignment_record from "./UIConsignment_record";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/consignment/UIPublish_order")
export default class UIPublish_order extends UIBase {
	ui: auto_publish_order = null;

	protected static prefabUrl = "consignment/publish_order";
	protected static className = "UIPublish_order";
	vo: any;
	type: number = 0;
	onUILoad() {
		this.ui = this.node.addComponent(auto_publish_order);
	}

	onShow() {
		//所有稀有车辆
		this.initEvent(GameEvent.ALLSUPERCARLIST, this.initScrollView);
		//我的稀有车辆
		this.initEvent(GameEvent.GET_MYRAREPARK, this.initScrollView1);

		//发布求购成功
		this.initEvent(GameEvent.APPLIY_BUY_SUCCSE, this.onClose);
		//发布出售成功
		this.initEvent(GameEvent.APPLIY_SOID_SUCCSE, this.onClose);

		this.initEvent(GameEvent.ORDER_SELETECAR, this.onSetSeleteCar);


		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.order_type, this.onShowAllCar);
		this.onRegisterEvent(this.ui.btn_pay, this.onPubilish);
		this.onRegisterEvent(this.ui.bg_black, this.onHideAllCar);
		this.onRegisterEvent(this.ui.btn_record, this.onRecord);
	}

	onRecord() {
		UIHelp.ShowUI(UIConsignment_record);
	}

	onHide() {

	}
	initScrollView(list) {
		console.log(list);

		const virtualList = this.ui.ScrollView2.getComponent(VirtualList);
		virtualList.clearAll();
		for (let data of list) {
			virtualList.push({ ...data, selected: data.id == this.vo?.id });
		}
	}
	initScrollView1(data) {
		let list = data.list
		const virtualList = this.ui.ScrollView2.getComponent(VirtualList);
		virtualList.clearAll();
		for (let data of list) {
			console.log(data);
			virtualList.push({ ...data, selected: data.goodsid == this.vo?.goodsid });
		}
	}
	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);

		//求购
		if (this.type == 1) {
			UIHelp.SetLabel(this.ui.lab_close_title, "发布求购")
			UIHelp.SetLabel(this.ui.order_type_name, "选择求购商品")
			UIHelp.SetLabel(this.ui.order_danjia, "求购单价（乐豆）")
			UIHelp.SetLabel(this.ui.order_num, "求购数量")
			UIHelp.SetLabel(this.ui.btn_pay_lab, "发布求购")
			UIHelp.SetLabel(this.ui.lab_payment, `预付乐豆个数:0`);
			this.ui.mine.active = true;
			this.ui.btn_record.active = true;
			this.ui.img_fabuchushou.active = false;
			this.ui.img_fabuqiugou.active = true;

			this.ui.EditBox.getComponent(cc.EditBox).placeholder = "请输入求购数量"
		}
		else {
			UIHelp.SetLabel(this.ui.lab_close_title, "发布出售")
			UIHelp.SetLabel(this.ui.order_type_name, "选择出售商品")
			UIHelp.SetLabel(this.ui.order_danjia, "出售单价（乐豆）")
			UIHelp.SetLabel(this.ui.order_num, "出售数量")
			UIHelp.SetLabel(this.ui.btn_pay_lab, "发布出售")
			UIHelp.SetLabel(this.ui.lab_payment, `可出售数量:0`);
			this.ui.mine.active = false;
			this.ui.btn_record.active = false;
			this.ui.img_fabuchushou.active = true;
			this.ui.img_fabuqiugou.active = false;

			this.ui.EditBox.getComponent(cc.EditBox).placeholder = "请输入出售数量"
		}
		UIHelp.SetLabel(this.ui.lab_main_doudou, GameDataCenter.player.doudou)

		// 获取EditBox组件
		let editBox = this.ui.order_sell_number.getComponent(cc.EditBox);
		let editBox1 = this.ui.EditBox.getComponent(cc.EditBox);

		// 监听EditBox的输入事件
		editBox.node.on('text-changed', (event) => {
			let self = this
			// 处理输入内容变化的逻辑
			self.onChangeYuPay()
		}, this);
		// 监听EditBox的输入事件
		editBox1.node.on('text-changed', (event) => {
			let self = this
			// 处理输入内容变化的逻辑
			self.onChangeYuPay()
		}, this);
	}
	//选择车辆
	onShowAllCar() {
		//求购
		if (this.type == 1) {
			GameDataCenter.consignment.getAllSpecialCarlist()
		}
		//出售
		else {
			//我的稀有列表
			GameDataCenter.select.getMyXiyouCar()
		}
		this.ui.all_car_node.active = true;
	}
	onHideAllCar() {
		this.ui.all_car_node.active = false;
	}
	onInit(params: any): void {
		this.type = params[0]
	}
	//选中车辆
	onSetSeleteCar(data) {
		this.vo = data
		console.log(this.vo);

		//设置名字
		UIHelp.SetLabel(this.ui.order_type_name, this.vo.name)
		this.ui.all_car_node.active = false;

		if (this.type != 1) {
			UIHelp.SetLabel(this.ui.lab_payment, `可出售数量:${this.vo.num}`)
		}
	}
	//修改冻结的值
	onChangeYuPay() {
		let num = this.ui.EditBox.getComponent(cc.EditBox).string
		let price = this.ui.order_sell_number.getComponent(cc.EditBox).string
		if (!num) {
			num = "1"
		}

		if (this.type == 1) {
			UIHelp.SetLabel(this.ui.lab_payment, `预付乐豆个数:${Number(num) * Number(price)}`)
		}
	}
	//发布
	onPubilish() {
		// UIHelp.ShowTips("敬请期待")
		if (!this.vo) {
			UIHelp.ShowTips("请选择金蟾")
			return
		}
		let num = this.ui.EditBox.getComponent(cc.EditBox).string
		let price = this.ui.order_sell_number.getComponent(cc.EditBox).string
		//发布求购
		if (this.type == 1) {
			GameDataCenter.consignment.getSendQiuGou(this.vo.id, num, price)
		}
		else {
			GameDataCenter.consignment.getSendChuShou(this.vo.goodsid, num, price)
		}

	}
	onClose() {
		UIHelp.CloseUI(UIPublish_order);
	}
}