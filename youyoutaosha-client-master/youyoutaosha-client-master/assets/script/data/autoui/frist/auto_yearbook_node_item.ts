const {ccclass} = cc._decorator;

@ccclass
export default class auto_yearbook_node_item extends cc.Component {
	yearbook_node_item: cc.Node;
	yearbook_node_name: cc.Node;
	yearbook_node_prize: cc.Node;
	lab_yearbook_red: cc.Node;
	btn_lingqu: cc.Node;
	icon: cc.Node;
	icon_zc: cc.Node;
	icon_d: cc.Node;
	btn_lingqu_lab: cc.Node;
	yearbook_car_list: cc.Node;
	content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/yearbook_node_item.prefab"

    onLoad () {
		this.yearbook_node_item = this.node
		this.yearbook_node_name = this.yearbook_node_item.getChildByName("yearbook_node_name");
		this.yearbook_node_prize = this.yearbook_node_item.getChildByName("yearbook_node_prize");
		this.lab_yearbook_red = this.yearbook_node_prize.getChildByName("lab_yearbook_red");
		this.btn_lingqu = this.yearbook_node_prize.getChildByName("btn_lingqu");
		this.icon = this.btn_lingqu.getChildByName("icon");
		this.icon_zc = this.btn_lingqu.getChildByName("icon_zc");
		this.icon_d = this.btn_lingqu.getChildByName("icon_d");
		this.btn_lingqu_lab = this.btn_lingqu.getChildByName("btn_lingqu_lab");
		this.yearbook_car_list = this.yearbook_node_item.getChildByName("yearbook_car_list");
		this.content = this.yearbook_car_list.getChildByName("content");

    }
}
