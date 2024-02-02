import GameDataCenter from "../../../data/GameDataCenter";
import auto_yearbook_node_item from "../../../data/autoui/frist/auto_yearbook_node_item";
import VirtualItem from "../../../virtualList/VirtualItem";
import VirtualList from "../../../virtualList/VirtualList";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/frist/UIYearbook_node_item")
export default class UIYearbook_node_item extends VirtualItem {
	ui: auto_yearbook_node_item = null;

	protected static prefabUrl = "frist/yearbook_node_item";
	protected static className = "UIYearbook_node_item";
	vo: any;
	onUILoad() {
		this.ui = this.node.addComponent(auto_yearbook_node_item);
	}

	onShow() {
		this.onRegisterEvent(this.ui.btn_lingqu, this.linquJnc);
	}

	onHide() {

	}

	onStart() {

	}
	//记载item数据
	onInitItem(vo) {
		this.vo = vo
		console.log(vo);

		this.ui.lab_yearbook_red.active = false;
		this.ui.btn_lingqu.active = true;
		this.ui.btn_lingqu.getComponent(cc.Button).interactable = false
		UIHelp.SetBtnGrayState(this.ui.icon_d, true);
		if (vo.list.every(data => data.ishave)) {
			if (vo.lingqustatus == 0) {
				this.ui.btn_lingqu.getComponent(cc.Button).interactable = true
				this.ui.lab_yearbook_red.active = false
				UIHelp.SetBtnGrayState(this.ui.icon_d, false);
			}
		} else {
			if (vo.lingqustatus == 1) {
				this.ui.lab_yearbook_red.active = true
				this.ui.btn_lingqu.active = false
			}
		}
		const count = vo.list.filter(data => data.ishave).length;
		UIHelp.SetLabel(this.ui.yearbook_node_name, `${vo.name}（${count}/${vo.list.length}）`);


		this.ui.icon_d.active = false
		this.ui.icon.active = false
		this.ui.icon_zc.active = false
		//奖品类型
		if (vo.prizetype == "乐豆") {
			this.ui.icon_d.active = true
			UIHelp.SetLabel(this.ui.btn_lingqu_lab, vo.prizenum)
		}
		else if (vo.prizetype == "奖券") {
			this.ui.icon.active = true
			UIHelp.SetLabel(this.ui.btn_lingqu_lab, vo.prizenum)
		}
		else if (vo.prizetype == "金币") {
			this.ui.icon_zc.active = true
			UIHelp.SetLabel(this.ui.btn_lingqu_lab, vo.prizenum)
		}

		//车列表
		const virtualList = this.ui.yearbook_car_list.getComponent(VirtualList);
		virtualList.clearAll();
		vo.list.forEach(data => {
			virtualList.push(data);
		});
	}
	//领取
	linquJnc() {
		GameDataCenter.car.getYeatBookPrize(this.vo.id)
	}
	onClose() {
		UIHelp.CloseUI(UIYearbook_node_item);
	}
}