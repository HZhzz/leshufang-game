const {ccclass} = cc._decorator;

@ccclass
export default class auto_yetStop_car extends cc.Component {
	yetStop_car: cc.Node;
	car: cc.Node;
	carSize: cc.Node;
	yet_info: cc.Node;
	yet_info_yin: cc.Node;
	yet_info_icon: cc.Node;
	yet_info_gold: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/yetStop_car.prefab"

    onLoad () {
		this.yetStop_car = this.node
		this.car = this.yetStop_car.getChildByName("car");
		this.carSize = this.yetStop_car.getChildByName("carSize");
		this.yet_info = this.yetStop_car.getChildByName("yet_info");
		this.yet_info_yin = this.yet_info.getChildByName("yet_info_yin");
		this.yet_info_icon = this.yet_info.getChildByName("yet_info_icon");
		this.yet_info_gold = this.yet_info.getChildByName("yet_info_gold");

    }
}
