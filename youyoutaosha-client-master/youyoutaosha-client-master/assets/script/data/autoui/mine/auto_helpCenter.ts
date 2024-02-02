const {ccclass} = cc._decorator;

@ccclass
export default class auto_helpCenter extends cc.Component {
	helpCenter: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	lab_st: cc.Node;
	help: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/helpCenter.prefab"

    onLoad () {
		this.helpCenter = this.node
		this.btn_close = this.helpCenter.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.lab_st = this.btn_close.getChildByName("lab_st");
		this.help = this.helpCenter.getChildByName("help");
		this.ScrollView = this.help.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");

    }
}
