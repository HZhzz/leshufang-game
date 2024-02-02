
// import { _decorator, Component, TextAsset } from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollViewText extends cc.Component {
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;
    @property(cc.Label)
    contentLabel: cc.Label = null;
    @property
    segmentSize: number = 100;
    @property(cc.TextAsset)
    itemGiftText: cc.TextAsset = null!;

    private content: string = '';
    private segments: Array<string> = [];
    private loadedSegments: number = 0;

    onLoad() {
        this.content = '';
       
        cc.loader.loadRes('data/ys', (err, data:cc.TextAsset) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            console.log(data);
            this.content = data.text;
            console.log(this.content);

            // 处理txtContent
            let segs = [];
            // for (let i = 0; i < this.content.length; i += this.segmentSize) {
            //     let seg = this.content.substr(i, this.segmentSize);
            //     segs.push(seg);
            // }
            segs.push(this.content.split("\n"));
            this.segments = segs;
            this.loadSegment(0);

        });

        // let segs = [];
        // const data: string = this.itemGiftText.text!;
        // segs.push(data.split("\n"));
        // console.log(segs);
        
        // this.segments = segs;
        // this.loadSegment(0);



    }

    private loadSegment(index: number) {
        let segment = this.segments[index];
        setTimeout(() => {
            // 将异步加载的段落添加到 Label 中
            // this.contentLabel.string += segment + '\n';
            this.loadedSegments++;
            if (this.loadedSegments < this.segments.length) {
                // 如果还有未加载的段落，继续加载
                this.loadSegment(this.loadedSegments);
            }
        }, 100);
    }
}
