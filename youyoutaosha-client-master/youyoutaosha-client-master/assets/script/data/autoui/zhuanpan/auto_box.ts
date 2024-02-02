const {ccclass} = cc._decorator;

@ccclass
export default class auto_box extends cc.Component {
	box: cc.Node;
	btn_close: cc.Node;
	box_back: cc.Node;
	car: cc.Node;
	btn_huifu: cc.Node;
	lab_huifu: cc.Node;

	public static URL:string = "db://assets/resources/prefab/zhuanpan/box.prefab"

    onLoad () {
		this.box = this.node
		this.btn_close = this.box.getChildByName("btn_close");
		this.box_back = this.box.getChildByName("box_back");
		this.car = this.box_back.getChildByName("car");
		this.btn_huifu = this.box_back.getChildByName("btn_huifu");
		this.lab_huifu = this.btn_huifu.getChildByName("lab_huifu");

    }
}
