const {ccclass} = cc._decorator;

@ccclass
export default class auto_select_item extends cc.Component {
	select_item: cc.Node;
	sp_img: cc.Node;
	sp_size: cc.Node;
	sp_car: cc.Node;
	lab_name: cc.Node;
	lab_doc1: cc.Node;
	lab_doc2: cc.Node;
	btn_stop: cc.Node;
	btn_stop_lab: cc.Node;
	btn_sell: cc.Node;
	btn_sell_lab: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/select_item.prefab"

    onLoad () {
		this.select_item = this.node
		this.sp_img = this.select_item.getChildByName("sp_img");
		this.sp_size = this.sp_img.getChildByName("sp_size");
		this.sp_car = this.sp_img.getChildByName("sp_car");
		this.lab_name = this.select_item.getChildByName("lab_name");
		this.lab_doc1 = this.select_item.getChildByName("lab_doc1");
		this.lab_doc2 = this.select_item.getChildByName("lab_doc2");
		this.btn_stop = this.select_item.getChildByName("btn_stop");
		this.btn_stop_lab = this.btn_stop.getChildByName("btn_stop_lab");
		this.btn_sell = this.select_item.getChildByName("btn_sell");
		this.btn_sell_lab = this.btn_sell.getChildByName("btn_sell_lab");

    }
}
