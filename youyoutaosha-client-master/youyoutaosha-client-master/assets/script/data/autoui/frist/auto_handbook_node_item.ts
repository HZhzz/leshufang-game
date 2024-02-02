const {ccclass} = cc._decorator;

@ccclass
export default class auto_handbook_node_item extends cc.Component {
	handbook_node_item: cc.Node;
	book_img: cc.Node;
	book_size: cc.Node;
	book_name: cc.Node;
	book_doc_1: cc.Node;
	book_doc_2: cc.Node;
	line: cc.Node;
	dian: cc.Node;
	img_go: cc.Node;
	lab_go: cc.Node;
	img_red: cc.Node;
	lab_num_red: cc.Node;
	btn_lingqu_red: cc.Node;
	lab_lingqu_red: cc.Node;
	img_dou: cc.Node;
	lab_num_dou: cc.Node;
	btn_lingqu_dou: cc.Node;
	lab_lingqu_dou: cc.Node;
	img_gold: cc.Node;
	lab_num_gold: cc.Node;
	btn_lingqu_gold: cc.Node;
	lab_lingqu_gold: cc.Node;
	img_coupon: cc.Node;
	lab_num_coupon: cc.Node;
	btn_lingqu_coupon: cc.Node;
	lab_lingqu_coupon: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/handbook_node_item.prefab"

    onLoad () {
		this.handbook_node_item = this.node
		this.book_img = this.handbook_node_item.getChildByName("book_img");
		this.book_size = this.handbook_node_item.getChildByName("book_size");
		this.book_name = this.handbook_node_item.getChildByName("book_name");
		this.book_doc_1 = this.handbook_node_item.getChildByName("book_doc_1");
		this.book_doc_2 = this.handbook_node_item.getChildByName("book_doc_2");
		this.line = this.handbook_node_item.getChildByName("line");
		this.dian = this.handbook_node_item.getChildByName("dian");
		this.img_go = this.handbook_node_item.getChildByName("img_go");
		this.lab_go = this.img_go.getChildByName("lab_go");
		this.img_red = this.handbook_node_item.getChildByName("img_red");
		this.lab_num_red = this.img_red.getChildByName("lab_num_red");
		this.btn_lingqu_red = this.img_red.getChildByName("btn_lingqu_red");
		this.lab_lingqu_red = this.btn_lingqu_red.getChildByName("lab_lingqu_red");
		this.img_dou = this.handbook_node_item.getChildByName("img_dou");
		this.lab_num_dou = this.img_dou.getChildByName("lab_num_dou");
		this.btn_lingqu_dou = this.img_dou.getChildByName("btn_lingqu_dou");
		this.lab_lingqu_dou = this.btn_lingqu_dou.getChildByName("lab_lingqu_dou");
		this.img_gold = this.handbook_node_item.getChildByName("img_gold");
		this.lab_num_gold = this.img_gold.getChildByName("lab_num_gold");
		this.btn_lingqu_gold = this.img_gold.getChildByName("btn_lingqu_gold");
		this.lab_lingqu_gold = this.btn_lingqu_gold.getChildByName("lab_lingqu_gold");
		this.img_coupon = this.handbook_node_item.getChildByName("img_coupon");
		this.lab_num_coupon = this.img_coupon.getChildByName("lab_num_coupon");
		this.btn_lingqu_coupon = this.img_coupon.getChildByName("btn_lingqu_coupon");
		this.lab_lingqu_coupon = this.btn_lingqu_coupon.getChildByName("lab_lingqu_coupon");

    }
}
