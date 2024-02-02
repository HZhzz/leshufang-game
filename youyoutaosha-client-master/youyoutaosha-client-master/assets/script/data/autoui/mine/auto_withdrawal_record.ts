const {ccclass} = cc._decorator;

@ccclass
export default class auto_withdrawal_record extends cc.Component {
	withdrawal_record: cc.Node;
	btn_close: cc.Node;
	lab_st: cc.Node;
	btn_close_1: cc.Node;
	ToggleContainer: cc.Node;
	toggle1: cc.Node;
	Background1: cc.Node;
	checkmark1: cc.Node;
	toggle2: cc.Node;
	Background2: cc.Node;
	checkmark2: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	btn_all: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/withdrawal_record.prefab"

    onLoad () {
		this.withdrawal_record = this.node
		this.btn_close = this.withdrawal_record.getChildByName("btn_close");
		this.lab_st = this.btn_close.getChildByName("lab_st");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.ToggleContainer = this.withdrawal_record.getChildByName("ToggleContainer");
		this.toggle1 = this.ToggleContainer.getChildByName("toggle1");
		this.Background1 = this.toggle1.getChildByName("Background1");
		this.checkmark1 = this.toggle1.getChildByName("checkmark1");
		this.toggle2 = this.ToggleContainer.getChildByName("toggle2");
		this.Background2 = this.toggle2.getChildByName("Background2");
		this.checkmark2 = this.toggle2.getChildByName("checkmark2");
		this.ScrollView = this.withdrawal_record.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.btn_all = this.withdrawal_record.getChildByName("btn_all");

    }
}
