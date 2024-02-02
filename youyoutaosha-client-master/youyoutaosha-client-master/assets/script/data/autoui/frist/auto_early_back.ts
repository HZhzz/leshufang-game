const {ccclass} = cc._decorator;

@ccclass
export default class auto_early_back extends cc.Component {
	early_back: cc.Node;
	btn_back: cc.Node;
	bg: cc.Node;
	bg2: cc.Node;
	bg3: cc.Node;
	btn_open: cc.Node;
	lab_btn_title: cc.Node;
	icon_down_arrow: cc.Node;
	btn_close: cc.Node;
	lab_tqjs: cc.Node;
	lab_back_title: cc.Node;
	btn_vip: cc.Node;
	lab_back_time: cc.Node;
	lab_ask_title: cc.Node;
	line1: cc.Node;
	line2: cc.Node;
	lab_ask_content: cc.Node;
	layout: cc.Node;
	lab_asked0: cc.Node;
	lab_asked: cc.Node;
	lab_asked2: cc.Node;
	friend_item1: cc.Node;
	bg1: cc.Node;
	mask1: cc.Node;
	bg21: cc.Node;
	img_face1: cc.Node;
	friend_item2: cc.Node;
	bg2222: cc.Node;
	mask2: cc.Node;
	bg22: cc.Node;
	img_face2: cc.Node;
	friend_item3: cc.Node;
	bg33333: cc.Node;
	mask3: cc.Node;
	bg23: cc.Node;
	img_face3: cc.Node;
	friend_item4: cc.Node;
	bg4: cc.Node;
	mask4: cc.Node;
	bg24: cc.Node;
	img_face4: cc.Node;
	friend_item5: cc.Node;
	bg5: cc.Node;
	mask55: cc.Node;
	bg25: cc.Node;
	img_face5: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/early_back.prefab"

    onLoad () {
		this.early_back = this.node
		this.btn_back = this.early_back.getChildByName("btn_back");
		this.bg = this.early_back.getChildByName("bg");
		this.bg2 = this.bg.getChildByName("bg2");
		this.bg3 = this.bg.getChildByName("bg3");
		this.btn_open = this.bg.getChildByName("btn_open");
		this.lab_btn_title = this.btn_open.getChildByName("lab_btn_title");
		this.icon_down_arrow = this.btn_open.getChildByName("icon_down_arrow");
		this.btn_close = this.bg.getChildByName("btn_close");
		this.lab_tqjs = this.bg.getChildByName("lab_tqjs");
		this.lab_back_title = this.bg.getChildByName("lab_back_title");
		this.btn_vip = this.bg.getChildByName("btn_vip");
		this.lab_back_time = this.bg.getChildByName("lab_back_time");
		this.lab_ask_title = this.bg.getChildByName("lab_ask_title");
		this.line1 = this.lab_ask_title.getChildByName("line1");
		this.line2 = this.lab_ask_title.getChildByName("line2");
		this.lab_ask_content = this.bg.getChildByName("lab_ask_content");
		this.layout = this.bg.getChildByName("layout");
		this.lab_asked0 = this.layout.getChildByName("lab_asked0");
		this.lab_asked = this.layout.getChildByName("lab_asked");
		this.lab_asked2 = this.layout.getChildByName("lab_asked2");
		this.friend_item1 = this.bg.getChildByName("friend_item1");
		this.bg1 = this.friend_item1.getChildByName("bg1");
		this.mask1 = this.friend_item1.getChildByName("mask1");
		this.bg21 = this.mask1.getChildByName("bg21");
		this.img_face1 = this.mask1.getChildByName("img_face1");
		this.friend_item2 = this.bg.getChildByName("friend_item2");
		this.bg2222 = this.friend_item2.getChildByName("bg2222");
		this.mask2 = this.friend_item2.getChildByName("mask2");
		this.bg22 = this.mask2.getChildByName("bg22");
		this.img_face2 = this.mask2.getChildByName("img_face2");
		this.friend_item3 = this.bg.getChildByName("friend_item3");
		this.bg33333 = this.friend_item3.getChildByName("bg33333");
		this.mask3 = this.friend_item3.getChildByName("mask3");
		this.bg23 = this.mask3.getChildByName("bg23");
		this.img_face3 = this.mask3.getChildByName("img_face3");
		this.friend_item4 = this.bg.getChildByName("friend_item4");
		this.bg4 = this.friend_item4.getChildByName("bg4");
		this.mask4 = this.friend_item4.getChildByName("mask4");
		this.bg24 = this.mask4.getChildByName("bg24");
		this.img_face4 = this.mask4.getChildByName("img_face4");
		this.friend_item5 = this.bg.getChildByName("friend_item5");
		this.bg5 = this.friend_item5.getChildByName("bg5");
		this.mask55 = this.friend_item5.getChildByName("mask55");
		this.bg25 = this.mask55.getChildByName("bg25");
		this.img_face5 = this.mask55.getChildByName("img_face5");

    }
}
