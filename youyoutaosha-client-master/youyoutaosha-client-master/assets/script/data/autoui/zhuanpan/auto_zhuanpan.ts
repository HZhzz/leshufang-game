const {ccclass} = cc._decorator;

@ccclass
export default class auto_zhuanpan extends cc.Component {
	zhuanpan: cc.Node;
	ct: cc.Node;
	img_zp: cc.Node;
	zp: cc.Node;
	img01: cc.Node;
	img02: cc.Node;
	img03: cc.Node;
	img04: cc.Node;
	img05: cc.Node;
	img06: cc.Node;
	img07: cc.Node;
	img08: cc.Node;
	zp1: cc.Node;
	btn_zhuanpan: cc.Node;
	btn_huifu: cc.Node;
	lab_huifu: cc.Node;
	btn_look: cc.Node;
	icon_down_arrow: cc.Node;
	icon_down_arrow_1: cc.Node;
	lab_times: cc.Node;
	btn_close: cc.Node;

	public static URL:string = "db://assets/resources/prefab/zhuanpan/zhuanpan.prefab"

    onLoad () {
		this.zhuanpan = this.node
		this.ct = this.zhuanpan.getChildByName("ct");
		this.img_zp = this.zhuanpan.getChildByName("img_zp");
		this.zp = this.img_zp.getChildByName("zp");
		this.img01 = this.zp.getChildByName("img01");
		this.img02 = this.zp.getChildByName("img02");
		this.img03 = this.zp.getChildByName("img03");
		this.img04 = this.zp.getChildByName("img04");
		this.img05 = this.zp.getChildByName("img05");
		this.img06 = this.zp.getChildByName("img06");
		this.img07 = this.zp.getChildByName("img07");
		this.img08 = this.zp.getChildByName("img08");
		this.zp1 = this.img_zp.getChildByName("zp1");
		this.btn_zhuanpan = this.img_zp.getChildByName("btn_zhuanpan");
		this.btn_huifu = this.img_zp.getChildByName("btn_huifu");
		this.lab_huifu = this.btn_huifu.getChildByName("lab_huifu");
		this.btn_look = this.img_zp.getChildByName("btn_look");
		this.icon_down_arrow = this.btn_look.getChildByName("icon_down_arrow");
		this.icon_down_arrow_1 = this.btn_look.getChildByName("icon_down_arrow_1");
		this.lab_times = this.img_zp.getChildByName("lab_times");
		this.btn_close = this.img_zp.getChildByName("btn_close");

    }
}
