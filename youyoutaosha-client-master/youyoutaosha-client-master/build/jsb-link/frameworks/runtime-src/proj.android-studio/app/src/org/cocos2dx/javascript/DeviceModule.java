package org.cocos2dx.javascript;

import java.io.FileNotFoundException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.content.ClipboardManager;
import android.content.ClipData;
import android.provider.Settings;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.cocos2dx.lib.Cocos2dxActivity;

import android.provider.MediaStore;

import com.tencent.mm.opensdk.openapi.IWXAPI;

import cn.leshufang.cocos.wxapi.WechatShareManager;

public class DeviceModule {
    private static org.cocos2dx.javascript.xxtea.XXTEA XXTEA;
    private static Context context = null;
    private static AppActivity app = null;
    private static float batteryLevel = 1;
    public static String IMEI = "";
    public static String copyStr = "";
    public static String WX_APPID = "wx97dfba2acdaa8400";
    private static Handler myHandler;
    private static final int WX_LOGIN = 0;
    private static WechatShareManager mShareManager;
    public static IWXAPI mWXapi;

    public static void setContext(Context context) {
        DeviceModule.context = context;
        DeviceModule.app = (AppActivity) context;
        mShareManager = WechatShareManager.getInstance(context);
        myHandler = new Handler() {
            public void handleMessage(Message msg) {
                switch (msg.what) {
                    case WX_LOGIN:
//						wxLogin();
                        break;
                }
                super.handleMessage(msg);
            }
        };
    }

    public static void runJsCode(final String code) {
        // 一定要在 GL 线程中执行
        app.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString(code);
            }
        });
    }

    public static String getDeviceName() {
        assert (Build.MODEL != null);
        return Build.MODEL;
    }

    public static String getSystemVersion() {
        return android.os.Build.VERSION.RELEASE;
    }

    public static String getUserToken() {
        return md5(getAndroidID());
    }

    public static String getAndroidID() {
        String androidID = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        return androidID;
    }

    public static String getAppVersion() {
        try {
            PackageInfo info = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            assert (info.versionName != null);
            Log.e("TAG", "getAppVersion:====== " + info);
            Log.e("TAG", "getAppVersion: " + info.versionName);
            return info.versionName;
        } catch (NameNotFoundException e) {
            e.printStackTrace();
        }
        return "";
//		PackageInfo pkg;
//		int versionCode = 0;
//		String versionName = "";
//		try {
//			pkg = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
//			versionCode = pkg.versionCode;
//
//		} catch (PackageManager.NameNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		Log.e("TAG", "getAppVersion:============= "+versionCode );
//		return versionCode;

    }

    public static String getAppVerCode() {
        int versionCode;
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo(context.getPackageName(), 0);
            versionCode =  packageInfo.versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            Log.e("AppInfoUtil", "Package name not found", e);
            versionCode =  -1;  // 如果获取失败，返回一个标志性的值
        }
        String versionCodeStr = versionCode+"";
        Log.e("getAppVerCode",versionCodeStr);
        return versionCodeStr;
    }

    public static String xxteafinal(String xxtea) {
//		JSONObject result = new JSONObject();
//		try {
//			result.put("coin", "123456");
////            result.put("success", true);
//		} catch (JSONException e) {
//			e.printStackTrace();
//		}

        String str = xxtea;
        String key = "pigkey";
        String encrypt_data = XXTEA.encryptToBase64String(str, key);
        Log.d("TAG=============tag", "=========tag" + encrypt_data);
        System.out.println(encrypt_data);
        return encrypt_data;
//        assert("QncB1C0rHQoZ1eRiPM4dsZtRi9pNrp7sqvX76cFXvrrIHXL6".equals(encrypt_data));
//        String decrypt_data = XXTEA.decryptBase64StringToString(encrypt_data, key);
//        assert(str.equals(decrypt_data));
    }

    public static String getMacAddress() {
        WifiManager wifi = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifi.getConnectionInfo();
        String macAddr = info.getMacAddress();
        return macAddr;
    }

    public static float getBatteryLevel() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Intent.ACTION_BATTERY_CHANGED);
        context.registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if (action.equals(Intent.ACTION_BATTERY_CHANGED)) {
                    int level = intent.getIntExtra("level", 0);
                    int scale = intent.getIntExtra("scale", 0);
                    Log.d("test", level + " --- " + scale);
                    if (scale != 0) {
                        batteryLevel = ((float) level) / scale;
                        if (batteryLevel < 0) {
                            batteryLevel = 0;
                        } else if (batteryLevel > 1) {
                            batteryLevel = 1;
                        }
                    } else {
                        batteryLevel = 0;
                    }
                }
            }
        }, intentFilter);
        return batteryLevel;
    }

    public static String getNetworkStatus() {
        ConnectivityManager connMgr = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();

        String retstring = "none";
        if (networkInfo == null) {
            return retstring;
        }
        int nType = networkInfo.getType();
        if (nType == ConnectivityManager.TYPE_MOBILE) {
            retstring = "wwan";
        } else if (nType == ConnectivityManager.TYPE_WIFI) {
            retstring = "wifi";
        }
        return retstring;
    }

    public static String md5(String s) {
        try {
            // Create MD5 Hash
            MessageDigest digest = java.security.MessageDigest
                    .getInstance("MD5");
            digest.update(s.getBytes());
            byte messageDigest[] = digest.digest();
            // Create HEX String
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < messageDigest.length; i++) {
                String sTmp = Integer.toHexString(0xFF & messageDigest[i]);
                switch (sTmp.length()) {
                    case 0:
                        hexString.append("00");
                        break;
                    case 1:
                        hexString.append("0");
                        hexString.append(sTmp);
                        break;
                    default:
                        hexString.append(sTmp);
                        break;
                }
            }
            return hexString.toString().toLowerCase();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }

//	public static void mobileShake(int timeMs) {
//		Vibrator vibrator = (Vibrator)context.getSystemService(Context.VIBRATOR_SERVICE);
//		vibrator.vibrate(timeMs);//震半秒钟
//	}

    public static void copyToClipboard(final String text) {
        try {
            Runnable runnable = new Runnable() {
                public void run() {
                    ClipboardManager clipboard = (ClipboardManager) app.getSystemService(Context.CLIPBOARD_SERVICE);
                    ClipData clip = ClipData.newPlainText("Copied Text", text);
                    clipboard.setPrimaryClip(clip);
                }
            };
            app.runOnUiThread(runnable);

        } catch (Exception e) {
            Log.d("cocos2dx", "copyToClipboard error");
            e.printStackTrace();
        }
    }

    public static void getClipContent() {
        try {
            app.runOnUiThread(new Runnable() {

                @Override
                public void run() {
                    ClipboardManager clipboard = (ClipboardManager) app.getSystemService(Context.CLIPBOARD_SERVICE);
                    ClipData clipData = clipboard.getPrimaryClip();
                    if (clipData != null && clipData.getItemCount() > 0) {
                        CharSequence text = clipData.getItemAt(0).getText();
                        if (text != null) {
                            String textStr = text.toString();
                            String code = "clipCallback( '";
                            code += textStr;
                            code += "');";
                            DeviceModule.runJsCode(code);
                        }
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void selectPhoto(final String imagePath) {
        Intent intent = new Intent(Cocos2dxActivity.getContext(), ModifyImageActivity.class);
        intent.putExtra(ModifyImageActivity.choosePhotoImage, "choosePhotoImage");
        intent.putExtra("imageName", imagePath);
        Cocos2dxActivity.getContext().startActivity(intent);
    }

    public static void saveFileToPhoto(final String imagePath) {
        // 其次把文件插入到系统图库
        try {
            MediaStore.Images.Media.insertImage(context.getContentResolver(),
                    imagePath, "shotscreen", null);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        // 最后通知图库更新
        context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse(imagePath)));
    }

    public static void openSysSetting() {
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
        intent.setData(Uri.fromParts("package", Cocos2dxActivity.getContext().getPackageName(), null));
        Cocos2dxActivity.getContext().startActivity(intent);
    }

    public static void selectPhotoCallback(Boolean result, String path) {
        if (result) {
            String code = "selectPhotoCallback(true, '";
            code += path;
            code += "');";
            runJsCode(code);
        } else {
            String code = "selectPhotoCallback(false, '')";
            runJsCode(code);
        }
    }


//	//注册到微信
//	public static void registerToWX(String appid) {
//    	WX_APPID = appid;
//		Log.e("TAG", "registerToWX: ========"+WX_APPID );
//		mWXapi = WXAPIFactory.createWXAPI(DeviceModule.context, WX_APPID, false);
//		mWXapi.registerApp(WX_APPID);
//	}
//	//微信登录
//
//	public static void wxLogin(){
//		if (!mWXapi.isWXAppInstalled()) {
//			Looper.prepare();
//			Toast showToast = Toast.makeText(app, "请先安装微信", Toast.LENGTH_SHORT);
//			showToast.show();
//			Looper.loop();
//		} else {
//			SendAuth.Req req = new SendAuth.Req();
//			req.scope = "snsapi_userinfo";
//			req.state = "zhixiang";
//			mWXapi.sendReq(req);
//		}
//	}

//	//微信分享链接
//	public static void shareLink(String strRet){
//		JSONObject jsonObject;
//		try {
//			jsonObject = new JSONObject(strRet);
//			WXWebpageObject webpage = new WXWebpageObject();
//
//			webpage.webpageUrl = jsonObject.getString("link");
//
//			WXMediaMessage msg = new WXMediaMessage(webpage);
//			msg.title = jsonObject.getString("title");
//			msg.description = jsonObject.getString("description");
//			Bitmap thumb = BitmapFactory.decodeResource(app.getResources(), R.mipmap.ic_launcher);
//			msg.setThumbImage(thumb);
//			SendMessageToWX.Req req = new SendMessageToWX.Req();
//			req.transaction = buildTransaction("webpage");
//			req.message = msg;
//			if (jsonObject.getBoolean("isfriend")) {
//				req.scene = SendMessageToWX.Req.WXSceneSession;
//			} else {
//				req.scene = SendMessageToWX.Req.WXSceneTimeline;
//			}
//
//			mWXapi.sendReq(req);
//		} catch (JSONException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//
//
//	public static void imageShare(String strRet) {
//		JSONObject jsonObject;
//		String imgurl = "";
//		Log.e("TAG", "imageShare: "+strRet );
//		Log.e("TAG", "imageShare: appid"+WX_APPID );
//		try {
//			jsonObject = new JSONObject(strRet);
//			imgurl = jsonObject.getString("imagepath");
//			Log.e("jjimgurl", imgurl);
//			File file = new File(imgurl);
//			if (!file.exists()) {
//				Toast.makeText(context, "图片不存在", Toast.LENGTH_LONG).show();
//			}
//			WXImageObject imgObj = new WXImageObject();
//			imgObj.setImagePath(imgurl);
//			WXMediaMessage msg = new WXMediaMessage();
//			msg.mediaObject = imgObj;
//			Bitmap bmp = BitmapFactory.decodeFile(imgurl);
//			Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, 150, 150, true);
//			msg.setThumbImage(thumbBmp);
//			bmp.recycle();
//			SendMessageToWX.Req req = new SendMessageToWX.Req();
//			req.transaction = String.valueOf(System.currentTimeMillis());
//			req.message = msg;
//			if (jsonObject.getBoolean("isfriend")) {
//				req.scene = SendMessageToWX.Req.WXSceneSession;
//			} else {
//				req.scene = SendMessageToWX.Req.WXSceneTimeline;
//			}
//
//			mWXapi.sendReq(req);
//
//		} catch (JSONException e) {
//			e.printStackTrace();
//		}
//
//	}
//
//
//	public static void toWXPay(final String payinfo) {
//		Runnable payRunnable = new Runnable() {  //这里注意要放在子线程
//			@Override
//			public void run() {
//				try {
//					JSONObject json = new JSONObject(payinfo);
//					PayReq req = new PayReq();
//					req.appId = json.getString("appid");
//					req.partnerId = json.getString("partnerid");
//					req.prepayId = json.getString("prepayid");
//					req.nonceStr = json.getString("noncestr");
//					req.timeStamp = json.getString("timestamp");
//					req.packageValue = json.getString("package");
//					req.sign = json.getString("sign");
//					req.extData = "app data"; // optional
//					mWXapi.sendReq(req);
//				} catch (JSONException e) {
//					e.printStackTrace();
//				}
//			}
//		};
//		Thread payThread = new Thread(payRunnable);
//		payThread.start();
//	}
}
