const {ccclass} = cc._decorator;

@ccclass
export default class auto_ali extends cc.Component {
	ali: cc.Node;
	btn_close: cc.Node;
	lab_st: cc.Node;
	icon_zfb: cc.Node;
	ali_title1: cc.Node;
	ali_title2: cc.Node;
	btn_real: cc.Node;
	lab_real: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/ali.prefab"

    onLoad () {
		this.ali = this.node
		this.btn_close = this.ali.getChildByName("btn_close");
		this.lab_st = this.btn_close.getChildByName("lab_st");
		this.icon_zfb = this.ali.getChildByName("icon_zfb");
		this.ali_title1 = this.ali.getChildByName("ali_title1");
		this.ali_title2 = this.ali.getChildByName("ali_title2");
		this.btn_real = this.ali.getChildByName("btn_real");
		this.lab_real = this.btn_real.getChildByName("lab_real");

    }
}
