const {ccclass} = cc._decorator;

@ccclass
export default class auto_invite_list_item extends cc.Component {
	invite_list_item: cc.Node;
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

	public static URL:string = "db://assets/resources/prefab/friend/invite_list_item.prefab"

    onLoad () {
		this.invite_list_item = this.node
		this.mask = this.invite_list_item.getChildByName("mask");
		this.guangquan = this.mask.getChildByName("guangquan");
		this.sp_face_kuang = this.invite_list_item.getChildByName("sp_face_kuang");
		this.sp_face = this.sp_face_kuang.getChildByName("sp_face");
		this.layout = this.invite_list_item.getChildByName("layout");
		this.lab_name = this.layout.getChildByName("lab_name");
		this.img_vip = this.layout.getChildByName("img_vip");
		this.lab_vip = this.img_vip.getChildByName("lab_vip");
		this.lab_time = this.invite_list_item.getChildByName("lab_time");
		this.lab_level = this.invite_list_item.getChildByName("lab_level");
		this.vip = this.invite_list_item.getChildByName("vip");
		this.img_super = this.vip.getChildByName("img_super");
		this.lab_super = this.img_super.getChildByName("lab_super");

    }
}
