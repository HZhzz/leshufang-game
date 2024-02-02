const {ccclass} = cc._decorator;

@ccclass
export default class auto_shop_item extends cc.Component {
	shop_item: cc.Node;
	bg: cc.Node;
	sp_img: cc.Node;
	img_size: cc.Node;
	lab_name: cc.Node;
	lab_doc1: cc.Node;
	doc2: cc.Node;
	btn_buy: cc.Node;
	btn_buy_lab: cc.Node;
	icon_zc: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/shop_item.prefab"

    onLoad () {
		this.shop_item = this.node
		this.bg = this.shop_item.getChildByName("bg");
		this.sp_img = this.shop_item.getChildByName("sp_img");
		this.img_size = this.shop_item.getChildByName("img_size");
		this.lab_name = this.shop_item.getChildByName("lab_name");
		this.lab_doc1 = this.shop_item.getChildByName("lab_doc1");
		this.doc2 = this.shop_item.getChildByName("doc2");
		this.btn_buy = this.shop_item.getChildByName("btn_buy");
		this.btn_buy_lab = this.btn_buy.getChildByName("btn_buy_lab");
		this.icon_zc = this.btn_buy.getChildByName("icon_zc");

    }
}
