const {ccclass} = cc._decorator;

@ccclass
export default class auto_ticket_draw_item extends cc.Component {
	ticket_draw_item: cc.Node;
	bg: cc.Node;
	headImg: cc.Node;
	maskbg1: cc.Node;
	mask2: cc.Node;
	maskbg2: cc.Node;
	sp_face: cc.Node;
	lab_name: cc.Node;
	layout: cc.Node;
	icon_d_1: cc.Node;
	lab_doudou: cc.Node;

	public static URL:string = "db://assets/resources/prefab/ticket/ticket_draw_item.prefab"

    onLoad () {
		this.ticket_draw_item = this.node
		this.bg = this.ticket_draw_item.getChildByName("bg");
		this.headImg = this.ticket_draw_item.getChildByName("headImg");
		this.maskbg1 = this.headImg.getChildByName("maskbg1");
		this.mask2 = this.headImg.getChildByName("mask2");
		this.maskbg2 = this.mask2.getChildByName("maskbg2");
		this.sp_face = this.mask2.getChildByName("sp_face");
		this.lab_name = this.ticket_draw_item.getChildByName("lab_name");
		this.layout = this.ticket_draw_item.getChildByName("layout");
		this.icon_d_1 = this.layout.getChildByName("icon_d_1");
		this.lab_doudou = this.layout.getChildByName("lab_doudou");

    }
}
