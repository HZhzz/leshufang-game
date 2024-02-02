const {ccclass} = cc._decorator;

@ccclass
export default class auto_yearbook_node extends cc.Component {
	yearbook_node: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	top1: cc.Node;
	bg_11111: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	New_Label: cc.Node;
	New_Label_copy: cc.Node;
	ToggleContainer: cc.Node;
	toggle1: cc.Node;
	Background1: cc.Node;
	checkmark1: cc.Node;
	toggle2: cc.Node;
	Background2: cc.Node;
	checkmark2: cc.Node;
	shop: cc.Node;
	ScrollView1: cc.Node;
	view1: cc.Node;
	content1: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/yearbook_node.prefab"

    onLoad () {
		this.yearbook_node = this.node
		this.ScrollView = this.yearbook_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.top1 = this.content.getChildByName("top1");
		this.bg_11111 = this.top1.getChildByName("bg_11111");
		this.btn_close = this.top1.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.New_Label = this.top1.getChildByName("New_Label");
		this.New_Label_copy = this.top1.getChildByName("New_Label_copy");
		this.ToggleContainer = this.content.getChildByName("ToggleContainer");
		this.toggle1 = this.ToggleContainer.getChildByName("toggle1");
		this.Background1 = this.toggle1.getChildByName("Background1");
		this.checkmark1 = this.toggle1.getChildByName("checkmark1");
		this.toggle2 = this.ToggleContainer.getChildByName("toggle2");
		this.Background2 = this.toggle2.getChildByName("Background2");
		this.checkmark2 = this.toggle2.getChildByName("checkmark2");
		this.shop = this.content.getChildByName("shop");
		this.ScrollView1 = this.shop.getChildByName("ScrollView1");
		this.view1 = this.ScrollView1.getChildByName("view1");
		this.content1 = this.view1.getChildByName("content1");

    }
}
