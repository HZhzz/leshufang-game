import GameDataCenter from "../../../data/GameDataCenter";
import auto_cell_node from "../../../data/autoui/ticket/auto_cell_node";
import { GameEvent } from "../../../data/const/EventConst";
import { VideoEvent } from "../../../data/const/VideoEvent";
import { ConfigModule } from "../../../data/model/ConfigModule";
import { Utils } from "../../../utils/Utils";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UICell_node")
export default class UICell_node extends UIBase {
	ui: auto_cell_node = null;

	protected static prefabUrl = "ticket/cell_node";
	protected static className = "UICell_node";

	buyNumIndex: number = 0
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_cell_node);
	}

	onShow() {
		this.initEvent(GameEvent.POWERDOUDOUINFO, this.onSetPowerInfo);
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.initEvent(GameEvent.POWERDOUDOUSUCCSE, this.oncloseuydoudou);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_cell_doudou, this.onBuydoudou);
		this.onRegisterEvent(this.ui.btn_buy_power_close, this.oncloseuydoudou);
		this.onRegisterEvent(this.ui.buy_power_info_jia, this.onAddpower);
		this.onRegisterEvent(this.ui.buy_power_info_jian, this.onjianpower);
		this.onRegisterEvent(this.ui.btn_buy_power_info_all, this.onBuyAll);
		this.onRegisterEvent(this.ui.btn_buy, this.onBuy);
		this.onRegisterEvent(this.ui.btn_cell_adv, this.onlookVedio);

	}

	onHide() {

	}

	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		this.initUI()
		//获取电量和都的信息
		GameDataCenter.player.oneLectricity()
	}
	initUI() {
		UIHelp.SetLabel(this.ui.cell_op_power_lab, Utils.cutString(GameDataCenter.player.power, 12, ".."))
	}
	onClose() {
		UIHelp.CloseUI(UICell_node);
	}
	//设置乐豆和电量之间的信息
	onSetPowerInfo(vo) {
		this.vo = vo

		console.log("vo", vo);

		UIHelp.SetLabel(this.ui.cell_info_power_lab, Utils.cutString(vo.monthelectricity, 8, ".."));
		UIHelp.SetLabel(this.ui.cell_info_price_lab, Utils.cutString(`${1 / this.vo.buyelectricity}`, 8, ".."));

		UIHelp.SetLabel(this.ui.cell_name, `${vo.monthelectricity}度`);
		UIHelp.SetLabel(this.ui.cell_cost, `每度电量${1 / this.vo.buyelectricity}个乐豆`);
	}
	//乐豆购买
	onBuydoudou() {
		this.ui.buy_power_node.active = true
		UIHelp.SetLabel(this.ui.buy_power_info_have_dou, GameDataCenter.player.doudou);
		UIHelp.SetLabel(this.ui.lab_today_buysell, `今日电量价格:1乐豆=${this.vo.buyelectricity}度电量`)

	}
	oncloseuydoudou() {
		this.buyNumIndex = 0
		this.onSetBuyNum(this.buyNumIndex)
		this.ui.buy_power_node.active = false
	}


	//add
	onAddpower() {
		this.onSetBuyNum(++this.buyNumIndex)
	}
	//jian
	onjianpower() {
		this.buyNumIndex--
		this.buyNumIndex < 0 ? this.buyNumIndex = 0 : this.buyNumIndex;
		this.onSetBuyNum(this.buyNumIndex)
	}
	//all
	onBuyAll() {

		this.buyNumIndex = Math.min(100, GameDataCenter.player.doudou * this.vo.buyelectricity);
		this.onSetBuyNum(this.buyNumIndex)
	}
	//设置购买数量
	onSetBuyNum(num) {
		if (num <= 0) {
			num = 0
		}
		UIHelp.SetLabel(this.ui.lab_buy_power_info_num, num);

		const doudou = (num / Number(this.vo.buyelectricity)).toFixed(6);
		UIHelp.SetLabel(this.ui.buy_power_info_need_doudou, doudou);

	}
	//购买
	onBuy() {
		let std = this.ui.lab_buy_power_info_num.getComponent(cc.Label).string
		if (Number(std) <= 0) {
			UIHelp.ShowTips("请输入正确的信息")
			return
		}
		GameDataCenter.player.ondoudouPwoerBuy(std)
	}
	//看视频
	onlookVedio() {
		if (GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
			GameDataCenter.zhuanpan.vipfreead("恢复电量");
			return;
		}
		GameDataCenter.baseSdk.createVideo(VideoEvent.POWERADV, ConfigModule.VIDEO_NAME.POWERADV, ConfigModule.VIDEO_ID.POWERADV);
	}
}