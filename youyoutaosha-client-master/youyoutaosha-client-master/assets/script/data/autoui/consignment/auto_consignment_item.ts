const {ccclass} = cc._decorator;

@ccclass
export default class auto_consignment_item extends cc.Component {
	consignment_item: cc.Node;
	car: cc.Node;
	car_size: cc.Node;
	lab_name: cc.Node;
	lab_number: cc.Node;
	btn_buy: cc.Node;
	lab_buy: cc.Node;
	img_um: cc.Node;
	icon: cc.Node;
	lab_doudou: cc.Node;

	public static URL:string = "db://assets/resources/prefab/consignment/consignment_item.prefab"

    onLoad () {
		this.consignment_item = this.node
		this.car = this.consignment_item.getChildByName("car");
		this.car_size = this.consignment_item.getChildByName("car_size");
		this.lab_name = this.consignment_item.getChildByName("lab_name");
		this.lab_number = this.consignment_item.getChildByName("lab_number");
		this.btn_buy = this.consignment_item.getChildByName("btn_buy");
		this.lab_buy = this.btn_buy.getChildByName("lab_buy");
		this.img_um = this.consignment_item.getChildByName("img_um");
		this.icon = this.img_um.getChildByName("icon");
		this.lab_doudou = this.img_um.getChildByName("lab_doudou");

    }
}
