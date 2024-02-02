import GameDataCenter from "../../../data/GameDataCenter";
import auto_big_rich_node from "../../../data/autoui/ticket/auto_big_rich_node";
import { GameEvent } from "../../../data/const/EventConst";
import { DeviceModule } from "../../../data/model/DeviceModule";
import { Utils } from "../../../utils/Utils";
import VirtualList from "../../../virtualList/VirtualList";
import { ListView } from "../ListView";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIBig_rich_item from "./UIBig_rich_item";
import UIBig_rich_updata from "./UIBig_rich_updata";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UIBig_rich_node")
export default class UIBig_rich_node extends UIBase {
	ui: auto_big_rich_node = null;

	@property({ type: cc.Prefab })
	item: cc.Prefab = null;

	protected static prefabUrl = "ticket/big_rich_node";
	protected static className = "UIBig_rich_node";

	onUILoad() {
		this.ui = this.node.addComponent(auto_big_rich_node);
	}

	onShow() {

		this.initEvent(GameEvent.BIGRICHLIST, this.initScrollView);
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.onGetUserSuccess);

		this.initEvent(GameEvent.BIGPLAYERINFO, this.onShowBigPlayerInfo);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_level, this.onUpdataRice);
		this.onRegisterEvent(this.ui.btn_level_cancel, this.onUpdataRiceCancel);

		this.onRegisterEvent(this.ui.btn_copywx, this.copyWx);
		this.onRegisterEvent(this.ui.btn_copyqq, this.copyQQ);
		this.onRegisterEvent(this.ui.btn_close_pop, this.closeinfo);


	}

	onGetUserSuccess() {
		
	}

	onHide() {

	}





	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);
		GameDataCenter.player.getUserInfo()
		GameDataCenter.player.onSetBigPlayerList()
		this.initUI()
	}
	initUI() {
		UIHelp.SetLabel(this.ui.big_rich_name, Utils.cutString(GameDataCenter.player.name, 10));
		UIHelp.SetSpriteFrame(this.ui.big_rich_img, GameDataCenter.player.avatar)

		if (GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
			this.ui.icon_vip.active = true
		} else {
			this.ui.icon_vip.active = false
		}

		if (GameDataCenter.player.dawanjia == 0) {
			this.ui.btn_level_cancel.active = false;
		} else {
			this.ui.btn_level_cancel.active = true;
		}
	}
	//显示大玩家信息
	onShowBigPlayerInfo(vo) {
		this.ui.big_rich_pop.active = true
		UIHelp.SetLabel(this.ui.big_rich_pop_name, Utils.cutString(vo.name, 10));
		UIHelp.SetLabel(this.ui.big_rich_pop_doudou, `${Utils.convertShow(vo.score)}乐豆`)
		UIHelp.SetSpriteFrame(this.ui.big_rich_pop_img, vo.avatar)
		UIHelp.SetLabel(this.ui.lab_wx, vo.weixinid)
		UIHelp.SetLabel(this.ui.lab_qq, vo.qqid)
	}

	copyWx() {
		DeviceModule.getInstance().copyToClipboard(this.ui.lab_wx.getComponent(cc.Label).string)
		UIHelp.ShowTips("复制成功")
	}
	copyQQ() {
		DeviceModule.getInstance().copyToClipboard(this.ui.lab_qq.getComponent(cc.Label).string)
		UIHelp.ShowTips("复制成功")
	}
	closeinfo() {
		this.ui.big_rich_pop.active = false
	}
	//普通车辆
	listView: ListView = null;
	async initScrollView(list) {
		console.error('initScrollView');
		console.log(list);
		if (GameDataCenter.player.dawanjia == 0) {
			this.ui.btn_level_cancel.active = false;
		} else {
			this.ui.btn_level_cancel.active = true;
		}

		list.sort((a, b) => {
			return b.score - a.score;
		});

		let node: cc.Node = cc.instantiate(this.item);
		if (this.listView) {
			await this.listView.clear();
		}
		this.listView = ListView.create(this.ui.rish_ScrollView.getComponent(cc.ScrollView), node, (idx: number, node: cc.Node, forClean?: boolean) => {
			if (idx >= list.length) {
				return false;
			}
			let data = list[idx];
			if (!data) return;
			node.getComponent(UIBig_rich_item).onInitItem(data);
			return true;
		});
		this.listView.count = list.length;
	}
	onUpdataRiceCancel() {
		UIHelp.ShowDialog({
			title: "是否取消大玩家?",
			content: "取消需要后台审核，7天内无交易且未被举报，平台将自动退还销毁乐豆。",
			certainCb: () => {
				GameDataCenter.player.onCancleBigPlayer();
			},
			cancelCb: () => {
			}
		});
	}

	onUpdataRice() {
		UIHelp.ShowUI(UIBig_rich_updata)
	}
	onClose() {
		UIHelp.CloseUI(UIBig_rich_node);
	}
}