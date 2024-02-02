const {ccclass} = cc._decorator;

@ccclass
export default class auto_sui_pian_item extends cc.Component {
	sui_pian_item: cc.Node;
	img_icon: cc.Node;
	img_size: cc.Node;
	label_name: cc.Node;
	label_number: cc.Node;
	btn_change: cc.Node;
	label: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/sui_pian_item.prefab"

    onLoad () {
		this.sui_pian_item = this.node
		this.img_icon = this.sui_pian_item.getChildByName("img_icon");
		this.img_size = this.sui_pian_item.getChildByName("img_size");
		this.label_name = this.sui_pian_item.getChildByName("label_name");
		this.label_number = this.sui_pian_item.getChildByName("label_number");
		this.btn_change = this.sui_pian_item.getChildByName("btn_change");
		this.label = this.btn_change.getChildByName("label");

    }
}
