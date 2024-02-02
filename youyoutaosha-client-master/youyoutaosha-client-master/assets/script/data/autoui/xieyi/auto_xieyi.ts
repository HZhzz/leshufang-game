const {ccclass} = cc._decorator;

@ccclass
export default class auto_xieyi extends cc.Component {
	xieyi: cc.Node;
	model: cc.Node;
	bg: cc.Node;
	btn_close: cc.Node;
	item: cc.Node;
	Scrollys: cc.Node;
	viewys: cc.Node;
	contentys: cc.Node;
	item2: cc.Node;
	item3: cc.Node;
	item7: cc.Node;
	item8: cc.Node;
	item9: cc.Node;
	item10: cc.Node;
	item11: cc.Node;
	item12: cc.Node;
	Scrollyh: cc.Node;
	viewyh: cc.Node;
	contentyh: cc.Node;
	item4: cc.Node;
	item5: cc.Node;
	item13: cc.Node;
	item14: cc.Node;
	item15: cc.Node;
	item16: cc.Node;
	item17: cc.Node;
	item18: cc.Node;
	Scrollgy: cc.Node;
	viewgy: cc.Node;
	contentgy: cc.Node;
	item6: cc.Node;

	public static URL:string = "db://assets/resources/prefab/xieyi/xieyi.prefab"

    onLoad () {
		this.xieyi = this.node
		this.model = this.xieyi.getChildByName("model");
		this.bg = this.xieyi.getChildByName("bg");
		this.btn_close = this.xieyi.getChildByName("btn_close");
		this.item = this.xieyi.getChildByName("item");
		this.Scrollys = this.xieyi.getChildByName("Scrollys");
		this.viewys = this.Scrollys.getChildByName("viewys");
		this.contentys = this.viewys.getChildByName("contentys");
		this.item2 = this.contentys.getChildByName("item2");
		this.item3 = this.contentys.getChildByName("item3");
		this.item7 = this.contentys.getChildByName("item7");
		this.item8 = this.contentys.getChildByName("item8");
		this.item9 = this.contentys.getChildByName("item9");
		this.item10 = this.contentys.getChildByName("item10");
		this.item11 = this.contentys.getChildByName("item11");
		this.item12 = this.contentys.getChildByName("item12");
		this.Scrollyh = this.xieyi.getChildByName("Scrollyh");
		this.viewyh = this.Scrollyh.getChildByName("viewyh");
		this.contentyh = this.viewyh.getChildByName("contentyh");
		this.item4 = this.contentyh.getChildByName("item4");
		this.item5 = this.contentyh.getChildByName("item5");
		this.item13 = this.contentyh.getChildByName("item13");
		this.item14 = this.contentyh.getChildByName("item14");
		this.item15 = this.contentyh.getChildByName("item15");
		this.item16 = this.contentyh.getChildByName("item16");
		this.item17 = this.contentyh.getChildByName("item17");
		this.item18 = this.contentyh.getChildByName("item18");
		this.Scrollgy = this.xieyi.getChildByName("Scrollgy");
		this.viewgy = this.Scrollgy.getChildByName("viewgy");
		this.contentgy = this.viewgy.getChildByName("contentgy");
		this.item6 = this.contentgy.getChildByName("item6");

    }
}
