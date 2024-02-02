# -*- coding: utf-8 -*-
from __future__ import print_function

import paramiko
import os
import shutil
import sys
import oss2
import datetime
import ConfigParser
import zipfile
import hashlib
import time
import json
import pytoml as toml

# 测试服
# AccessKeyId="LTAI4GD2uTT4WaCMUKsNJbmE"
# AccessKeySecret="MhGBeYDNv3OAd0Gl3bgNj356iwoSM3"
# Endpoint="oss-cn-beijing.aliyuncs.com"
# bucket="wlncceshifu"
# iphot="wlncceshifu.oss-cn-beijing.aliyuncs.com"

# 正式服
AccessKeyId="LTAI4GD2uTT4WaCMUKsNJbmE"
AccessKeySecret="MhGBeYDNv3OAd0Gl3bgNj356iwoSM3"
Endpoint="oss-cn-beijing.aliyuncs.com"
bucket="weilainongchang"
iphot="weilainongchang.oss-cn-beijing.aliyuncs.com"

def percentage(consumed_bytes, total_bytes):
    if total_bytes:
        rate = int(100 * (float(consumed_bytes) / float(total_bytes)))
        print('\r{0}% '.format(rate), end='')
        sys.stdout.flush()

version = datetime.datetime.now().strftime('%y%m%d%H%M%S')

# 构建web
build = "--path ../../weilaiClient --build platform=web-mobile;debug=false"
print (build)
b="""
    /Applications/CocosCreator/Creator/2.3.2/CocosCreator.app/Contents/MacOS/CocosCreator %s
    """%(build)
os.system(b)

s="""
    sh buildh5.sh %s
"""%(version)
print (s)
os.system(s)

print (version)

print('连接阿里云oss服务器')
print(AccessKeyId)
print(AccessKeySecret)
auth = oss2.Auth(AccessKeyId, AccessKeySecret)
service = oss2.Service(auth, Endpoint)

bucket = oss2.Bucket(auth, Endpoint, bucket)
version_dir = '../build/web-mobile'

# 遍历所有的子目录进行上传
for (root, dirs, files) in os.walk(version_dir):
    for filename in files:
        fpath = os.path.join(root, filename)
        fdir, fname = os.path.split(fpath)
        if not os.path.isdir(fpath) and not fname.startswith("."):
            subpath = fpath.replace(version_dir, "")
            if subpath.startswith("/"):
                subpath = subpath.replace("/", '', 1)

            with open(fpath, 'rb') as fileobj:
                bucket.put_object(subpath, fileobj.read(),
                                  progress_callback=percentage)
            pass



