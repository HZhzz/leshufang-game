const {ccclass} = cc._decorator;

@ccclass
export default class auto_login extends cc.Component {
	Canvas: cc.Node;
	login: cc.Node;
	userinfo_node: cc.Node;
	lab_weclcome: cc.Node;
	xy: cc.Node;
	Background: cc.Node;
	checkmark: cc.Node;
	lab1: cc.Node;
	lab2: cc.Node;
	lab3: cc.Node;
	lab4: cc.Node;
	btn_phone: cc.Node;
	labwx22: cc.Node;
	registNode: cc.Node;
	label_1: cc.Node;
	btn_register: cc.Node;
	labelNode: cc.Node;
	btn_wx: cc.Node;
	labwx2: cc.Node;
	logo: cc.Node;
	Hotupdate: cc.Node;
	bg: cc.Node;
	ProgressBar: cc.Node;
	bar: cc.Node;
	progresstip: cc.Node;
	label_tip: cc.Node;
	update_tip_start: cc.Node;
	tip_frame: cc.Node;
	tip_updatetip: cc.Node;
	tishi: cc.Node;
	btn_confirm: cc.Node;
	btn_cancel: cc.Node;
	update_tip_finish: cc.Node;
	tip_frame1: cc.Node;
	tip_updatetip1: cc.Node;
	tishi1: cc.Node;
	btn_ok: cc.Node;
	loding: cc.Node;
	model: cc.Node;
	load: cc.Node;

	public static URL:string = "db://assets/scene/login.fire"

    onLoad () {
		let parent = this.node.getParent();
		this.Canvas = parent.getChildByName("Canvas");
		this.login = this.Canvas.getChildByName("login");
		this.userinfo_node = this.login.getChildByName("userinfo_node");
		this.lab_weclcome = this.userinfo_node.getChildByName("lab_weclcome");
		this.xy = this.login.getChildByName("xy");
		this.Background = this.xy.getChildByName("Background");
		this.checkmark = this.xy.getChildByName("checkmark");
		this.lab1 = this.xy.getChildByName("lab1");
		this.lab2 = this.xy.getChildByName("lab2");
		this.lab3 = this.xy.getChildByName("lab3");
		this.lab4 = this.xy.getChildByName("lab4");
		this.btn_phone = this.login.getChildByName("btn_phone");
		this.labwx22 = this.btn_phone.getChildByName("labwx22");
		this.registNode = this.login.getChildByName("registNode");
		this.label_1 = this.registNode.getChildByName("label_1");
		this.btn_register = this.registNode.getChildByName("btn_register");
		this.labelNode = this.login.getChildByName("labelNode");
		this.btn_wx = this.login.getChildByName("btn_wx");
		this.labwx2 = this.btn_wx.getChildByName("labwx2");
		this.logo = this.login.getChildByName("logo");
		this.Hotupdate = this.Canvas.getChildByName("Hotupdate");
		this.bg = this.Hotupdate.getChildByName("bg");
		this.ProgressBar = this.Hotupdate.getChildByName("ProgressBar");
		this.bar = this.ProgressBar.getChildByName("bar");
		this.progresstip = this.ProgressBar.getChildByName("progresstip");
		this.label_tip = this.Hotupdate.getChildByName("label_tip");
		this.update_tip_start = this.Hotupdate.getChildByName("update_tip_start");
		this.tip_frame = this.update_tip_start.getChildByName("tip_frame");
		this.tip_updatetip = this.update_tip_start.getChildByName("tip_updatetip");
		this.tishi = this.update_tip_start.getChildByName("tishi");
		this.btn_confirm = this.update_tip_start.getChildByName("btn_confirm");
		this.btn_cancel = this.update_tip_start.getChildByName("btn_cancel");
		this.update_tip_finish = this.Hotupdate.getChildByName("update_tip_finish");
		this.tip_frame1 = this.update_tip_finish.getChildByName("tip_frame1");
		this.tip_updatetip1 = this.update_tip_finish.getChildByName("tip_updatetip1");
		this.tishi1 = this.update_tip_finish.getChildByName("tishi1");
		this.btn_ok = this.update_tip_finish.getChildByName("btn_ok");
		this.loding = parent.getChildByName("loding");
		this.model = this.loding.getChildByName("model");
		this.load = this.loding.getChildByName("load");

    }
}
