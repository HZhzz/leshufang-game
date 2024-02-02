const {ccclass} = cc._decorator;

@ccclass
export default class auto_consignment_all_item extends cc.Component {
	consignment_all_item: cc.Node;
	unselected: cc.Node;
	bg2: cc.Node;
	bg1: cc.Node;
	selected: cc.Node;
	bg3: cc.Node;
	bg4: cc.Node;
	car: cc.Node;
	car_size: cc.Node;
	lab_name: cc.Node;

	public static URL:string = "db://assets/resources/prefab/consignment/consignment_all_item.prefab"

    onLoad () {
		this.consignment_all_item = this.node
		this.unselected = this.consignment_all_item.getChildByName("unselected");
		this.bg2 = this.unselected.getChildByName("bg2");
		this.bg1 = this.unselected.getChildByName("bg1");
		this.selected = this.consignment_all_item.getChildByName("selected");
		this.bg3 = this.selected.getChildByName("bg3");
		this.bg4 = this.selected.getChildByName("bg4");
		this.car = this.consignment_all_item.getChildByName("car");
		this.car_size = this.consignment_all_item.getChildByName("car_size");
		this.lab_name = this.consignment_all_item.getChildByName("lab_name");

    }
}
