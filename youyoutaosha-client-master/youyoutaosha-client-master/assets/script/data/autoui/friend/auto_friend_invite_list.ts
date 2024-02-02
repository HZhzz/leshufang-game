const {ccclass} = cc._decorator;

@ccclass
export default class auto_friend_invite_list extends cc.Component {
	friend_invite_list: cc.Node;
	btn_close: cc.Node;
	ToggleContainer: cc.Node;
	tog_back: cc.Node;
	toggle1: cc.Node;
	Background1: cc.Node;
	lab1: cc.Node;
	checkmark1: cc.Node;
	toggle2: cc.Node;
	Background2: cc.Node;
	lab2: cc.Node;
	checkmark2: cc.Node;
	toggle3: cc.Node;
	Background3: cc.Node;
	lab3: cc.Node;
	checkmark3: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/friend_invite_list.prefab"

    onLoad () {
		this.friend_invite_list = this.node
		this.btn_close = this.friend_invite_list.getChildByName("btn_close");
		this.ToggleContainer = this.friend_invite_list.getChildByName("ToggleContainer");
		this.tog_back = this.ToggleContainer.getChildByName("tog_back");
		this.toggle1 = this.ToggleContainer.getChildByName("toggle1");
		this.Background1 = this.toggle1.getChildByName("Background1");
		this.lab1 = this.toggle1.getChildByName("lab1");
		this.checkmark1 = this.toggle1.getChildByName("checkmark1");
		this.toggle2 = this.ToggleContainer.getChildByName("toggle2");
		this.Background2 = this.toggle2.getChildByName("Background2");
		this.lab2 = this.toggle2.getChildByName("lab2");
		this.checkmark2 = this.toggle2.getChildByName("checkmark2");
		this.toggle3 = this.ToggleContainer.getChildByName("toggle3");
		this.Background3 = this.toggle3.getChildByName("Background3");
		this.lab3 = this.toggle3.getChildByName("lab3");
		this.checkmark3 = this.toggle3.getChildByName("checkmark3");
		this.ScrollView = this.friend_invite_list.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");

    }
}
