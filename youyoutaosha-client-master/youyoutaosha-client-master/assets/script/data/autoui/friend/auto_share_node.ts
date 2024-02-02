const {ccclass} = cc._decorator;

@ccclass
export default class auto_share_node extends cc.Component {
	share_node: cc.Node;
	bacn: cc.Node;
	img_share1: cc.Node;
	img_ewm1: cc.Node;
	lab_sm1: cc.Node;
	img_info1: cc.Node;
	img_share1_kuang: cc.Node;
	lab_wan1: cc.Node;
	cover: cc.Node;
	img_face1: cc.Node;
	cover22: cc.Node;
	lab_name1: cc.Node;
	cover223: cc.Node;
	ewm_node1: cc.Node;
	bg: cc.Node;
	bg_down: cc.Node;
	title: cc.Node;
	btn_wx: cc.Node;
	icon_wx: cc.Node;
	wx_tilt: cc.Node;
	btn_pyq: cc.Node;
	icon_wx2: cc.Node;
	pyq_tit: cc.Node;
	btn_bd: cc.Node;
	icon_wx3: cc.Node;
	bc_tit: cc.Node;
	btn_close: cc.Node;
	img_share: cc.Node;
	cover1: cc.Node;
	img_face: cc.Node;
	cover222: cc.Node;
	lab_name: cc.Node;
	cover2233: cc.Node;
	ewm_node: cc.Node;
	cover2224: cc.Node;
	lab_name2: cc.Node;
	img_share_size: cc.Node;

	public static URL:string = "db://assets/resources/prefab/friend/share_node.prefab"

    onLoad () {
		this.share_node = this.node
		this.bacn = this.share_node.getChildByName("bacn");
		this.img_share1 = this.share_node.getChildByName("img_share1");
		this.img_ewm1 = this.img_share1.getChildByName("img_ewm1");
		this.lab_sm1 = this.img_ewm1.getChildByName("lab_sm1");
		this.img_info1 = this.img_share1.getChildByName("img_info1");
		this.img_share1_kuang = this.img_info1.getChildByName("img_share1_kuang");
		this.lab_wan1 = this.img_info1.getChildByName("lab_wan1");
		this.cover = this.img_share1.getChildByName("cover");
		this.img_face1 = this.cover.getChildByName("img_face1");
		this.cover22 = this.img_share1.getChildByName("cover22");
		this.lab_name1 = this.cover22.getChildByName("lab_name1");
		this.cover223 = this.img_share1.getChildByName("cover223");
		this.ewm_node1 = this.cover223.getChildByName("ewm_node1");
		this.bg = this.share_node.getChildByName("bg");
		this.bg_down = this.share_node.getChildByName("bg_down");
		this.title = this.bg_down.getChildByName("title");
		this.btn_wx = this.bg_down.getChildByName("btn_wx");
		this.icon_wx = this.btn_wx.getChildByName("icon_wx");
		this.wx_tilt = this.btn_wx.getChildByName("wx_tilt");
		this.btn_pyq = this.bg_down.getChildByName("btn_pyq");
		this.icon_wx2 = this.btn_pyq.getChildByName("icon_wx2");
		this.pyq_tit = this.btn_pyq.getChildByName("pyq_tit");
		this.btn_bd = this.bg_down.getChildByName("btn_bd");
		this.icon_wx3 = this.btn_bd.getChildByName("icon_wx3");
		this.bc_tit = this.btn_bd.getChildByName("bc_tit");
		this.btn_close = this.bg_down.getChildByName("btn_close");
		this.img_share = this.share_node.getChildByName("img_share");
		this.cover1 = this.img_share.getChildByName("cover1");
		this.img_face = this.cover1.getChildByName("img_face");
		this.cover222 = this.img_share.getChildByName("cover222");
		this.lab_name = this.cover222.getChildByName("lab_name");
		this.cover2233 = this.img_share.getChildByName("cover2233");
		this.ewm_node = this.cover2233.getChildByName("ewm_node");
		this.cover2224 = this.img_share.getChildByName("cover2224");
		this.lab_name2 = this.cover2224.getChildByName("lab_name2");
		this.img_share_size = this.share_node.getChildByName("img_share_size");

    }
}
