import GameDataCenter from "../../../data/GameDataCenter";
import auto_zhuanpan from "../../../data/autoui/zhuanpan/auto_zhuanpan";
import { GameEvent } from "../../../data/const/EventConst";
import { VideoEvent } from "../../../data/const/VideoEvent";
import { ConfigModule } from "../../../data/model/ConfigModule";
import UIBase from "../UIBase";
import UIHelp from "../UIHelp";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/zhuanpan/UIZhuanpan")
export default class UIZhuanpan extends UIBase {
	ui: auto_zhuanpan = null;

	private _totalCnt = 8;// 显示奖品的总数
	private _awardPosition: number = 3;//奖品位置可以自己修改
	private _totalRotate: number;//总的旋转角度

	protected static prefabUrl = "zhuanpan/zhuanpan";
	protected static className = "UIZhuanpan";

	vo: any;
	names: any[] = ["银两", "银两", "银两", "宝箱", "奖券", "奖券", "奖券", "宝箱"];

	onUILoad() {
		this.ui = this.node.addComponent(auto_zhuanpan);
	}

	onShow() {
		window.test = (tp) => {
			this.rollSuccess({ tp, count: 1 });
		}
		this.onRegisterEvent(this.ui.btn_close, this.onClose);
		this.onRegisterEvent(this.ui.btn_huifu, this.lookadCount);
		this.onRegisterEvent(this.ui.btn_look, this.lookadCount);
		this.onRegisterEvent(this.ui.btn_zhuanpan, this.startRoll);

		this.initEvent(GameEvent.LOAD_ROULETTE_SUCCESS, this.initZhuanpan);
		this.initEvent(GameEvent.ROLL_ROULETTE_SUCCESS, this.rollSuccess);
		this.initEvent(GameEvent.ZHUANPAN_FIVE_BOX_ADV, this.fiveBoxAdv);
		this.initEvent(GameEvent.ZHUANPAN_TEN_BOX_ADV, this.tenBoxAdv);
	}

	onHide() {
	}

	onStart() {
		GameDataCenter.zhuanpan.loadRoulette();

		if (GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
			this.ui.btn_look.active = false;
		} else {
			this.ui.btn_look.active = true;
		}
	}

	initQuan() {
		UIHelp.SetLabel(this.ui.lab_times, `每天24:00恢复抽奖次数，当前剩余${this.vo.count}次`)

		if (this.vo.count > 0) {
			UIHelp.SetBtnGrayState(this.ui.btn_huifu, true);
		} else {
			UIHelp.SetBtnGrayState(this.ui.btn_huifu, false);
		}
	}

	/**
	 * 总的旋转角度å
	 * @param Scores 转盘拆分份数
	 * @param Skew 第一个奖区起始点与0点位置的偏移比例
	 * @param Qmin 转过最少圈数
	 * @param Qmax 转过最多圈数
	 * @param awardPosition 奖品所在奖区
	 * @param offset 指针所停位置离奖区边缘的比例
	 * @return 总的旋转角度
	 */
	private getRotationLong(Scores: number, Skew: number, Qmin: number, Qmax: number, awardPosition: number): number {
		var _q: number = 360 * (Math.floor(Math.random() * (Qmax - Qmin)) + Qmin);//整圈长度
		var _Skew: number = (360 / Scores) * Skew;//第一个奖区起始点与0点位置的偏移比例
		var _location: number = (360 / Scores) * awardPosition;//目标奖区的起始点
		return _q + _Skew - _location;
	}

	onClose() {
		UIHelp.CloseUI(UIZhuanpan);
	}
	//看广告
	lookadCount() {
		if (this.vo.count > 0) {
			// 提示是否要看广告恢复次数
		}

		// 如果是会员或者创始人则不用看广告，直接增加次数
		if (GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
			GameDataCenter.zhuanpan.vipfreead();
			return;
		}
		// 如果剩余次数不足则不用看广告，弹出一个次数不足的提示
		if (this.vo.adcount <= 0) {
			UIHelp.ShowTips("次数已达到上限");
			return;
		}

		GameDataCenter.baseSdk.createVideo(VideoEvent.ZHUANGPAN, ConfigModule.VIDEO_NAME.ZHUANGPAN, ConfigModule.VIDEO_ID.ZHUANGPAN);
	}
	initZhuanpan(data) {
		this.vo = data
		UIHelp.SetLabel(this.ui.lab_times, `每天24:00恢复抽奖次数，当前剩余${data.count}次`)

		if (data.adcount <= 0) {
			UIHelp.SetBtnGrayState(this.ui.btn_huifu, true);
		} else {
			if (data.count > 0) {
				UIHelp.SetBtnGrayState(this.ui.btn_huifu, true);
			} else {
				UIHelp.SetBtnGrayState(this.ui.btn_huifu, false);
			}
		}
	}

	startRoll() {
		if (this.vo.count <= 0) {
			UIHelp.ShowTips("抽奖次数不足")
			return
		}
		UIHelp.SetBtnGrayState(this.ui.btn_huifu, true);
		GameDataCenter.zhuanpan.rollRoulette();

		this.ui.btn_zhuanpan.getComponent(cc.Button).interactable = false;
	}

	// 1 少量银两 2大量银两 3海量银两 4 5倍宝箱 5 少量奖券 6 大量奖券 7 海量奖券 8 10倍宝箱
	rollSuccess(bonus) {
		// const idxList = [7, 6, 1, 0, 4, 3, 2, 5];
		const idxList = [3, 7, 1, 4, 0, 2, 5, 6];
		const targetAngleMin = idxList[bonus.tp - 1] * 45+10;
		const targetAngleMax = targetAngleMin + 45-10;
		const targetAngle = Math.floor(Math.random() * (targetAngleMax - targetAngleMin)) + targetAngleMin;
		this.ui.zp.angle = this.ui.zp.angle % 360;
		const startAngle = this.ui.zp.angle;
		const speed = 180;
		cc.tween(this.ui.zp)
			.set({ angle: startAngle })
			.by(2, { angle: 360 }, { easing: 'sineIn' })
			.by(3, { angle: 360 * 3 })
			.to((targetAngle + 360 - startAngle) / speed , { angle: 360 * 5 + targetAngle }, { easing: 'sineOut' })
			.call(() => {
				this.vo.count = bonus.count;
				this.initQuan();

				this.ui.btn_zhuanpan.getComponent(cc.Button).interactable = true;

				if (bonus.tp == 4) {
					this._bonus = bonus;

					if (GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
						UIHelp.ShowDialog({
							title: "提示",
							content: "恭喜获得5倍宝箱!\nvip用户可免广告领取",
							certainCb: () => {
								GameDataCenter.zhuanpan.vipfreead("5倍宝箱");
							},
						});
						return;
					}
					UIHelp.ShowDialog({
						title: "提示",
						content: "恭喜获得5倍宝箱，是否观看广告领取？",
						certainCb: () => {
							// 5倍宝箱需要看完广告才可以获得奖励
							GameDataCenter.baseSdk.createVideo(VideoEvent.FIVE_BOX, ConfigModule.VIDEO_NAME.FIVE_BOX, ConfigModule.VIDEO_ID.FIVE_BOX);
						},
					});
				} else if (bonus.tp == 8) {
					this._bonus = bonus;

					if (GameDataCenter.player.isVip() || GameDataCenter.player.isFounder()) {
						UIHelp.ShowDialog({
							title: "提示",
							content: "恭喜获得10倍宝箱!\nvip用户可免广告领取",
							certainCb: () => {
								GameDataCenter.zhuanpan.vipfreead("10倍宝箱");
							},
						});
						return;
					}
					UIHelp.ShowDialog({
						title: "提示",
						content: "恭喜获得10倍宝箱，是否观看广告领取？",
						certainCb: () => {
							// 10倍宝箱需要看完广告才可以获得奖励
							GameDataCenter.baseSdk.createVideo(VideoEvent.TEN_BOX, ConfigModule.VIDEO_NAME.TEN_BOX, ConfigModule.VIDEO_ID.TEN_BOX);
						},
					});
				} else {
					this.onRollFinish(bonus);
				}
			})
			.start();
	}

	private _bonus: any;
	tenBoxAdv() {
		this.onRollFinish(this._bonus);
	}
	fiveBoxAdv() {
		this.onRollFinish(this._bonus);
	}

	onRollFinish(bonus) {
		let name = this.names[Number(bonus.tp) - 1];
		UIHelp.ShowTips(`恭喜获得 ${name}X${bonus.coin}`)
		GameDataCenter.player.getUserInfo()
	}
}