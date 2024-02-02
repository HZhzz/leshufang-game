const {ccclass} = cc._decorator;

@ccclass
export default class auto_yearbook_node_item_item extends cc.Component {
	car: cc.Node;
	sp_bg: cc.Node;
	sp_img_size: cc.Node;
	sp_img: cc.Node;
	label_name: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/yearbook_node_item_item.prefab"

    onLoad () {
		this.car = this.node
		this.sp_bg = this.car.getChildByName("sp_bg");
		this.sp_img_size = this.car.getChildByName("sp_img_size");
		this.sp_img = this.car.getChildByName("sp_img");
		this.label_name = this.car.getChildByName("label_name");

    }
}
