const {ccclass} = cc._decorator;

@ccclass
export default class auto_loading extends cc.Component {
	loading: cc.Node;
	model: cc.Node;
	load: cc.Node;

	public static URL:string = "db://assets/resources/prefab/loading/loading.prefab"

    onLoad () {
		this.loading = this.node
		this.model = this.loading.getChildByName("model");
		this.load = this.loading.getChildByName("load");

    }
}
