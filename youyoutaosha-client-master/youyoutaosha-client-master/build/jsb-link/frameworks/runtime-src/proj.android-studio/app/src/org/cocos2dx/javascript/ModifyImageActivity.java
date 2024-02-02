package org.cocos2dx.javascript;

import android.Manifest;
import android.app.Activity;
import android.content.ContentUris;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Build;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.os.Bundle;
import android.util.Log;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import android.os.Environment;

import org.cocos2dx.javascript.oss.UploadHelper;
import org.cocos2dx.lib.Cocos2dxLocalStorage;

public class ModifyImageActivity extends Activity {
    //打开相册的请求码
    private static final int MY_ADD_CASE_CALL_PHONE = 7;
    public static final int RC_TAKE_PHOTO = 1;
    public static String choosePhotoImage = "choosePhotoImage";
    public static String chooseCameraImage = "chooseCameraImage";
    public static String imageName = "";

    public static ModifyImageActivity app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = getIntent();
        app = this;
        if (intent.hasExtra(choosePhotoImage))
        {
            imageName = intent.getStringExtra("imageName");
            choosePhoto();
        }
//        finish();
    }
    /**
     * 打开相册
     */
    private void choosePhoto() {
        //这是打开系统默认的相册(就是你系统怎么分类,就怎么显示,首先展示分类列表)
        Intent picture = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(picture, MY_ADD_CASE_CALL_PHONE);
    }

    /**
     * 申请权限回调方法
     *
     * @param requestCode
     * @param permissions
     * @param grantResults
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == MY_ADD_CASE_CALL_PHONE) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                choosePhoto();
            } else {
                //"权限拒绝");
                DeviceModule.selectPhotoCallback(false, "");
            }
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    /**
     * startActivityForResult执行后的回调方法，接收返回的图片
     * @param requestCode
     * @param resultCode
     * @param data
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK && null != data) {
            Uri uri = data.getData();//获取路径
            try{
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), uri);
//                bitmap = getBitmapSize(bitmap);//压缩图片
                int width = bitmap.getWidth();
                int height = bitmap.getHeight();
                File f = new File(imageName);
                if (f.exists()) {
                    f.delete();
                }
                FileOutputStream out = new FileOutputStream(f);
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out);
                out.flush();
                out.close();
                Uri imageurl = data.getData();
                UploadHelper uploadHelper = new UploadHelper();
                String path = getPathFromUri(ModifyImageActivity.this,imageurl);
                Log.e("dddd",path);
                int jiaodu = readPictureDegree(path);
                String uploaduel = uploadHelper.uploadPortrait(app,path);
                Log.e("cccc",uploaduel);
                Cocos2dxLocalStorage.setItem("imageInfo", uploaduel);
                DeviceModule.selectPhotoCallback(true, imageName);

            }catch (Exception e){
                e.printStackTrace();
            }
        }
        finish();
    }

    protected Bitmap getBitmapSize(Bitmap bitmap) {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();

        float scale = 1;
        if (width > height) {
            if (width > 1600) {
                scale = ((float) 1600.1) / width;
            }
        } else {
            if (height > 1600) {
                scale = ((float) 1600.1) / height;
            }
        }

        Matrix matrix = new Matrix();
        matrix.postScale(scale, scale);
        bitmap = Bitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
        return bitmap;
    }


    /**
     * 读取照片旋转角度
     *
     * @param path 照片路径
     * @return 角度
     */
    public static int readPictureDegree(String path) {
        int degree = 0;
        try {
            ExifInterface exifInterface = new ExifInterface(path);
            int orientation = exifInterface.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
            switch (orientation) {
                case ExifInterface.ORIENTATION_ROTATE_90:
                    degree = 90;
                    break;
                case ExifInterface.ORIENTATION_ROTATE_180:
                    degree = 180;
                    break;
                case ExifInterface.ORIENTATION_ROTATE_270:
                    degree = 270;
                    break;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return degree;
    }

    /**
     * 旋转图片
     * @param angle 被旋转角度
     * @param bitmap 图片对象
     * @return 旋转后的图片
     */
    public static Bitmap rotaingImageView(int angle, Bitmap bitmap) {
        Bitmap returnBm = null;
        // 根据旋转角度，生成旋转矩阵
        Matrix matrix = new Matrix();
        matrix.postRotate(angle);
        try {
            // 将原始图片按照旋转矩阵进行旋转，并得到新的图片
            returnBm = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
        } catch (OutOfMemoryError e) {
        }
        if (returnBm == null) {
            returnBm = bitmap;
        }
        if (bitmap != returnBm) {
            bitmap.recycle();
        }
        return returnBm;
    }

    public static String getPathFromUri (Context context, Uri uri) {
        String path = null;
        if (uri != null) {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                path = getImageAbsolutePath(context, uri);
            } else {
                Cursor cursor = null;
                try {
                    String[] proj = {MediaStore.Images.Media.DATA};
                    cursor = context.getContentResolver().query(uri, proj, null, null, null);
                    int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
                    cursor.moveToFirst();
                    path = cursor.getString(column_index);
                } catch (Exception e) {
                } finally {
                    if (cursor != null)
                        cursor.close();
                }
            }

        }
        return path;
    }

    // @TargetApi (19)
    public static String getImageAbsolutePath (Context context, Uri imageUri) {
        if (context == null || imageUri == null)
            return null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && DocumentsContract.isDocumentUri(context, imageUri)) {
            if (isExternalStorageDocument(imageUri)) {
                String docId = DocumentsContract.getDocumentId(imageUri);
                String[] split = docId.split(":");
                String type = split[0];
                if ("primary".equalsIgnoreCase(type)) {
                    return Environment.getExternalStorageDirectory() + "/" + split[1];
                }
            } else if (isDownloadsDocument(imageUri)) {
                String id = DocumentsContract.getDocumentId(imageUri);
                Uri contentUri = ContentUris.withAppendedId(Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));
                return getDataColumn(context, contentUri, null, null);
            } else if (isMediaDocument(imageUri)) {
                String docId = DocumentsContract.getDocumentId(imageUri);
                String[] split = docId.split(":");
                String type = split[0];
                Uri contentUri = null;
                if ("image".equals(type)) {
                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if ("video".equals(type)) {
                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if ("audio".equals(type)) {
                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }
                String selection = MediaStore.Images.Media._ID + "=?";
                String[] selectionArgs = new String[]{split[1]};
                return getDataColumn(context, contentUri, selection, selectionArgs);
            }
        } // MediaStore (and general)
        else if ("content".equalsIgnoreCase(imageUri.getScheme())) {
            // Return the remote address
            if (isGooglePhotosUri(imageUri))
                return imageUri.getLastPathSegment();
            return getDataColumn(context, imageUri, null, null);
        }
        // File
        else if ("file".equalsIgnoreCase(imageUri.getScheme())) {
            return imageUri.getPath();
        }
        return null;
    }

    private static String getDataColumn(Context context, Uri uri, String selection, String[] selectionArgs) {
        Cursor cursor = null;
        final String column = "_data";
        final String[] projection = {column};
        try {
            cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs, null);
            if (cursor != null && cursor.moveToFirst()) {
                final int column_index = cursor.getColumnIndexOrThrow(column);
                return cursor.getString(column_index);
            }
        } finally {
            if (cursor != null)
                cursor.close();
        }
        return null;
    }

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

    public static boolean isExternalStorageDocument(Uri uri) {
        return "com.android.externalstorage.documents".equals(uri.getAuthority());
    }

    public static boolean isGooglePhotosUri(Uri uri) {
        return "com.google.android.apps.photos.content".equals(uri.getAuthority());
    }
    public static boolean isDownloadsDocument (Uri uri) {
        return "com.android.providers.downloads.documents".equals(uri.getAuthority());
    }
    public static boolean isMediaDocument (Uri uri) {
        return "com.android.providers.media.documents".equals(uri.getAuthority());
    }

}