import GameDataCenter from "../../../data/GameDataCenter";
import auto_ticket_item from "../../../data/autoui/ticket/auto_ticket_item";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UITicket_item")
export default class UITicket_item extends VirtualItem {
	ui: auto_ticket_item = null;

	protected static prefabUrl = "ticket/ticket_item";
	protected static className = "UITicket_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_ticket_item);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_canyu, this.onInChoujian);
		this.onRegisterEvent(this.ui.btn_quchu, this.onInChoujian);

		this.initEvent(GameEvent.GETREALPRIZE, this.onTicketResult);
	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo, type) {
		this.vo = vo

		console.log(this.vo);

		UIHelp.SetLabel(this.ui.ticket_prize_name, vo.name)
		UIHelp.SetLabel(this.ui.ticket_prize_cost_num, "¥" + vo.price)
		UIHelp.SetLabel(this.ui.ticket_prize_pop, Utils.convertShow(vo.joinnum) + "人")

		this.setCountDown(vo.rolltime);

		if (Number(vo.joincoupon) == 0) {
			UIHelp.SetLabel(this.ui.ticket_prize_canyu_lab, '未参与')
			UIHelp.SetLabel(this.ui.lab_canyu, '参与抽奖')
			this.ui.btn_canyu.active = true;
			this.ui.btn_quchu.active = false;
		}
		else {
			UIHelp.SetLabel(this.ui.ticket_prize_canyu_lab, Utils.convertShow(vo.joincoupon))
			UIHelp.SetLabel(this.ui.lab_canyu, '取出奖券')
			this.ui.btn_canyu.active = false;
			this.ui.btn_quchu.active = true;
		}

		UIHelp.SetLabel(this.ui.ticket_prize_doec, `预计1万奖券每天中${vo.canget}块碎片`)

		UIHelp.SetSpriteFrame(this.ui.ticket_prize_img, vo.url)
	}

	_countDownTween: cc.Tween = null;
	setCountDown(rolltime: string) {
		this.ui.waitingNode.active = true;
		this.ui.loadingNode.active = false;
		this.ui.resultNode.active = false;

		if (this._countDownTween) {
			this._countDownTween.stop();
		}
		this._countDownTween = cc.tween(this.ui.ticket_prize_time)
			.delay(0.1)
			.call(() => {
				const openTime = new Date(Number(rolltime) * 1000);
				const timeNow = new Date();
				const dTime = openTime.getTime() - timeNow.getTime();
				if (dTime <= 0) {
					this.startLoading();
					this._countDownTween.stop();
					return;
				}
				UIHelp.SetLabel(this.ui.ticket_prize_time, Utils.getFormateDate(new Date(dTime), "mm:ss"));
			})
			.union()
			.repeatForever()
			.start();
	}

	_loadingTween: cc.Tween = null;
	startLoading() {
		this.ui.waitingNode.active = false;
		this.ui.loadingNode.active = true;
		this.ui.resultNode.active = false;

		GameDataCenter.player.onGetRealPrize(this.vo.code);

		if (this._loadingTween) {
			this._loadingTween.stop();
		}
		this._loadingTween = cc.tween(this.ui.loadingNode)
			.delay(0.2)
			.call(() => {
				UIHelp.SetLabel(this.ui.loadingLabel, "加载中.");
			})
			.delay(0.2)
			.call(() => {
				UIHelp.SetLabel(this.ui.loadingLabel, "加载中..");
			})
			.delay(0.2)
			.call(() => {
				UIHelp.SetLabel(this.ui.loadingLabel, "加载中...");
			})
			.union()
			.repeatForever()
			.start();
	}

	_resultTween: cc.Tween = null;
	onTicketResult(data) {
		console.log(data);
		if (data.busy) {
			cc.tween(this.node)
				.delay(1)
				.call(() => {
					GameDataCenter.player.onGetRealPrize(this.vo.code);
				})
				.start();
			return;
		}

		if (data.code != this.vo.code) {
			return;
		}

		console.log(`onTicketResult`, data);

		this.ui.waitingNode.active = false;
		this.ui.loadingNode.active = false;
		this.ui.resultNode.active = true;

		if (data.fen == 0) {
			UIHelp.SetLabel(this.ui.resultLabel, "未获得奖励...");
		} else {
			UIHelp.SetLabel(this.ui.resultLabel, `恭喜您获得${data.fen}块碎片`);
		}

		if (this._loadingTween) {
			this._loadingTween.stop();
		}
		this._loadingTween = cc.tween(this.ui.resultNode)
			.delay(8)
			.call(() => {
				GameDataCenter.player.onRealPrizeList();
			})
			.start();
	}

	//参与
	onInChoujian() {
		if (Number(this.vo.joincoupon) == 0) {
			if (GameDataCenter.player.coupon <= 0) {
				UIHelp.ShowTips("奖券不足");
				return
			}
			GameDataCenter.player.onInRealPrize(this.vo.code);
			this.ui.btn_canyu.active = false;
			this.ui.btn_quchu.active = true;
		} else {
			GameDataCenter.player.onOutRealPrize(this.vo.code);
			this.ui.btn_canyu.active = true;
			this.ui.btn_quchu.active = false;
		}
	}

	onClose() {
		UIHelp.CloseUI(UITicket_item);
	}
}