const {ccclass} = cc._decorator;

@ccclass
export default class auto_consignment_record extends cc.Component {
	consignment_record: cc.Node;
	bg: cc.Node;
	header: cc.Node;
	btn_close: cc.Node;
	btn_close_1: cc.Node;
	lab_close_title: cc.Node;
	titlebg: cc.Node;
	lab_1: cc.Node;
	lab_2: cc.Node;
	lab_3: cc.Node;
	list: cc.Node;
	mask: cc.Node;
	content: cc.Node;

	public static URL:string = "db://assets/resources/prefab/consignment/consignment_record.prefab"

    onLoad () {
		this.consignment_record = this.node
		this.bg = this.consignment_record.getChildByName("bg");
		this.header = this.bg.getChildByName("header");
		this.btn_close = this.bg.getChildByName("btn_close");
		this.btn_close_1 = this.btn_close.getChildByName("btn_close_1");
		this.lab_close_title = this.btn_close.getChildByName("lab_close_title");
		this.titlebg = this.bg.getChildByName("titlebg");
		this.lab_1 = this.titlebg.getChildByName("lab_1");
		this.lab_2 = this.titlebg.getChildByName("lab_2");
		this.lab_3 = this.titlebg.getChildByName("lab_3");
		this.list = this.bg.getChildByName("list");
		this.mask = this.list.getChildByName("mask");
		this.content = this.mask.getChildByName("content");

    }
}
