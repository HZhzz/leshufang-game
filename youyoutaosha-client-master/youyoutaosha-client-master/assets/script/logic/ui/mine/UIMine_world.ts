import GameDataCenter from "../../../data/GameDataCenter";
import auto_mine_world from "../../../data/autoui/mine/auto_mine_world";
import { GameEvent } from "../../../data/const/EventConst";
import { Utils } from "../../../utils/Utils";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";
import UIDoudouGive from "./UIDoudouGive";
import UIDoudouToMoney from "./UIDoudouToMoney";
import UIWithdrawal_node from "./UIWithdrawal_node";
import UIWithdrawal_record from "./UIWithdrawal_record";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/mine/UIMine_world")
export default class UIMine_world extends UIBase {
	ui: auto_mine_world = null;

	protected static prefabUrl = "mine/mine_world";
	protected static className = "UIMine_world";

	onUILoad() {
		this.ui = this.node.addComponent(auto_mine_world);
	}

	onShow() {
		this.initEvent(GameEvent.GET_USER_SUCCESS, this.initUI);
		this.initEvent(GameEvent.DOUDOUINFO, this.initUI);

		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_record, this.onRecord);

	}

	onHide() {

	}

	onStart() {
		setTimeout(() => {
			this.ui.ScrollView.getComponent(cc.ScrollView).scrollToTop()
		}, 1);

		GameDataCenter.player.onSetDoudouInfo();
	}

	_updateDataTween: cc.Tween = null;
	initUI() {
		console.log('GameDataCenter.player.doudouInfo', GameDataCenter.player.doudouInfo);

		this.drawPriceLine();

		UIHelp.SetLabel(this.ui.world_info_doudou, Utils.convertShow(GameDataCenter.player.doudou));

		const price =GameDataCenter.player.doudou * GameDataCenter.player.doudouInfo.initfen;
		UIHelp.SetLabel(this.ui.world_info_rmb, price);

		UIHelp.SetLabel(this.ui.lab_onedoupice, GameDataCenter.player.doudouInfo.initfen)
		UIHelp.SetLabel(this.ui.lab_todayup, "+" + GameDataCenter.player.doudouInfo.todayup + "%")
		UIHelp.SetLabel(this.ui.lab_weekup, "+" + GameDataCenter.player.doudouInfo.weekup + "%")
		UIHelp.SetLabel(this.ui.lab_monthup, "+" + GameDataCenter.player.doudouInfo.monthup + "%")
		UIHelp.SetLabel(this.ui.lab_jiup, "+" + GameDataCenter.player.doudouInfo.threemonthup + "%")
		UIHelp.SetLabel(this.ui.lab_allup, "+" + GameDataCenter.player.doudouInfo.historyup + "%")
	}

	drawPriceLine() {
		const doudouInfo = GameDataCenter.player.doudouInfo;
		const step = Number(doudouInfo.step);

		// 横坐标数量
		const xCount = 4;
		// 横坐标
		const today = new Date();
		const nextSunday = new Date(today.getTime() + (7 - today.getDay()) * 24 * 60 * 60 * 1000);
		const firstSunday = new Date(nextSunday.getTime() - (xCount - 1) * 7 * 24 * 60 * 60 * 1000);
		for (let i = 0; i < xCount; i++) {
			const date = new Date(nextSunday.getTime() - i * 7 * 24 * 60 * 60 * 1000);
			const month = date.getMonth() + 1;
			const day = date.getDate();
			const str = `${month}-${day}`;
			const label = cc.instantiate(this.ui.lab_date_);
			label.parent = this.ui.lab_date_.parent;
			label.getComponent(cc.Label).string = str;
			label.active = true;
			label.name = `lab_date_${i}`;

			const rightX = label.parent.convertToNodeSpaceAR(this.ui.pos2.convertToWorldSpaceAR(cc.v3(0, 0))).x;
			const leftX = label.parent.convertToNodeSpaceAR(this.ui.line.convertToWorldSpaceAR(cc.v3(0, 0))).x;

			label.x = rightX - i * (rightX - leftX) / (xCount - 1);
		}

		firstSunday.setHours(0, 0, 0, 0);
		nextSunday.setHours(0, 0, 0, 0);

		// 纵坐标
		const startValue = Number(doudouInfo.initfen) - step * (today.getTime() - firstSunday.getTime()) / 1000;
		const endValue = Number(doudouInfo.initfen) + step * (nextSunday.getTime() - today.getTime()) / 1000;

		const yMax = Math.ceil(endValue * 100000000) / 100000000;
		const yMin = Math.floor(startValue * 100000000) / 100000000;
		const yMiddle = (yMax + yMin) / 2;
		UIHelp.SetLabel(this.ui.lab_map_zero, yMin.toFixed(8));
		UIHelp.SetLabel(this.ui.lab_map_middle, yMiddle.toFixed(8));
		UIHelp.SetLabel(this.ui.lab_map_top, yMax.toFixed(8));

		this.ui.lab_map_zero.y = this.ui.lab_map_zero.parent.convertToNodeSpaceAR(this.ui.line.convertToWorldSpaceAR(cc.v3(0, 0))).y;
		this.ui.lab_map_top.y = this.ui.lab_map_top.parent.convertToNodeSpaceAR(this.ui.pos2.convertToWorldSpaceAR(cc.v3(0, 0))).y;
		this.ui.lab_map_middle.y = (this.ui.lab_map_zero.y + this.ui.lab_map_top.y) / 2;

		const todayValue = Number(doudouInfo.initfen);
		const todayX = this.ui.pos2.x * (today.getTime() - firstSunday.getTime()) / (nextSunday.getTime() - firstSunday.getTime());
		const todayY = this.ui.pos2.y * (todayValue - yMin) / (yMax - yMin);

		const firstSundayY = this.ui.pos2.y * (startValue - yMin) / (yMax - yMin);
		// 绘制曲线
		let gra = this.ui.line.getComponent(cc.Graphics)
		gra.clear();

		gra.strokeColor = new cc.Color().fromHEX("#F4B628");
		gra.moveTo(0, firstSundayY);
		gra.lineTo(todayX, todayY);

		gra.stroke();
		gra.strokeColor = new cc.Color().fromHEX("#FFF1D7");
		gra.lineTo(todayX, 0)
		gra.lineTo(0, 0)
		gra.fill();

		// 绘制坐标轴
		gra.strokeColor = new cc.Color().fromHEX("#9F9F9F");
		gra.moveTo(0, this.ui.pos2.y + 20);
		gra.lineTo(0 - 7, this.ui.pos2.y + 20 - 10);
		gra.moveTo(0, this.ui.pos2.y + 20);
		gra.lineTo(0 + 7, this.ui.pos2.y + 20 - 10);
		gra.moveTo(0, this.ui.pos2.y + 20);
		gra.lineTo(0, 0);
		gra.lineTo(this.ui.pos2.x + 20, 0);
		gra.lineTo(this.ui.pos2.x + 20 - 10, 0 - 7);
		gra.moveTo(this.ui.pos2.x + 20, 0);
		gra.lineTo(this.ui.pos2.x + 20 - 10, 0 + 7);
		gra.stroke();
	}

	_dataList = [];
	updateData() {
		const doudouInfo = GameDataCenter.player.doudouInfo;
		const step = Number(doudouInfo.step);
		this._dataList.push(this._dataList[this._dataList.length - 1] + step);
		if (this._dataList.length > 15) {
			GameDataCenter.player.onSetDoudouInfo();
		}
	}
	updateLabelTween(labelNode: cc.Node) {
		labelNode.active = false;

		const layoutNode = cc.instantiate(labelNode);
		layoutNode.parent = labelNode.parent;
		layoutNode.active = true;
		layoutNode.removeComponent(cc.Label);
		const layout = layoutNode.addComponent(cc.Layout);
		layout.type = cc.Layout.Type.HORIZONTAL;

		const label = labelNode.getComponent(cc.Label);
		label.string.split('').forEach((str, index) => {
			const newNode = new cc.Node();
			newNode.parent = layoutNode;
			newNode.color = labelNode.color;
			const newLabel = newNode.addComponent(cc.Label);
			newLabel.string = str;
			newLabel.fontSize = label.fontSize;
			newLabel.lineHeight = label.lineHeight;
			newLabel.font = label.font;
			newLabel.enableBold = label.enableBold;
			newLabel.horizontalAlign = label.horizontalAlign;

			cc.tween(newNode)
				.set({ scale: 2, opacity: 0 })
				.delay(index * 0.1)
				.to(0.2, { scale: 1, opacity: 255 })
				.call(() => {
					if (index == label.string.length - 1) {
						labelNode.active = true;
						layoutNode.destroy();
					}
				})
				.start();
		});
	}
	//绘制曲线
	drawLine() {
		const doudouInfo = GameDataCenter.player.doudouInfo;
		const step = Number(doudouInfo.step);
		const min = Math.min(...this._dataList);
		const max = min + step * 20;
		const middle = ((max + min) / 2);

		const oldMin = this.ui.lab_map_zero.getComponent(cc.Label).string;
		UIHelp.SetLabel(this.ui.lab_map_zero, min.toFixed(12));
		UIHelp.SetLabel(this.ui.lab_map_middle, middle.toFixed(12));
		UIHelp.SetLabel(this.ui.lab_map_top, max.toFixed(12));

		if (oldMin != min.toFixed(12)) {
			this.updateLabelTween(this.ui.lab_map_zero);
			this.updateLabelTween(this.ui.lab_map_middle);
			this.updateLabelTween(this.ui.lab_map_top);
		}

		let gra = this.ui.line.getComponent(cc.Graphics)
		gra.clear();
		gra.strokeColor = new cc.Color().fromHEX("#F4B628");
		gra.moveTo(0, 0);

		const width = this.ui.pos2.x;
		const height = this.ui.pos2.y;
		let lastX;
		this._dataList.forEach((num, index) => {
			const x = width / 14 * index;
			const y = (num - min) / (max - min) * height;
			gra.lineTo(x, y);
			lastX = x;
		});
		gra.stroke();
		gra.strokeColor = new cc.Color().fromHEX("#FFF1D7");
		gra.lineTo(lastX, 0)
		gra.lineTo(0, 0)
		gra.fill();
	}
	onClose() {
		UIHelp.CloseUI(UIMine_world);
	}
	//赠送
	onGive() {
		UIHelp.ShowUI(UIDoudouGive)
	}
	onRecord() {
		UIHelp.ShowUI(UIWithdrawal_record, null, "fen")
	}
	//体现
	onTixian() {
		UIHelp.ShowUI(UIDoudouToMoney)
	}
}	