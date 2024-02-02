import GameDataCenter from "../../../data/GameDataCenter";
import auto_ticket_node from "../../../data/autoui/ticket/auto_ticket_node";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIConsignment from "../consignment/UIConsignment";
import UIVipRules_node from "../frist/UIVipRules_node";
import UIVip_node from "../frist/UIVip_node";
import UIDoudouToMoney from "../mine/UIDoudouToMoney";
import UIWithdrawal_node from "../mine/UIWithdrawal_node";
import UIBig_rich_node from "./UIBig_rich_node";
import UICell_node from "./UICell_node";
import UISui_pian_node from "./UISui_pian_node";
import UISui_pian_record from "./UISui_pian_record";
import UITicket_draw from "./UITicket_draw";
import UITicket_helper from "./UITicket_helper";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UITicket_node")
export default class UITicket_node extends UIBase {

	@property(cc.Prefab)
	tick_item: cc.Prefab = null;

	ui: auto_ticket_node = null;

	protected static prefabUrl = "ticket/ticket_node";
	protected static className = "UITicket_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_ticket_node);

	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.initEvent(GameEvent.REALPRIZELIST, this.initScrollView);
		this.initEvent(GameEvent.TICKETPAGEINFO, this.pageInfo);
		this.initEvent(GameEvent.TICKETRESULT, this.onTicketResult);
		this.initEvent(GameEvent.EXCHANGEFRAGMENT, this.onStart);

		this.onRegisterEvent(this.ui.ticket_toggle1, this.onToggle1);
		this.onRegisterEvent(this.ui.ticket_toggle2, this.onToggle2);
		this.onRegisterEvent(this.ui.btn_power, this.onShowTickPower);
		this.onRegisterEvent(this.ui.btn_check_js, this.onJsCenter);
		this.onRegisterEvent(this.ui.btn_check_duihuan, this.onChangeDoudou);
		this.onRegisterEvent(this.ui.btn_check_dd, this.onBIgFuWen);
		this.onRegisterEvent(this.ui.btn_canyu, this.onCanyuDraw);
		this.onRegisterEvent(this.ui.btn_quchu, this.onQuchuDraw);
		this.onRegisterEvent(this.ui.vip_node_ticket, this.onVipTicket);
		this.onRegisterEvent(this.ui.btn_turn, this.onTurn);
		this.onRegisterEvent(this.ui.btn_vip, this.onVip);
		this.onRegisterEvent(this.ui.prizet_node, this.onPrize);
		this.onRegisterEvent(this.ui.btn_lingqu, this.onLingqu);

		// this.ui.ScrollView1.on('scroll-to-bottom', this.onScrollToBottom, this);
		// this.ui.ScrollView1.on('scroll-to-top', this.onScrollToTop, this);
	}

	getParentScrollView() {
		let ScrollView = this.node.parent;
		while (ScrollView.getComponent(cc.ScrollView) == null) {
			ScrollView = ScrollView.parent;
		}
		return ScrollView.getComponent(cc.ScrollView);
	}

	onScrollToTop() {
		this.getParentScrollView().scrollToTop(1);
	}

	onScrollToBottom() {
		this.getParentScrollView().scrollToBottom(1);
	}

	onLingqu() {
		UIHelp.ShowUI(UISui_pian_record);
	}

	onPrize() {
		UIHelp.ShowUI(UISui_pian_node);
	}

	onVip() {
		UIHelp.ShowUI(UIVipRules_node);
	}

	onTurn() {
		UIHelp.ShowUI(UITicket_helper);
	}

	onVipTicket() {
		UIHelp.CloseUI(UITicket_node);
		UIHelp.ShowUI(UITicket_draw);
	}

	onHide() {

	}
	initUI() {

		UIHelp.SetLabel(this.ui.ticket_node_doudou, `${Utils.convertShow(GameDataCenter.player.doudou)}`)
		UIHelp.SetLabel(this.ui.ticket_node_num, `${Utils.convertShow(GameDataCenter.player.coupon)}`);

		if (GameDataCenter.player.couponroll > 0) {
			UIHelp.SetLabel(this.ui.btn_lab_ticket, `取出奖券`)
			this.ui.btn_quchu.active = true;
			this.ui.btn_canyu.active = false;
		}
		else {
			UIHelp.SetLabel(this.ui.btn_lab_ticket, `参与抽奖`)
			this.ui.btn_quchu.active = false;
			this.ui.btn_canyu.active = true;
		}
	}
	onStart() {
		this.initUI()
		//页面信息
		GameDataCenter.player.onGetTiketPageInfo()


	}

	onShowTickPower() {
		UIHelp.ShowUI(UICell_node)
	}

	onToggle1() {
		this.ui.vip_node_ticket.active = true;
		this.ui.ScrollView1.active = false;
		this.ui.ticket_toggle1_label.active = false;
		this.ui.ticket_toggle2_label.active = true;
		// this.ui.ScrollView.getComponent(cc.ScrollView).content.removeAllChildren();
	}
	onToggle2() {
		this.ui.vip_node_ticket.active = false;
		this.ui.ScrollView1.active = true
		GameDataCenter.player.onRealPrizeList()

		this.ui.ticket_toggle1_label.active = true;
		this.ui.ticket_toggle2_label.active = false;
	}
	initScrollView(list) {

		const virtualList = this.ui.ScrollView1.getComponent(VirtualList);
		virtualList.clearAll();

		for (let index of list) {
			virtualList.push(index);
		}
	}

	pageInfo(data) {
		this.startWaiting(data.rolltime);
		UIHelp.SetLabel(this.ui.vip_node_renshu_ticket, `${Utils.convertShow(data.count)}`)

		UIHelp.SetLabel(this.ui.prizet_node_num, `${Utils.convertShow(data.exchangefragmentcount)}`);
	}

	_countDownTween: cc.Tween = null;
	startWaiting(rolltime: string) {
		this.ui.waitingNode.active = true;
		this.ui.loadingNode.active = false;
		this.ui.resultNode.active = false;

		if (this._countDownTween) {
			this._countDownTween.stop();
		}
		this._countDownTween = cc.tween(this.ui.vip_node_time)
			.delay(1)
			.call(() => {
				const openTime = new Date(Number(rolltime) * 1000);
				const timeNow = new Date();
				const dTime = openTime.getTime() - timeNow.getTime();
				if (dTime <= 0) {
					this.startLoading();
					return;
				}
				UIHelp.SetLabel(this.ui.vip_node_time, Utils.getFormateDate(new Date(dTime), "mm:ss"));
			})
			.union()
			.repeatForever()
			.start();
	}

	_loadingTween: cc.Tween = null;
	startLoading() {
		GameDataCenter.player.onGetTicketResult();
		this.ui.waitingNode.active = false;
		this.ui.loadingNode.active = true;
		this.ui.resultNode.active = false;

		if (this._countDownTween) {
			this._countDownTween.stop();
		}
		this._loadingTween = cc.tween(this.ui.label_loading)
			.delay(0.2)
			.call(() => {
				UIHelp.SetLabel(this.ui.label_loading, "加载中.");
			})
			.delay(0.2)
			.call(() => {
				UIHelp.SetLabel(this.ui.label_loading, "加载中..");
			})
			.delay(0.2)
			.call(() => {
				UIHelp.SetLabel(this.ui.label_loading, "加载中...");
			})
			.union()
			.repeatForever()
			.start();
	}

	_resultTween: cc.Tween = null;
	onTicketResult(data) {
		if (data.busy) {
			cc.tween(this.node)
				.delay(1)
				.call(() => {
					GameDataCenter.player.onGetTicketResult();
				})
				.start();
			return;
		}

		this.ui.waitingNode.active = false;
		this.ui.loadingNode.active = false;
		this.ui.resultNode.active = true;
		if (data.fen == 0) {
			UIHelp.SetLabel(this.ui.label_result, `未获得奖励...`);
		} else {
			UIHelp.SetLabel(this.ui.label_result, `恭喜获得乐豆${Utils.convertShow(data.fen)}个！`);
		}
		if (this._resultTween) {
			this._resultTween.stop();
		}
		console.log("抽奖结果", data);
		this._resultTween = cc.tween(this.ui.resultNode)
			.delay(1)
			.call(() => {
				console.log("onGetTiketPageInfo");
				GameDataCenter.player.onGetTiketPageInfo();
			})
			.start();
	}

	onQuchuDraw() {
		this.ui.btn_quchu.active = false;
		this.ui.btn_canyu.active = true;
		GameDataCenter.player.onOutTicket()
	}
	//参与抽奖
	onCanyuDraw() {
		if (GameDataCenter.player.coupon <= 0) {
			UIHelp.ShowTips("奖券不足");
			return
		}
		this.ui.btn_quchu.active = true;
		this.ui.btn_canyu.active = false;
		GameDataCenter.player.onCanyuDraw();
	}
	// //取出奖券
	// onOutTicket() {
	// 	GameDataCenter.player.onOutTicket()
	// }
	//寄售中心
	onJsCenter() {
		UIHelp.ShowUI(UIConsignment)
	}
	//兑换乐豆
	onChangeDoudou() {
		UIHelp.ShowUI(UIDoudouToMoney)
	}
	//大玩家
	onBIgFuWen() {
		UIHelp.ShowUI(UIBig_rich_node)
	}
	onClose() {
		UIHelp.CloseUI(UITicket_node);
	}
}