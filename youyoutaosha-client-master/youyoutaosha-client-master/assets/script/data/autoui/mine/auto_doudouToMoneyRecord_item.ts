const {ccclass} = cc._decorator;

@ccclass
export default class auto_doudouToMoneyRecord_item extends cc.Component {
	doudouToMoneyRecord_item: cc.Node;
	bg: cc.Node;
	lab_date: cc.Node;
	lab_dou: cc.Node;
	img_dou: cc.Node;
	lab_money: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/doudouToMoneyRecord_item.prefab"

    onLoad () {
		this.doudouToMoneyRecord_item = this.node
		this.bg = this.doudouToMoneyRecord_item.getChildByName("bg");
		this.lab_date = this.doudouToMoneyRecord_item.getChildByName("lab_date");
		this.lab_dou = this.doudouToMoneyRecord_item.getChildByName("lab_dou");
		this.img_dou = this.doudouToMoneyRecord_item.getChildByName("img_dou");
		this.lab_money = this.doudouToMoneyRecord_item.getChildByName("lab_money");

    }
}
