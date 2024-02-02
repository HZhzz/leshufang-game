package cn.leshufang.cocos.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.DeviceModule;

public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler {
	
	private static final String TAG = "ddd";
	private IWXAPI api;
	private Handler myHandler;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		AppActivity.mWXapi.handleIntent(getIntent(), this);
		myHandler = new Handler() {
			public void handleMessage(Message msg) {
//				switch (msg.what) {
//					case WXEntryActivity.WX_LOGIN:
//
//						break;
//				}
				super.handleMessage(msg);
			}
		};
//
//    	api = WXAPIFactory.createWXAPI(this, AppActivity.WX_APP_ID);
//        api.handleIntent(getIntent(), this);
    }

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
		AppActivity.mWXapi.handleIntent(getIntent(), this);
	}

	@Override
	public void onReq(BaseReq req) {
	}

	@Override
	public void onResp(BaseResp resp) {
		Log.d(TAG, "onPayFinish, errCode = " + resp.errCode);
		Log.d("onPayFinish", "onPayFinish, errCode = " + resp);
		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
			Log.d(TAG, "onPayFinish发反反复复, errCode = " + resp.errCode);
			String code = "wx_paySuccess( '";
			code += resp.errCode;
			code += "');";
			AppActivity.runJsCode(code);
			this.finish();
		}
	}
}