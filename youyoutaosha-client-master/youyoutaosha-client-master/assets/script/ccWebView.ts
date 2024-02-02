const { ccclass, property } = cc._decorator;

@ccclass
export default class WebView extends cc.Component {

    @property({ type: cc.WebView })
    webView: cc.WebView = null;

    public setItem(url: string) {
        this.webView.url = url;
        this.node.active = true;
    }

    protected onClickClose() {
        this.webView.url = "";
        this.node.active = false;
    }

}
