const {ccclass} = cc._decorator;

@ccclass
export default class auto_withdrawal_record_item extends cc.Component {
	withdrawal_record_item: cc.Node;
	iname: cc.Node;
	time: cc.Node;
	money: cc.Node;
	line: cc.Node;

	public static URL:string = "db://assets/resources/prefab/mine/withdrawal_record_item.prefab"

    onLoad () {
		this.withdrawal_record_item = this.node
		this.iname = this.withdrawal_record_item.getChildByName("iname");
		this.time = this.withdrawal_record_item.getChildByName("time");
		this.money = this.withdrawal_record_item.getChildByName("money");
		this.line = this.withdrawal_record_item.getChildByName("line");

    }
}
