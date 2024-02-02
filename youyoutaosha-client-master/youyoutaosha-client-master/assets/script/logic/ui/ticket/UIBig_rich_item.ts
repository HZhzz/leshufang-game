import GameDataCenter from "../../../data/GameDataCenter";
import auto_big_rich_item from "../../../data/autoui/ticket/auto_big_rich_item";
import { GameEvent } from "../../../data/const/EventConst";
import EventMng from "../../../manager/EventMng";
import { Utils } from "../../../utils/Utils";
import VirtualItem from "../../../virtualList/VirtualItem";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/ticket/UIBig_rich_item")
export default class UIBig_rich_item extends VirtualItem {
	@property({ type: cc.Label })
	nameLbl: cc.Label = null;
	@property({ type: cc.Label })
	scoreLbl: cc.Label = null;
	@property({type:cc.Node})
	img_face:cc.Node = null;
	ui: auto_big_rich_item = null;

	protected static prefabUrl = "ticket/big_rich_item";
	protected static className = "UIBig_rich_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_big_rich_item);
		// if (!this.vo) return;
		// let vo = this.vo;
		// console.log(vo);
		// UIHelp.SetSpriteFrame(this.ui.img_face, vo.avatar)


	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_lx, this.onShowlinaxi);
	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		this.vo = vo
		this.nameLbl.string = Utils.cutString(vo.name, 10);
		this.scoreLbl.string = Utils.convertShow(vo.score, 2);
		UIHelp.SetSpriteFrame(this.img_face, vo.avatar)
		// UIHelp.SetLabel(this.ui.lab_name, Utils.cutString(vo.name, 10));
		// UIHelp.SetLabel(this.ui.lab_num, Utils.convertShow(vo.score, 2))

	}

	nameCache: string = null;
	setNameLbl(str: string) {
		if (this.nameCache == str) return;
		this.nameCache = str;
		this.ui.lab_name.getComponent(cc.Label).string = str;
	}

	numCache: string = null;
	setNumLbl(str: string) {
		if (this.numCache == str) return;
		this.numCache = str;
		this.ui.lab_num.getComponent(cc.Label).string = str;
	}

	//联系
	onShowlinaxi() {
		EventMng.emit(GameEvent.BIGPLAYERINFO, this.vo);

	}

	onClose() {
		UIHelp.CloseUI(UIBig_rich_item);
	}
}