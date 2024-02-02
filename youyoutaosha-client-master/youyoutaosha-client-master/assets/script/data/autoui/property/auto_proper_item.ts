const {ccclass} = cc._decorator;

@ccclass
export default class auto_proper_item extends cc.Component {
	proper_item: cc.Node;
	bg: cc.Node;
	sp_car_size: cc.Node;
	sp_car: cc.Node;
	lab_carname: cc.Node;
	sp_numberBg: cc.Node;
	lab_number: cc.Node;

	public static URL:string = "db://assets/resources/prefab/property/proper_item.prefab"

    onLoad () {
		this.proper_item = this.node
		this.bg = this.proper_item.getChildByName("bg");
		this.sp_car_size = this.proper_item.getChildByName("sp_car_size");
		this.sp_car = this.proper_item.getChildByName("sp_car");
		this.lab_carname = this.proper_item.getChildByName("lab_carname");
		this.sp_numberBg = this.proper_item.getChildByName("sp_numberBg");
		this.lab_number = this.sp_numberBg.getChildByName("lab_number");

    }
}
