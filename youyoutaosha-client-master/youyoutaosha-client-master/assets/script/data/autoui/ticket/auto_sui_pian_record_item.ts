const {ccclass} = cc._decorator;

@ccclass
export default class auto_sui_pian_record_item extends cc.Component {
	sui_pian_record_item: cc.Node;
	img_icon: cc.Node;
	img_size: cc.Node;
	label_name: cc.Node;
	label_date: cc.Node;
	label_status: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/sui_pian_record_item.prefab"

    onLoad () {
		this.sui_pian_record_item = this.node
		this.img_icon = this.sui_pian_record_item.getChildByName("img_icon");
		this.img_size = this.sui_pian_record_item.getChildByName("img_size");
		this.label_name = this.sui_pian_record_item.getChildByName("label_name");
		this.label_date = this.sui_pian_record_item.getChildByName("label_date");
		this.label_status = this.sui_pian_record_item.getChildByName("label_status");

    }
}
