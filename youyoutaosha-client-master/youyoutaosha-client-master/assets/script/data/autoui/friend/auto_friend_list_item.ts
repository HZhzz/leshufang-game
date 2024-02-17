
const {ccclass} = cc._decorator;

@ccclass
export default class auto_friend_list_item extends cc.Component {
	friend_list_item: cc.Node;
	mask: cc.Node;
	guangquan: cc.Node;
	sp_face_kuang: cc.Node;
	sp_face: cc.Node;
	layout: cc.Node;
	lab_name: cc.Node;
	img_vip: cc.Node;
	lab_vip: cc.Node;
	lab_time: cc.Node;
	lab_level: cc.Node;
	vip: cc.Node;
	img_super: cc.Node;
	lab_super: cc.Node;
    leave_layout:cc.Node;
    leave:cc.Node;
    tu:cc.Node;
    shui:cc.Node;
    jin:cc.Node;
    huo:cc.Node;
    mu:cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/friend_list_item.prefab"

    onLoad () {
		this.friend_list_item = this.node
		this.mask = this.friend_list_item.getChildByName("mask");
		this.guangquan = this.mask.getChildByName("guangquan");
		this.sp_face_kuang = this.friend_list_item.getChildByName("sp_face_kuang");
		this.sp_face = this.sp_face_kuang.getChildByName("sp_face");
		this.layout = this.friend_list_item.getChildByName("layout");
		this.lab_name = this.layout.getChildByName("lab_name");
		this.img_vip = this.layout.getChildByName("img_vip");
		this.lab_vip = this.img_vip.getChildByName("lab_vip");
		this.lab_time = this.friend_list_item.getChildByName("lab_time");
		this.lab_level = this.friend_list_item.getChildByName("lab_level");
		this.vip = this.friend_list_item.getChildByName("vip");
		this.img_super = this.vip.getChildByName("img_super");
		this.lab_super = this.img_super.getChildByName("lab_super");
        this.leave_layout = this.friend_list_item.getChildByName('leave_layout');
        this.leave = this.leave_layout.getChildByName('leave');
        this.tu = this.leave.getChildByName('tu');
		this.shui = this.leave.getChildByName('shui');
		this.jin = this.leave.getChildByName('jin');
		this.huo = this.leave.getChildByName('huo');
		this.mu = this.leave.getChildByName('mu');

    }
}
