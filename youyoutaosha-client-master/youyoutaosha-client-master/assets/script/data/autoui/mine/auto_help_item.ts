const {ccclass} = cc._decorator;

@ccclass
export default class auto_help_item extends cc.Component {
	help_item: cc.Node;
	lab_name: cc.Node;
	lab_content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/help_item.prefab"

    onLoad () {
		this.help_item = this.node
		this.lab_name = this.help_item.getChildByName("lab_name");
		this.lab_content = this.help_item.getChildByName("lab_content");

    }
}
