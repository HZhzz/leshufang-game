const {ccclass} = cc._decorator;

@ccclass
export default class auto_select_car extends cc.Component {
	select_car: cc.Node;
	btn_close: cc.Node;
	bg: cc.Node;
	img_title: cc.Node;
	lab_title: cc.Node;
	ScrollView: cc.Node;
	view: cc.Node;
	content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/select_car.prefab"

    onLoad () {
		this.select_car = this.node
		this.btn_close = this.select_car.getChildByName("btn_close");
		this.bg = this.select_car.getChildByName("bg");
		this.img_title = this.bg.getChildByName("img_title");
		this.lab_title = this.img_title.getChildByName("lab_title");
		this.ScrollView = this.bg.getChildByName("ScrollView");
		this.view = this.ScrollView.getChildByName("view");
		this.content = this.view.getChildByName("content");

    }
}
