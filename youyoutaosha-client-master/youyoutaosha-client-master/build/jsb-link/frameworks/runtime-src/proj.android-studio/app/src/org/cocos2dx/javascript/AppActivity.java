package org.cocos2dx.javascript;

import static cn.leshufang.cocos.wxapi.WechatShareManager.bmpToByteArray;
import static cn.leshufang.cocos.wxapi.WechatShareManager.buildTransaction;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.Bundle;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Looper;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.bytedance.sdk.openadsdk.AdSlot;
import com.bytedance.sdk.openadsdk.TTAdConstant;
import com.bytedance.sdk.openadsdk.TTAdLoadType;
import com.bytedance.sdk.openadsdk.TTAdManager;
import com.bytedance.sdk.openadsdk.TTAdNative;
import com.bytedance.sdk.openadsdk.TTAppDownloadListener;
import com.bytedance.sdk.openadsdk.TTNativeExpressAd;
import com.bytedance.sdk.openadsdk.TTRewardVideoAd;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import java.io.File;
import java.util.List;

import cn.leshufang.cocos.R;


public class AppActivity extends Cocos2dxActivity {
    private static Context context = null;
    public static AppActivity app = null;
    public static RelativeLayout mExpressContainer;
    public static TTAdNative mTTAdNative;
    public static TTRewardVideoAd mttRewardVideoAd;
    public static TTAdManager ttAdManager = TTAdManagerHolder.get();
    public static TTNativeExpressAd mTTBanner;
    public static TTAdNative mTTInsertAdNative;
    private long startTime = 0;
    public static IWXAPI mWXapi;
    private boolean mIsLoaded = false; //视频是否加载完成
    public static String WX_APPID = "wx68e9f4db7e8baa53";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Workaround in
        // https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            // so just quietly finish and go away, dropping the user back into the activity
            // at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        if (Build.VERSION.SDK_INT >= 28) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            WindowManager.LayoutParams lp = getWindow().getAttributes();
            lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().setAttributes(lp);
        }
        app = this;
        // DO OTHER INITIALIZATION BELOW

        //修改广告弹两次
        app.registerToWX(WX_APPID);
        DeviceModule.setContext(this);
//        PermissionModule.setContext(this);
        AliModule.setContext(this);
//        creatrView();
        chuanShanJiaInitBanner();
//        loadSplash();  // 申请，修改广告弹两次
//        TTAdManagerHolder.get().requestPermissionIfNecessary(this);
    }

    public void creatrView() {
        //原生的view直接添加到cocos的view内
        //R代表你是哪个包名的R文件，然后把创建好的view嵌入在你的cocosview里，不要使用setContentView(R.layout.activity_native_express);创建view
        View layout = LayoutInflater.from(this).inflate(R.layout.activity_native_express, null);
        mFrameLayout.addView(layout);
        mExpressContainer = (RelativeLayout) findViewById(R.id.express_container);
        getGLSurfaceView().getHolder().setFormat(PixelFormat.TRANSLUCENT);
    }

    //初始化banner广告
    public void chuanShanJiaInitBanner() {
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
        //step2:创建TTAdNative对象,用于调用广告请求接口，createAdNative(Context context) 插屏广告context需要传入Activity对象
        mTTAdNative = TTAdManagerHolder.get().createAdNative(getApplicationContext());
        //step3:(可选，强烈建议在合适的时机调用):申请部分权限，如read_phone_state,防止获取不了imei时候，下载类广告没有填充的问题。
        TTAdManagerHolder.get().requestPermissionIfNecessary(this);
    }

    public void loadSplash() {
        Intent intent = new Intent(app, SplashActivity.class);
        intent.putExtra("splash_rit", "888524027");
        intent.putExtra("is_express", false);
        startActivity(intent);
    }

    private boolean mHasShowDownloadActive = false;
    private boolean isJump = false;
    private static final String tag = "bug_video_ad";

    public static void loadAd(final String codeId) {
        Log.e(tag, "loadAd:"+codeId);
//        Log.e("TAG", "loadAd:======= "+codeId);
        app.isJump = false;
        //step4:创建广告请求参数AdSlot,具体参数含义参考文档
        AdSlot adSlot;
        if (mttRewardVideoAd != null) {
            Log.e(tag, "mttRewardVideoAd 对象不等于null");
            //step6:在获取到广告后展示,强烈建议在onRewardVideoCached回调后，展示广告，提升播放体验
            //该方法直接展示广告
            app.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    //step6:在获取到广告后展示
                    //该方法直接展示广告
                    app.mttRewardVideoAd.showRewardVideoAd(app);
                    //展示广告，并传入广告展示的场景
                    app.mttRewardVideoAd = null;

                }
            });
        } else {
            //模板广告需要设置期望个性化模板广告的大小,单位dp,代码位是否属于个性化模板广告，请在穿山甲平台查看
            String code = "";
            int reward = 0;
            String userid = "";
            String reward_name = "";
            code = "";
            try {
                JSONObject jsonObject = new JSONObject(codeId);
                code = jsonObject.getString("adSlot");
                reward = jsonObject.getInt("reward");
                reward_name = jsonObject.getString("reward_name");
                userid = jsonObject.getString("userid");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            adSlot = new AdSlot.Builder()
                    .setCodeId(code)
                    .setUserID(userid)
                    .setAdLoadType(TTAdLoadType.LOAD)
                    .setImageAcceptedSize(1080, 1920)
                    .setOrientation(TTAdConstant.VERTICAL) //必填参数，期望视频的播放方向：TTAdConstant.HORIZONTAL 或 TTAdConstant.VERTICAL
                    .build();
            //step5:请求广告
            Log.e(tag, "开始请求广告");
            mTTAdNative.loadRewardVideoAd(adSlot, new TTAdNative.RewardVideoAdListener() {
                @Override
                public void onError(int code, String message) {
                    Log.e("TAG", "Callback --> onError: " + code + ", " + String.valueOf(message));
//                    runJsCode("reward_onError(0)");
                    runJsCode("reward_callback(0)");
                    //TToast.show(RewardVideoActivity.this, message);
//                    Toast.makeText(this, "再按一次退出APP", Toast.LENGTH_SHORT).show();
                }

                //视频广告加载后，视频资源缓存到本地的回调，在此回调后，播放本地视频，流畅不阻塞。
                @Override
                public void onRewardVideoCached() {
                    Log.e("TAG", "Callback --> onRewardVideoCached");
                    app.mIsLoaded = true;

//                    TToast.show(RewardVideoActivity.this, "Callback --> rewardVideoAd video cached");
                }

                @Override
                public void onRewardVideoCached(TTRewardVideoAd ad) {
                    Log.e("TAG", "Callback --> onRewardVideoCached");
                    app.mIsLoaded = true;
                    showAd();
//                    TToast.show(RewardVideoActivity.this, "Callback --> rewardVideoAd video cached");
                    // ad.showRewardVideoAd(RewardVideoActivity.this, TTAdConstant.RitScenes.CUSTOMIZE_SCENES, "scenes_test");
                }
                //视频广告的素材加载完毕，比如视频url等，在此回调后，可以播放在线视频，网络不好可能出现加载缓冲，影响体验。

                @Override
                public void onRewardVideoAdLoad(TTRewardVideoAd ad) {
                    Log.e("TAG", "Callback --> onRewardVideoAdLoad");
//                    TToast.show(RewardVideoActivity.this, "rewardVideoAd loaded 广告类型：" + getAdType(ad.getRewardVideoAdType()));
                    app.mIsLoaded = false;
                    mttRewardVideoAd = ad;
                    mttRewardVideoAd.setRewardAdInteractionListener(new TTRewardVideoAd.RewardAdInteractionListener() {
                        @Override
                        public void onAdShow() {
                            Log.d("TAG", "Callback --> rewardVideoAd show");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd show");
                        }

                        @Override
                        public void onAdVideoBarClick() {
                            Log.d("TAG", "Callback --> rewardVideoAd bar click");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd bar click");
                        }

                        @Override
                        public void onAdClose() {
                            Log.d("TAG", "Callback --> rewardVideoAd close" + app.isJump);
                            if (app.isJump) {
//                                codeId
                                runJsCode("reward_callback(1)");
                            }


//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd close");
                        }

                        //视频播放完成回调
                        @Override
                        public void onVideoComplete() {
                            Log.d("TAG", "Callback --> rewardVideoAd complete");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd complete");
                        }

                        @Override
                        public void onVideoError() {
                            Log.e("TAG", "Callback --> rewardVideoAd error");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd error");
                        }

                        //视频播放完成后，奖励验证回调，rewardVerify：是否有效，rewardAmount：奖励梳理，rewardName：奖励名称
                        @Override

                        public void onRewardVerify(boolean rewardVerify, int rewardAmount, String rewardName, int errorCode, String errorMsg) {
                            String logString = "verify:" + rewardVerify + " amount:" + rewardAmount +
                                    " name:" + rewardName + " errorCode:" + errorCode + " errorMsg:" + errorMsg;
                            Log.e("TAG", "Callback --> " + logString);
                            app.isJump = rewardVerify;
//                            TToast.show(RewardVideoActivity.this, logString);
//                            JSONObject data = null;
//                            try {
////                                data = new JSONObject();
////                                data.put("rewardVerify", rewardVerify);
////                                data.put("rewardAmount", rewardAmount);
////                                data.put("rewardName", rewardName);
////                                String code = "reward_callback( '";
////                                code += data;
////                                code += "');";
////                                runJsCode(code);
//                            } catch (JSONException e) {
//                                e.printStackTrace();
//                            }
                        }

                        @Override
                        public void onRewardArrived(boolean b, int i, Bundle bundle) {

                        }

                        @Override
                        public void onSkippedVideo() {

                            Log.e("TAG", "Callback --> rewardVideoAd has onSkippedVideo");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd has onSkippedVideo");
                        }
                    });
                    Log.e(tag, "开始请求广告2");
                    mttRewardVideoAd.setRewardPlayAgainInteractionListener(new TTRewardVideoAd.RewardAdInteractionListener() {
                        @Override

                        public void onAdShow() {
                            Log.d("TAG", "Callback --> rewardPlayAgain show");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd show");
                        }

                        @Override

                        public void onAdVideoBarClick() {
                            Log.d("TAG", "Callback --> rewardPlayAgain bar click");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd bar click");
                        }

                        @Override

                        public void onAdClose() {
                            Log.d("TAG", "Callback --> rewardPlayAgain close");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd close");
                        }

                        //视频播放完成回调
                        @Override
                        public void onVideoComplete() {
                            Log.d("TAG", "Callback --> rewardPlayAgain complete");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd complete");
                        }

                        @Override
                        public void onVideoError() {
                            Log.e("TAG", "Callback --> rewardPlayAgain error");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd error");
                        }

                        //视频播放完成后，奖励验证回调，rewardVerify：是否有效，rewardAmount：奖励梳理，rewardName：奖励名称
                        @Override
                        public void onRewardVerify(boolean rewardVerify, int rewardAmount, String rewardName, int errorCode, String errorMsg) {
                            Log.e(tag, "广告完成回调");
                            String logString = "rewardPlayAgain verify:" + rewardVerify + " amount:" + rewardAmount +
                                    " name:" + rewardName + " errorCode:" + errorCode + " errorMsg:" + errorMsg;
                            Log.e("TAG", "Callback --> " + logString);
//                            TToast.show(RewardVideoActivity.this, logString);
                        }

                        @Override
                        public void onRewardArrived(boolean b, int i, Bundle bundle) {

                        }

                        @Override
                        public void onSkippedVideo() {
                            Log.e("TAG", "Callback --> rewardPlayAgain has onSkippedVideo");
//                            TToast.show(RewardVideoActivity.this, "rewardVideoAd has onSkippedVideo");
                        }
                    });
                    Log.e(tag, "开始请求广告3");
                    mttRewardVideoAd.setDownloadListener(new TTAppDownloadListener() {
                        @Override
                        public void onIdle() {
                            app.mHasShowDownloadActive = false;
                        }

                        @Override
                        public void onDownloadActive(long totalBytes, long currBytes, String fileName, String appName) {
                            Log.d("DML", "onDownloadActive==totalBytes=" + totalBytes + ",currBytes=" + currBytes + ",fileName=" + fileName + ",appName=" + appName);

                            if (!app.mHasShowDownloadActive) {
                                app.mHasShowDownloadActive = true;
//                                TToast.show(RewardVideoActivity.this, "下载中，点击下载区域暂停", Toast.LENGTH_LONG);
                            }
                        }

                        @Override
                        public void onDownloadPaused(long totalBytes, long currBytes, String fileName, String appName) {
                            Log.d("DML", "onDownloadPaused===totalBytes=" + totalBytes + ",currBytes=" + currBytes + ",fileName=" + fileName + ",appName=" + appName);
//                            TToast.show(RewardVideoActivity.this, "下载暂停，点击下载区域继续", Toast.LENGTH_LONG);
                        }

                        @Override
                        public void onDownloadFailed(long totalBytes, long currBytes, String fileName, String appName) {
                            Log.d("DML", "onDownloadFailed==totalBytes=" + totalBytes + ",currBytes=" + currBytes + ",fileName=" + fileName + ",appName=" + appName);
//                            TToast.show(RewardVideoActivity.this, "下载失败，点击下载区域重新下载", Toast.LENGTH_LONG);
                        }

                        @Override
                        public void onDownloadFinished(long totalBytes, String fileName, String appName) {
                            Log.d("DML", "onDownloadFinished==totalBytes=" + totalBytes + ",fileName=" + fileName + ",appName=" + appName);
//                            TToast.show(RewardVideoActivity.this, "下载完成，点击下载区域重新下载", Toast.LENGTH_LONG);
                        }

                        @Override
                        public void onInstalled(String fileName, String appName) {
                            Log.d("DML", "onInstalled==" + ",fileName=" + fileName + ",appName=" + appName);
//                            TToast.show(RewardVideoActivity.this, "安装完成，点击下载区域打开", Toast.LENGTH_LONG);
                        }
                    });
                }
            });
        }
    }

    static public void showAd() {
        Log.e(tag, "show ad 显示广告");
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (app.mttRewardVideoAd != null) {
                    //step6:在获取到广告后展示
                    //该方法直接展示广告
                    app.mttRewardVideoAd.showRewardVideoAd(app);
                    //展示广告，并传入广告展示的场景
                    app.mttRewardVideoAd = null;
                } else {
                    Log.e(tag, "show ad 没有广告");
                    Log.e("广告", "请先加载广告");
                }
            }
        });
    }

    public static void runJsCode(final String code) {
        Log.e("TAG", "cocosRun" + code);
        // 一定要在 GL 线程中执行
        app.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString(code);
            }
        });
    }

    public static void shengqing() {
//        PermissionModule.setContext(app);
//        TTAdManagerHolder.get().requestPermissionIfNecessary(app);

        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                TTAdManagerHolder.init(app);
                PermissionModule.setContext(app);
                app.creatrView();
                app.chuanShanJiaInitBanner();
                app.registerToWX(WX_APPID);


                app.loadSplash();
                DeviceModule.setContext(app);
                AliModule.setContext(app);
                TTAdManagerHolder.get().requestPermissionIfNecessary(app);
                Log.e("TAG", "isrun:");
            }
        });
    }

    private void registerToWX(String appid) {
//        WX_APPID = appid
        mWXapi = WXAPIFactory.createWXAPI(this, appid, false);
        mWXapi.registerApp(appid);
        Log.e("TAG", "registerToWX: " + appid);
    }

    public static void wxLogin() {
        Log.e("TAG", "wxLogin: 111111111111");
        Log.e("TAG",mWXapi.isWXAppInstalled()+"");
        if (!mWXapi.isWXAppInstalled()) {
            Looper.prepare();
            Toast showToast = Toast.makeText(app, "请先安装微信", Toast.LENGTH_SHORT);
            showToast.show();
            Looper.loop();
        } else {
            SendAuth.Req req = new SendAuth.Req();
            req.scope = "snsapi_userinfo";
            req.state = "zhixiang";
            mWXapi.sendReq(req);
        }
    }

    //微信分享链接
    public static void shareLink(String strRet) {
        JSONObject jsonObject;
        try {
            jsonObject = new JSONObject(strRet);
            WXWebpageObject webpage = new WXWebpageObject();

            webpage.webpageUrl = jsonObject.getString("link");

            WXMediaMessage msg = new WXMediaMessage(webpage);
            msg.title = jsonObject.getString("title");
            msg.description = jsonObject.getString("description");
            Bitmap thumb = BitmapFactory.decodeResource(app.getResources(), R.mipmap.ic_launcher);
            msg.setThumbImage(thumb);
            SendMessageToWX.Req req = new SendMessageToWX.Req();
            req.transaction = buildTransaction("webpage");
            req.message = msg;
            if (jsonObject.getBoolean("isfriend")) {
                req.scene = SendMessageToWX.Req.WXSceneSession;
            } else {
                req.scene = SendMessageToWX.Req.WXSceneTimeline;
            }

            mWXapi.sendReq(req);
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    public static void imageShare(String strRet) {
        JSONObject jsonObject;
        String imgurl = "";
        Log.e("TAG", "imageShare: " + strRet);
        Log.e("TAG", "imageShare: appid" + WX_APPID);
        try {
            jsonObject = new JSONObject(strRet);
            imgurl = jsonObject.getString("imagepath");
            Log.e("jjimgurl", imgurl);
            File file = new File(imgurl);
            if (!file.exists()) {
                Toast.makeText(context, "图片不存在", Toast.LENGTH_LONG).show();
            }
            Bitmap bmp = BitmapFactory.decodeFile(imgurl);
            WXImageObject imgObj = new WXImageObject(bmp);

            WXMediaMessage msg = new WXMediaMessage();
            msg.mediaObject = imgObj;

            Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, 150, 150, true);
            bmp.recycle();
            msg.thumbData = bmpToByteArray(thumbBmp, true);

            SendMessageToWX.Req req = new SendMessageToWX.Req();
            req.transaction = buildTransaction("img");
            req.message = msg;
            if (jsonObject.getBoolean("isfriend")) {
                req.scene = SendMessageToWX.Req.WXSceneSession;
            } else {
                req.scene = SendMessageToWX.Req.WXSceneTimeline;
            }

            mWXapi.sendReq(req);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    //加载banner广告 在你需要加载广告的时候调用，
    public static void loadBanner() {

        //不在OnUiThread这个线程中调用肯定会报错
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                //显示
                mExpressContainer.setVisibility(View.VISIBLE);
            }
        });
        float expressViewWidth = 600;
        float expressViewHeight = 50;
        //step4:创建广告请求参数AdSlot,具体参数含义参考文档
        AdSlot adSlot = new AdSlot.Builder()
                .setCodeId("949160787") //
                .setSupportDeepLink(true)
                .setAdCount(1) //请求广告数量为1到3条
                .setExpressViewAcceptedSize(expressViewWidth, expressViewHeight) //期望模板广告view的size,单位dp
                .setImageAcceptedSize(600, 50)//这个参数设置即可，不影响模板广告的size
                .build();
        //step5:请求广告，对请求回调的广告作渲染处理
        mTTAdNative.loadBannerExpressAd(adSlot, new TTAdNative.NativeExpressAdListener() {
            @Override
            public void onError(int code, String message) {
                Log.e("加载banner出现错误", message);
                //mExpressContainer.removeAllViews();
            }

            @Override
            public void onNativeExpressAdLoad(List<TTNativeExpressAd> ads) {
                if (ads == null || ads.size() == 0) {
                    return;
                }
                mTTBanner = ads.get(0);
                bindBannerListener(mTTBanner);
                mTTBanner.render();
            }
        });
    }

    //绑定Banner的回调事件
    private static void bindBannerListener(TTNativeExpressAd ad) {
        ad.setExpressInteractionListener(new TTNativeExpressAd.ExpressAdInteractionListener() {
            @Override
            public void onAdClicked(View view, int type) {
                Log.e("Banner被点击", "点击");
            }

            @Override
            public void onAdShow(View view, int type) {
                Log.e("广告Banner展示成功", "successful");
            }

            @Override
            public void onRenderFail(View view, String msg, int code) {
                //Log.e("ExpressView","render fail:"+(System.currentTimeMillis() - startTime));
                //TToast.show(mContext, msg+" code:"+code);
                Log.e("广告Banner渲染失败", "Fail");
            }

            @Override
            public void onRenderSuccess(View view, float width, float height) {
                Log.e("广告Banner渲染成功", "successful");

                //返回view的宽高 单位 dp
                //TToast.show(mContext, "渲染成功");
                mExpressContainer.addView(view);
            }
        });
        if (ad.getInteractionType() != TTAdConstant.INTERACTION_TYPE_DOWNLOAD) {
            return;
        }
        ad.setDownloadListener(new TTAppDownloadListener() {
            @Override
            public void onIdle() {
                //TToast.show(BannerExpressActivity.this, "点击开始下载", Toast.LENGTH_LONG);
            }

            @Override
            public void onDownloadActive(long totalBytes, long currBytes, String fileName, String appName) {
                Log.e("下载中", appName);
            }

            @Override
            public void onDownloadPaused(long totalBytes, long currBytes, String fileName, String appName) {
                //TToast.show(BannerExpressActivity.this, "下载暂停，点击继续", Toast.LENGTH_LONG);
            }

            @Override
            public void onDownloadFailed(long totalBytes, long currBytes, String fileName, String appName) {
                //TToast.show(BannerExpressActivity.this, "下载失败，点击重新下载", Toast.LENGTH_LONG);
            }

            @Override
            public void onInstalled(String fileName, String appName) {
                //TToast.show(BannerExpressActivity.this, "安装完成，点击图片打开", Toast.LENGTH_LONG);
            }

            @Override
            public void onDownloadFinished(long totalBytes, String fileName, String appName) {
                //TToast.show(BannerExpressActivity.this, "点击安装", Toast.LENGTH_LONG);
            }
        });
    }

    //关闭广告销毁banner 如果你不需要广告显示，可以在想关闭的地方调用，也就是隐藏掉
    public static void closeBanner() {
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mTTBanner != null) {
                    mTTBanner.destroy();
                }

                mExpressContainer.setVisibility(View.GONE);
                Log.e("TAG", "run:bunner3 ");
            }
        });
    }


    public static void toWXPay(final String payinfo) {
        Log.e("payinfo", "= " + payinfo);
        Runnable payRunnable = new Runnable() {  //这里注意要放在子线程
            @Override
            public void run() {
                try {
                    JSONObject json = new JSONObject(payinfo);

                    PayReq req = new PayReq();
                    req.appId = json.getString("appid");
                    req.partnerId = json.getString("partnerid");
                    req.prepayId = json.getString("prepayid");
                    req.nonceStr = json.getString("noncestr");
                    req.timeStamp = json.getString("timestamp");
                    req.packageValue = json.getString("package");
                    req.sign = json.getString("sign");
                    req.extData = "app data"; // optional
                    mWXapi.sendReq(req);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        };
        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }


    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();

    }

    @Override
    protected void onPause() {
        super.onPause();

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }


    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    //连按两次返回，退出app
    private long mTime;

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == event.KEYCODE_BACK) {
            if ((System.currentTimeMillis() - mTime) > 2000) {
                Toast.makeText(this, "再按一次退出APP", Toast.LENGTH_SHORT).show();
                //获取系统当前时间
                mTime = System.currentTimeMillis();
            } else {
                finish();
            }
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
