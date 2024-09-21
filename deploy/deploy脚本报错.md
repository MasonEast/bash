
# 文件格式问题：Windows和Linux使用不同的换行符。Windows使用CRLF（回车换行，\r\n），而Linux使用LF（换行，\n）

隐藏字符：脚本中可能含有不可见的隐藏字符。

解决方法

1. 检查和转换文件格式

确保脚本是使用正确的换行符格式。你可以在Linux环境中使用 dos2unix 工具来将Windows格式的文件转换为Unix格式：

```bash
dos2unix /path/to/deploy.sh
```
