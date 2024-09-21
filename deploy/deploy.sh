#!/bin/bash

# 设置变量
FRONTEND_DIR="/home/web/vue-app"
ZIP_FILE="dist-prod.zip"
BACKUP_FILE="dist-prod.zip.bak"
EXTRACT_DIR="dist-prod"

# 进入到前端目录
cd $FRONTEND_DIR || { echo "Directory $FRONTEND_DIR not found"; exit 1; }

# 删除现有的解压文件夹
rm -rf $EXTRACT_DIR


# 检查新zip包是否已上传
if [ ! -f $ZIP_FILE ]; then
    echo "New $ZIP_FILE has not been uploaded"
    exit 1
fi

# 解压新的zip包
unzip $ZIP_FILE -d "./dist-prod" || { echo "Failed to unzip $ZIP_FILE"; exit 1; }

# 备份zip包
if [ -f $ZIP_FILE ]; then
    mv $ZIP_FILE $BACKUP_FILE
else
    echo "File $ZIP_FILE does not exist"
    exit 1
fi

# 重启nginx
sudo systemctl restart nginx || { echo "Failed to restart nginx"; exit 1; }

echo "Deployment completed successfully"