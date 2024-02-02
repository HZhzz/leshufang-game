const {ccclass} = cc._decorator;

@ccclass
export default class auto_play_node extends cc.Component {
	play_node: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;
	zhengye_01: cc.Node;
	zhengye_02: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	lab_jishouzhongxin: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/play_node.prefab"

    onLoad () {
		this.play_node = this.node
		this.ScrollView = this.play_node.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");
		this.zhengye_01 = this.content.getChildByName("zhengye_01");
		this.zhengye_02 = this.content.getChildByName("zhengye_02");
		this.btn_close = this.play_node.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.lab_jishouzhongxin = this.btn_close.getChildByName("lab_jishouzhongxin");

    }
}
