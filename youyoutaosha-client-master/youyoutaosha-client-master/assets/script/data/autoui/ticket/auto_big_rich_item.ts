const {ccclass} = cc._decorator;

@ccclass
export default class auto_big_rich_item extends cc.Component {
	big_rich_item: cc.Node;
	bg: cc.Node;
	img_kuang: cc.Node;
	img_face: cc.Node;
	wk: cc.Node;
	img_icon: cc.Node;
	lab_name: cc.Node;
	lab_num: cc.Node;
	icon_dou: cc.Node;
	btn_lx: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/big_rich_item.prefab"

    onLoad () {
		this.big_rich_item = this.node
		this.bg = this.big_rich_item.getChildByName("bg");
		this.img_kuang = this.big_rich_item.getChildByName("img_kuang");
		this.img_face = this.img_kuang.getChildByName("img_face");
		this.wk = this.big_rich_item.getChildByName("wk");
		this.img_icon = this.big_rich_item.getChildByName("img_icon");
		this.lab_name = this.big_rich_item.getChildByName("lab_name");
		this.lab_num = this.big_rich_item.getChildByName("lab_num");
		this.icon_dou = this.big_rich_item.getChildByName("icon_dou");
		this.btn_lx = this.big_rich_item.getChildByName("btn_lx");

    }
}
