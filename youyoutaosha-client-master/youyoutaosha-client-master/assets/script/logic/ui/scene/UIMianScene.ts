import auto_mianScene from "../../../data/autoui/scene/auto_mianScene";
import { GameEvent } from "../../../data/const/EventConst";
import GameDataCenter from "../../../data/GameDataCenter";
import AccountModel from "../../../data/model/Account/AccountModel";
import GameController from "../../../GameController";
import { Utils } from "../../../utils/Utils";
import WebView from "../../../ccWebView";
import UIConsignment from "../consignment/UIConsignment";
import UIDown_node from "../frist/UIDown_node";
import UIEarly_back from "../frist/UIEarly_back";
import UIHandbook_node from "../frist/UIHandbook_node";
import UIPlay_node from "../frist/UIPlay_node";
import UISelect_car from "../frist/UISelect_car";
import UIShop_node from "../frist/UIShop_node";
import UISign_node from "../frist/UISign_node";
import UIVip_node from "../frist/UIVip_node";
import UIYearbook_node from "../frist/UIYearbook_node";
import UIYetStop_car from "../frist/UIYetStop_car";
import UIWithdrawal_node from "../mine/UIWithdrawal_node";
import UITicket_draw from "../ticket/UITicket_draw";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIZhuanpan from "../zhuanpan/UIZhuanpan";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/scene/UIMianScene")
export default class UIMianScene extends UIBase {


	ui: auto_mianScene = null;

	protected static prefabUrl = "";
	protected static className = "UIMianScene";
	updataTime: number = 0;

	@property(cc.Node)
	pop: cc.Node = null;
	@property(cc.Prefab)
	cj: cc.Prefab = null;
	@property(cc.Prefab)
	zc: cc.Prefab = null;
	@property(cc.Prefab)
	fr: cc.Prefab = null;
	@property(cc.Prefab)
	wd: cc.Prefab = null;
	@property({ type: WebView })
	webView: WebView = null;

	onUILoad() {
		this.ui = this.node.addComponent(auto_mianScene);

	}

	onShow() {

		this.initEvent(GameEvent.BUY_SUCCESS, this.onloginSucc);
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.initEvent(GameEvent.GET_MYSTOPCAR_LIST, this.onShowStopList);
		this.initEvent(GameEvent.CHANGEDOWBTAB, this.onChangeDownTab);
		this.initEvent(GameEvent.TACKBACK_CAR, this.onGetCardList);


		this.onRegisterEvent(this.ui.icon_garage, this.onShowfarage);
		this.onRegisterEvent(this.ui.icon_shop, this.onShowShop);
		this.onRegisterEvent(this.ui.icon_jnc, this.onShowyearbook);
		this.onRegisterEvent(this.ui.icon_tj, this.onShowHandbook);
		this.onRegisterEvent(this.ui.icon_ck_mine_ticket, this.onShowTicketDraw);
		this.onRegisterEvent(this.ui.button_red, this.onShowTixian);
		this.onRegisterEvent(this.ui.icon_vip, this.onShowVip);
		this.onRegisterEvent(this.ui.icon_qd, this.onShowSign);
		this.onRegisterEvent(this.ui.icon_js, this.onShowConsignment);
		this.onRegisterEvent(this.ui.icon_zp, this.onShowzp);
		this.onRegisterEvent(this.ui.icon_play, this.onPlay);
		this.onRegisterEvent(this.ui.car1, this.onShowfarage);
		this.onRegisterEvent(this.ui.car2, this.onShowfarage);
		this.onRegisterEvent(this.ui.car3, this.onShowfarage);
		this.onRegisterEvent(this.ui.car4, this.onShowfarage);
		this.onRegisterEvent(this.ui.car5, this.onShowfarage);
		this.onRegisterEvent(this.ui.car6, this.onShowfarage);
		this.onRegisterEvent(this.ui.icon_tds, this.onClickDts.bind(this));
		this.onRegisterEvent(this.ui.jingpai, this.onClickJingPai.bind(this));
		this.onRegisterEvent(this.ui.shangcheng, this.onClickShangCheng.bind(this));
	}

	onClickJingPai(){
		let code: string = AccountModel.staticJwt;
		let url = "http://jingpaih5.leshufang.cn/#/?jwt="+code;
		this.webView.setItem(url);
		return;
	}

	onClickShangCheng(){
		let code: string = AccountModel.staticJwt;
		let url = "http://shoph5.leshufang.cn/#/?jwt="+code;
		this.webView.setItem(url);
		return;
	}

	onClickDts() {
		// let code: string = AccountModel.staticJwt;
		// let url = "https://ccc.leshufang.cn/tds/index.html?code=" + code;
		// this.webView.setItem(url);
		// return;
		let code: string = AccountModel.staticJwt;
		let node: cc.Node = new cc.Node();
		let widget: cc.Widget = node.addComponent(cc.Widget);
		let webView: cc.WebView = node.addComponent(cc.WebView);
		widget.isAlignLeft = true;
		widget.isAlignRight = true;
		widget.isAlignTop = true;
		widget.isAlignBottom = true;
		widget.bottom = 0;
		widget.top = 0;
		widget.left = 0;
		widget.right = 0;
		webView.url = "http://ccc.leshufang.cn/tds/index.html?code=" + code;
		node.parent = this.node;
		node.addComponent(cc.BlockInputEvents);
		widget.updateAlignment();
		let scheme: string = "lelegeyou";

		let jsCallback = (target, url) => {
			// 这里的返回值是内部页面的 URL 数值，需要自行解析自己需要的数据。
			let str: string = url.replace(scheme + '://', ''); // str === 'a=1&b=2'

			/**
			 * 直接关闭
			 */
			node.destroy();
		}
		
		webView.setJavascriptInterfaceScheme(scheme);
		webView.setOnJSCallback(jsCallback);
	}

	onHide() {

	}

	onStart() {

		this.initUI()

		//每天主动弹出一次签到
		let nowdat = cc.sys.localStorage.getItem("nowDay")
		let is = Utils.getDays(nowdat)
		if (!nowdat || nowdat === "" || !is) {
			let data = new Date()
			let d = data.getDate()
			cc.sys.localStorage.setItem("nowDay", d)
			UIHelp.ShowUI(UISign_node)
		}
		else {
			console.log("同一天");
		}

		//获取停车列表
		this.onGetCardList()

		//获取提现 充值 方式
		GameDataCenter.player.getPayType()

		//乐豆相关设置
		GameDataCenter.player.onSetDoudouInfo()
	}
	initUI() {
		UIHelp.SetLabel(this.ui.lab_gold_num, Utils.convertShow(GameDataCenter.player.money,2))
		UIHelp.SetLabel(this.ui.lab_ticket_num, Utils.convertShow(GameDataCenter.player.coupon,2))
		UIHelp.SetLabel(this.ui.lab_left_time_number, Utils.convertShow(GameDataCenter.player.hour) + "张")
		UIHelp.SetLabel(this.ui.top_right_money, Utils.convertShow(GameDataCenter.player.cash) + "个")
	}

	//我的停车列表
	onShowStopList(type, list) {

		console.log('获取我的停车列表?', type, list);

		let minute: number = 0;
		for (let key in list) {
			minute += list[key].minute;
		}
		let hour: number = minute * 60;
		UIHelp.SetLabel(this.ui.lab_left_time_number2, hour + "个");

		let itemPrefab = UIYetStop_car;
		let carlist = this.ui.bg2.children
		let index = 0;
		for (let i = 0; i < carlist.length; i++) {
			//一次性拉去所有车辆
			if (type == 0) {
				carlist[i].removeAllChildren()
				if (list[i]) {
					cc.loader.loadRes("prefab/frist/yetStop_car", (err, prefab) => {
						if (err) {
							console.log(err);
							return;
						}
						let item = cc.instantiate(prefab);
						carlist[i].addChild(item)
						item.getComponent(itemPrefab.getName()).onInitItem(list[i]);

					});
				}
			}

			else { //更新数据
				//已有车辆
				if (carlist[i].children[0]) {
					carlist[i].children[0].getComponent(itemPrefab.getName()).onInitItem(list[index]);
				}
				else {
					carlist[i].removeAllChildren()
				}
				index++;
			}

		}
	}
	//获取停车场车辆
	onGetCardList() {
		GameDataCenter.car.getCarList(0);
	}
	//1分钟更新数据
	onUpdatadata() {
		//获取个人信息
		// GameDataCenter.player.getUser()
		//获取车辆信息
		GameDataCenter.car.getCarList(2);
	}

	onPlay() {
		UIHelp.ShowUI(UIPlay_node)
	}
	onShowzp() {
		UIHelp.ShowUI(UIZhuanpan)
	}
	//q签到
	onShowSign() {
		UIHelp.ShowUI(UISign_node)

	}
	//vip
	onShowVip() {
		UIHelp.ShowUI(UIVip_node)
	}
	//提现
	onShowTixian() {
		UIHelp.ShowUI(UIWithdrawal_node)
	}
	onShowTicketDraw() {
		UIHelp.ShowUI(UITicket_draw)
	}

	//车库
	onShowfarage() {
		UIHelp.ShowUI(UISelect_car)
	}
	//商店
	onShowShop() {
		UIHelp.ShowUI(UIShop_node)
	}
	//纪念册
	onShowyearbook() {
		UIHelp.ShowUI(UIYearbook_node)
	}
	//图鉴
	onShowHandbook() {
		UIHelp.ShowUI(UIHandbook_node)
	}
	onShowConsignment() {
		UIHelp.ShowUI(UIConsignment)
	}

	onClose() {
		UIHelp.CloseUI(UIMianScene);
	}
	onloginSucc() {
		// GameDataCenter.player.getSigin()
	}

	lastClickTime: number = 0;
	hallStatus: boolean = true;
	//切换tab
	onChangeDownTab(tab) {


		if (tab != 3) {
			this.hallStatus = false;
		}
		let content = this.ui.ScrollView.getComponent(cc.ScrollView).content
		content.removeAllChildren()
		let item = null;
		if (tab == 1) {
			item = cc.instantiate(this.cj);
		}
		if (tab == 2) {
			item = cc.instantiate(this.zc);
		}
		if (tab == 3) {
			if (this.hallStatus) {
				UIHelp.ShowUI(UIEarly_back);
			} else {
				GameDataCenter.car.getCarList(0);
				this.pop.active = false;
			}
			this.hallStatus = true;
			return
		}
		if (tab == 4) {
			item = cc.instantiate(this.fr);
		}
		if (tab == 5) {
			item = cc.instantiate(this.wd);
		}
		content.addChild(item)
		this.pop.active = true
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
	}

	update(dt) {
		this.updataTime += dt;
		if (this.updataTime > 60) {
			this.updataTime = 0
			this.onUpdatadata()
		}
	}
}