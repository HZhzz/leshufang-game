import GameDataCenter from "../../../data/GameDataCenter";
import auto_ticket_draw from "../../../data/autoui/ticket/auto_ticket_draw";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIShare_node from "../friend/UIShare_node";
import UIBig_rich_node from "./UIBig_rich_node";
import UITicket_helper from "./UITicket_helper";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UITicket_draw")
export default class UITicket_draw extends UIBase {
	ui: auto_ticket_draw = null;

	protected static prefabUrl = "ticket/ticket_draw";
	protected static className = "UITicket_draw";
	updataTime: number = 0;
	onUILoad() {
		this.ui = this.node.addComponent(auto_ticket_draw);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.initEvent(GameEvent.FRIENDZHONGJIANGLISE, this.initScrollView);
		this.initEvent(GameEvent.TICKETPAGEINFO, this.pageInfo);
		this.initEvent(GameEvent.TICKETRESULT, this.onTicketResult);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_canyu, this.onCanyuDraw);
		this.onRegisterEvent(this.ui.btn_inDraw, this.onCanyuDraw);
		this.onRegisterEvent(this.ui.btn_outDraw, this.onOutTicket);

		this.onRegisterEvent(this.ui.btn_share, this.onShowShare);
		this.onRegisterEvent(this.ui.btn_role, this.onShowRules);
	}

	onShowRules() {
		UIHelp.ShowUI(UITicket_helper);
	}

	onHide() {

	}
	initUI() {

		UIHelp.SetLabel(this.ui.ticket_node_draw_doudou_lab, GameDataCenter.player.doudouInfo.lastnum + "个")




	}
	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		this.initUI()
		this.updataTime = 0;
		//页面信息
		GameDataCenter.player.onGetTiketPageInfo()
		//好有中奖列表
		GameDataCenter.player.onFriendZjlist()
	}
	initScrollView(list) {
		const virtualList = this.ui.recently_ScrollView.getComponent(VirtualList);
		if (virtualList && this.node.active) {
			virtualList.clearAll();
			for (let index of list) {
				virtualList.push(index);
			}
		}
	}
	pageInfo(data) {
		console.log("pageInfo", data);
		UIHelp.SetLabel(this.ui.ticket_node_draw_pt_lab, Utils.convertShow(GameDataCenter.player.coupon));
		UIHelp.SetLabel(this.ui.draw_pt_mine_deoc, `大奖实名各得${data.luckfen}个，所有人瓜分${data.totalfen}个`)
		UIHelp.SetLabel(this.ui.draw_pt_mine_cy_lab, data.joincoupon)
		UIHelp.SetLabel(this.ui.draw_pt_mine_jc_lab, data.get)
		UIHelp.SetLabel(this.ui.draw_pt_mine_cy_doce, data.canget)
		UIHelp.SetLabel(this.ui.lab_seach_content, `${Utils.convertShow(data.count)}人参与抽奖，${Utils.convertShow(data.totalcouponnum)}张奖券`)

		// data.rolltime
		if (data.joincoupon > 0) {
			this.ui.btn_inDraw.active = false;
			this.ui.btn_outDraw.active = true;
		} else {
			this.ui.btn_inDraw.active = true;
			this.ui.btn_outDraw.active = false;
		}
		this.startWaiting(data.rolltime);
	}

	onTicketResult(data) {
		if (data.busy) {
			cc.tween(this.node)
				.delay(1 + Math.random() * 2)
				.call(() => {
					GameDataCenter.player.onGetTicketResult();
				})
				.start();
			return;
		}

		console.log("onTicketResult", data);

		this.ui.waiting_node.active = false;
		this.ui.loading_node.active = false;
		this.ui.result_node.active = true;

		if (data.fen > 0) {
			UIHelp.SetLabel(this.ui.resultLabel, "恭喜你获得" + data.fen + "个乐豆");
		} else {
			UIHelp.SetLabel(this.ui.resultLabel, "很遗憾，未中奖");
		}

		cc.tween(this.node)
			.delay(1.5)
			.call(() => {
				this.onStart();
			})
			.start();
	}

	_countDownTween: cc.Tween = null;
	startWaiting(rolltime: string) {
		this.ui.waiting_node.active = true;
		this.ui.loading_node.active = false;
		this.ui.result_node.active = false;
		if (this._countDownTween) {
			this._countDownTween.stop();
		}
		this._countDownTween = cc.tween(this.ui.draw_pt_mine_time)
			.delay(1)
			.call(() => {
				const openTime = new Date(Number(rolltime) * 1000);
				const timeNow = new Date();
				const dTime = openTime.getTime() - timeNow.getTime();
				if (dTime <= 0) {
					this.startLoading();
					return;
				}
				UIHelp.SetLabel(this.ui.draw_pt_mine_time, Utils.getFormateDate(new Date(dTime), "mm:ss"));
			})
			.union()
			.repeatForever()
			.start();
	}

	_waitingTween: cc.Tween = null;
	startLoading() {
		this.ui.waiting_node.active = false;
		this.ui.loading_node.active = true;
		this.ui.result_node.active = false;

		GameDataCenter.player.onGetTicketResult();

		if (this._waitingTween) {
			this._waitingTween.stop();
		}

		this._waitingTween = cc.tween(this.ui.loadingLabel)
			.repeatForever(cc.tween()
				.delay(0.2)
				.call(() => {
					UIHelp.SetLabel(this.ui.loadingLabel, '加载中.');
				})
				.delay(0.2)
				.call(() => {
					UIHelp.SetLabel(this.ui.loadingLabel, '加载中..');
				})
				.delay(0.2)
				.call(() => {
					UIHelp.SetLabel(this.ui.loadingLabel, '加载中...');
				}))
			.start();
	}

	//分享
	onShowShare() {
		UIHelp.ShowUI(UIShare_node)
	}
	//参与抽奖
	onCanyuDraw() {
		GameDataCenter.player.onCanyuDraw()
	}
	//取出奖券
	onOutTicket() {
		GameDataCenter.player.onOutTicket()
	}
	onClose() {
		UIHelp.CloseUI(UITicket_draw);
	}

	onUpdate(dt: any): void {
		this.updataTime += dt
		if (this.updataTime > 60) {
			this.updataTime = 0
			//刷新好有中奖
			GameDataCenter.player.onFriendZjlist()
		}
	}
}