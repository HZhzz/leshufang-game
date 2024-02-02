const {ccclass} = cc._decorator;

@ccclass
export default class auto_down_node extends cc.Component {
	down_node: cc.Node;
	ToggleContainer: cc.Node;
	toggle1: cc.Node;
	Background1: cc.Node;
	lab_1_q: cc.Node;
	checkmark1: cc.Node;
	lab_1_s: cc.Node;
	toggle2: cc.Node;
	Background2: cc.Node;
	lab_2_q: cc.Node;
	checkmark2: cc.Node;
	lab_2_s: cc.Node;
	toggle3: cc.Node;
	Background3: cc.Node;
	checkmark3: cc.Node;
	toggle4: cc.Node;
	Background4: cc.Node;
	lab_4_q: cc.Node;
	checkmark4: cc.Node;
	lab_4_s: cc.Node;
	toggle5: cc.Node;
	Background5: cc.Node;
	lab_5_q: cc.Node;
	checkmark5: cc.Node;
	lab_5_s: cc.Node;

	public static URL:string = "db://assets/resources/prefab/frist/down_node.prefab"

    onLoad () {
		this.down_node = this.node
		this.ToggleContainer = this.down_node.getChildByName("ToggleContainer");
		this.toggle1 = this.ToggleContainer.getChildByName("toggle1");
		this.Background1 = this.toggle1.getChildByName("Background1");
		this.lab_1_q = this.toggle1.getChildByName("lab_1_q");
		this.checkmark1 = this.toggle1.getChildByName("checkmark1");
		this.lab_1_s = this.checkmark1.getChildByName("lab_1_s");
		this.toggle2 = this.ToggleContainer.getChildByName("toggle2");
		this.Background2 = this.toggle2.getChildByName("Background2");
		this.lab_2_q = this.toggle2.getChildByName("lab_2_q");
		this.checkmark2 = this.toggle2.getChildByName("checkmark2");
		this.lab_2_s = this.checkmark2.getChildByName("lab_2_s");
		this.toggle3 = this.ToggleContainer.getChildByName("toggle3");
		this.Background3 = this.toggle3.getChildByName("Background3");
		this.checkmark3 = this.toggle3.getChildByName("checkmark3");
		this.toggle4 = this.ToggleContainer.getChildByName("toggle4");
		this.Background4 = this.toggle4.getChildByName("Background4");
		this.lab_4_q = this.toggle4.getChildByName("lab_4_q");
		this.checkmark4 = this.toggle4.getChildByName("checkmark4");
		this.lab_4_s = this.checkmark4.getChildByName("lab_4_s");
		this.toggle5 = this.ToggleContainer.getChildByName("toggle5");
		this.Background5 = this.toggle5.getChildByName("Background5");
		this.lab_5_q = this.toggle5.getChildByName("lab_5_q");
		this.checkmark5 = this.toggle5.getChildByName("checkmark5");
		this.lab_5_s = this.checkmark5.getChildByName("lab_5_s");

    }
}
