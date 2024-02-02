const {ccclass} = cc._decorator;

@ccclass
export default class auto_sign_node extends cc.Component {
	sign_node: cc.Node;
	btn_back: cc.Node;
	btn_close1: cc.Node;
	sing_back: cc.Node;
	img_biaoti: cc.Node;
	lab_name: cc.Node;
	sing_1: cc.Node;
	lab_1: cc.Node;
	lab_1_num: cc.Node;
	check_1: cc.Node;
	sing_2: cc.Node;
	lab_2: cc.Node;
	lab_2_num: cc.Node;
	check_2: cc.Node;
	sing_3: cc.Node;
	lab_3: cc.Node;
	lab_3_num: cc.Node;
	check_3: cc.Node;
	sing_4: cc.Node;
	lab_4: cc.Node;
	lab_4_num: cc.Node;
	check_4: cc.Node;
	sing_5: cc.Node;
	lab_5: cc.Node;
	lab_5_num: cc.Node;
	check_5: cc.Node;
	sing_6: cc.Node;
	lab_6: cc.Node;
	lab_6_num: cc.Node;
	check_6: cc.Node;
	sing_7: cc.Node;
	lab_7: cc.Node;
	lab_7_num: cc.Node;
	check_7: cc.Node;
	btn_sign: cc.Node;
	btn_sign_lab: cc.Node;
	btn_close: cc.Node;
	biaoti: cc.Node;
	hh: cc.Node;
	lab_y_1: cc.Node;
	lab_y_2: cc.Node;
	lab_now_num: cc.Node;
	lab_content: cc.Node;
	RICHTEXT_CHILD: cc.PrivateNode;
	img_rili: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/sign_node.prefab"

    onLoad () {
		this.sign_node = this.node
		this.btn_back = this.sign_node.getChildByName("btn_back");
		this.btn_close1 = this.sign_node.getChildByName("btn_close1");
		this.sing_back = this.sign_node.getChildByName("sing_back");
		this.img_biaoti = this.sing_back.getChildByName("img_biaoti");
		this.lab_name = this.sing_back.getChildByName("lab_name");
		this.sing_1 = this.sing_back.getChildByName("sing_1");
		this.lab_1 = this.sing_1.getChildByName("lab_1");
		this.lab_1_num = this.sing_1.getChildByName("lab_1_num");
		this.check_1 = this.sing_1.getChildByName("check_1");
		this.sing_2 = this.sing_back.getChildByName("sing_2");
		this.lab_2 = this.sing_2.getChildByName("lab_2");
		this.lab_2_num = this.sing_2.getChildByName("lab_2_num");
		this.check_2 = this.sing_2.getChildByName("check_2");
		this.sing_3 = this.sing_back.getChildByName("sing_3");
		this.lab_3 = this.sing_3.getChildByName("lab_3");
		this.lab_3_num = this.sing_3.getChildByName("lab_3_num");
		this.check_3 = this.sing_3.getChildByName("check_3");
		this.sing_4 = this.sing_back.getChildByName("sing_4");
		this.lab_4 = this.sing_4.getChildByName("lab_4");
		this.lab_4_num = this.sing_4.getChildByName("lab_4_num");
		this.check_4 = this.sing_4.getChildByName("check_4");
		this.sing_5 = this.sing_back.getChildByName("sing_5");
		this.lab_5 = this.sing_5.getChildByName("lab_5");
		this.lab_5_num = this.sing_5.getChildByName("lab_5_num");
		this.check_5 = this.sing_5.getChildByName("check_5");
		this.sing_6 = this.sing_back.getChildByName("sing_6");
		this.lab_6 = this.sing_6.getChildByName("lab_6");
		this.lab_6_num = this.sing_6.getChildByName("lab_6_num");
		this.check_6 = this.sing_6.getChildByName("check_6");
		this.sing_7 = this.sing_back.getChildByName("sing_7");
		this.lab_7 = this.sing_7.getChildByName("lab_7");
		this.lab_7_num = this.sing_7.getChildByName("lab_7_num");
		this.check_7 = this.sing_7.getChildByName("check_7");
		this.btn_sign = this.sing_back.getChildByName("btn_sign");
		this.btn_sign_lab = this.btn_sign.getChildByName("btn_sign_lab");
		this.btn_close = this.sing_back.getChildByName("btn_close");
		this.biaoti = this.sing_back.getChildByName("biaoti");
		this.hh = this.sing_back.getChildByName("hh");
		this.lab_y_1 = this.hh.getChildByName("lab_y_1");
		this.lab_y_2 = this.hh.getChildByName("lab_y_2");
		this.lab_now_num = this.hh.getChildByName("lab_now_num");
		this.lab_content = this.hh.getChildByName("lab_content");
		this.RICHTEXT_CHILD = this.lab_content.getChildByName("RICHTEXT_CHILD");
		this.img_rili = this.hh.getChildByName("img_rili");

    }
}
