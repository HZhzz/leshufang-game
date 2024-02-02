const {ccclass} = cc._decorator;

@ccclass
export default class auto_handbook_node extends cc.Component {
	handbook_node: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	top1: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	lab_title: cc.Node;
	img_biaoti: cc.Node;
	lab_title_1: cc.Node;
	ToggleContainer: cc.Node;
	toggle1: cc.Node;
	Background: cc.Node;
	checkmark: cc.Node;
	toggle2: cc.Node;
	handbook: cc.Node;
	ScrollView1: cc.Node;
	view1: cc.Node;
	content1: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/handbook_node.prefab"

    onLoad () {
		this.handbook_node = this.node
		this.ScrollView = this.handbook_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.top1 = this.content.getChildByName("top1");
		this.btn_close = this.top1.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.lab_title = this.top1.getChildByName("lab_title");
		this.img_biaoti = this.top1.getChildByName("img_biaoti");
		this.lab_title_1 = this.top1.getChildByName("lab_title_1");
		this.ToggleContainer = this.content.getChildByName("ToggleContainer");
		this.toggle1 = this.ToggleContainer.getChildByName("toggle1");
		this.Background = this.toggle1.getChildByName("Background");
		this.checkmark = this.toggle1.getChildByName("checkmark");
		this.toggle2 = this.ToggleContainer.getChildByName("toggle2");
		this.handbook = this.content.getChildByName("handbook");
		this.ScrollView1 = this.handbook.getChildByName("ScrollView1");
		this.view1 = this.ScrollView1.getChildByName("view1");
		this.content1 = this.view1.getChildByName("content1");

    }
}
