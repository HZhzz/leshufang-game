# -*- coding: utf-8 -*-


import json
import os
import shutil


# 打开 JSON 文件
with open('hot-update.json', 'r') as file:
    # 读取文件内容
    data = json.load(file)

# 现在，变量 data 包含了从 JSON 文件中读取的内容

version = data.get('version')
remote_url = data.get('remote-url')
jsb_link = data.get('jsb-link')
save = data.get('save');
print(version)
print(remote_url)
print(jsb_link)
print(save)
version = int(version)+1

command = 'node version_generator.js -v '+str(version)+' -u '+remote_url+' -s '+jsb_link+' -d '+save  # 以执行 'ls' 命令为例
print(command)
os.system(command)
shutil.copy('update/project.manifest', 'assets/')
shutil.copy('update/version.manifest', 'assets/')
if os.path.exists('update/assets'):
    shutil.rmtree('update/assets')
shutil.copytree(jsb_link+'/assets', 'update/assets')
if os.path.exists('update/src'):
    shutil.rmtree('update/src')
shutil.copytree(jsb_link+'/src', 'update/src')

data['version'] = str(version)
# 写入修改后的内容回 JSON 文件
with open('hot-update.json', 'w') as file:
    # 将修改后的内容写回文件
    json.dump(data, file, indent=2)  # indent 参数可选，用于美化输出，使其更易读