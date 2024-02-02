const {ccclass} = cc._decorator;

@ccclass
export default class auto_consignment_record_item extends cc.Component {
	consignment_record_item: cc.Node;
	bg: cc.Node;
	img: cc.Node;
	img_size: cc.Node;
	lab_name: cc.Node;
	lab_date: cc.Node;
	lab_num: cc.Node;
	lab_dou: cc.Node;
	img_dou: cc.Node;

	public static URL:string = "db://assets/resources/prefab/consignment/consignment_record_item.prefab"

    onLoad () {
		this.consignment_record_item = this.node
		this.bg = this.consignment_record_item.getChildByName("bg");
		this.img = this.consignment_record_item.getChildByName("img");
		this.img_size = this.consignment_record_item.getChildByName("img_size");
		this.lab_name = this.consignment_record_item.getChildByName("lab_name");
		this.lab_date = this.consignment_record_item.getChildByName("lab_date");
		this.lab_num = this.consignment_record_item.getChildByName("lab_num");
		this.lab_dou = this.consignment_record_item.getChildByName("lab_dou");
		this.img_dou = this.consignment_record_item.getChildByName("img_dou");

    }
}
