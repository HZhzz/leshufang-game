package org.cocos2dx.javascript;

import android.Manifest;
import android.net.Uri;

import org.cocos2dx.lib.Cocos2dxActivity;

import android.app.Activity;
import android.content.pm.PackageManager;
import android.content.Intent;
import android.os.Build;

public class PermissionModule {

    private static AppActivity app = null;

    public static void setContext(AppActivity AppActivity) {
        PermissionModule.app = AppActivity;
        boolean permission = checkWriteExternalAuth();
        if (!permission) {
            isGrantExternalRW(PermissionModule.app);
        }
    }

    //判断是否定位开启
    public static boolean checkLocationAuth() {
        PackageManager pm = app.getPackageManager();
        boolean permission = (PackageManager.PERMISSION_GRANTED ==
                pm.checkPermission("android.permission.ACCESS_COARSE_LOCATION", Cocos2dxActivity.getContext().getPackageName()));
        return permission;
    }

    //判断是否开启相机权限
    public static boolean checkCameraAuth() {
        PackageManager pm = app.getPackageManager();
        boolean permission = (PackageManager.PERMISSION_GRANTED ==
                pm.checkPermission("android.permission.CAMERA", Cocos2dxActivity.getContext().getPackageName()));
        return permission;
    }

    //判断是否有麦克风权限
    public static boolean checkRecordAuth() {
        PackageManager pm = app.getPackageManager();
        boolean permission = (PackageManager.PERMISSION_GRANTED ==
                pm.checkPermission("android.permission.RECORD_AUDIO", Cocos2dxActivity.getContext().getPackageName()));
        return permission;
    }

    //判断是否有储存空间权限
    public static boolean checkWriteExternalAuth() {
        PackageManager pm = app.getPackageManager();
        boolean permission = (PackageManager.PERMISSION_GRANTED ==
                pm.checkPermission("android.permission.WRITE_EXTERNAL_STORAGE", Cocos2dxActivity.getContext().getPackageName()));
        return permission;
    }


    /**
     * 获取储存权限
     *
     * @param activity
     * @return
     */

    public static boolean isGrantExternalRW(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && activity.checkSelfPermission(
                Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {

            activity.requestPermissions(new String[]{
                    Manifest.permission.READ_EXTERNAL_STORAGE,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
            }, 1);

            return false;
        }

        return true;
    }


}
