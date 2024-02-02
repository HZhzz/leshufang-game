const {ccclass} = cc._decorator;

@ccclass
export default class auto_pay_node extends cc.Component {
	pay_node: cc.Node;
	btn_close: cc.Node;
	bg1: cc.Node;
	ToggleContainer: cc.Node;
	wx: cc.Node;
	Background1: cc.Node;
	checkmark1: cc.Node;
	icon_wx: cc.Node;
	wx_title: cc.Node;
	zfb: cc.Node;
	Background2: cc.Node;
	checkmark2: cc.Node;
	icon_zfb: cc.Node;
	zfb_title: cc.Node;
	btn_anniu: cc.Node;
	pay: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/pay_node.prefab"

    onLoad () {
		this.pay_node = this.node
		this.btn_close = this.pay_node.getChildByName("btn_close");
		this.bg1 = this.pay_node.getChildByName("bg1");
		this.ToggleContainer = this.bg1.getChildByName("ToggleContainer");
		this.wx = this.ToggleContainer.getChildByName("wx");
		this.Background1 = this.wx.getChildByName("Background1");
		this.checkmark1 = this.wx.getChildByName("checkmark1");
		this.icon_wx = this.wx.getChildByName("icon_wx");
		this.wx_title = this.icon_wx.getChildByName("wx_title");
		this.zfb = this.ToggleContainer.getChildByName("zfb");
		this.Background2 = this.zfb.getChildByName("Background2");
		this.checkmark2 = this.zfb.getChildByName("checkmark2");
		this.icon_zfb = this.zfb.getChildByName("icon_zfb");
		this.zfb_title = this.icon_zfb.getChildByName("zfb_title");
		this.btn_anniu = this.bg1.getChildByName("btn_anniu");
		this.pay = this.btn_anniu.getChildByName("pay");

    }
}
