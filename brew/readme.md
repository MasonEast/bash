# 一键安装脚本（新手推荐）

使用国内开发者维护的安装脚本，自动配置镜像源

```bash

/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

运行后按提示选择 ​清华大学或中科大镜像，脚本会自动完成所有配置。

## 安装MongoDB


添加MongoDB的tap仓库：brew tap mongodb/brew
安装mongodb-community：brew install mongodb-community
处理数据目录权限，可能需要创建目录并设置权限（如网页7提到的/usr/local/var/mongodb或Catalina之后的系统路径）
启动服务：brew services start mongodb-community
验证安装，连接MongoDB shell。