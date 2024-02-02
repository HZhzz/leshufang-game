const {ccclass} = cc._decorator;

@ccclass
export default class auto_Hotupdate extends cc.Component {
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

	public static URL:string = "db://assets/resources/prefab/hotupdate/Hotupdate.prefab"

    onLoad () {
		this.Hotupdate = this.node
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

    }
}
