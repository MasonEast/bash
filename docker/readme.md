# 安装

1. <https://www.docker.com/products/docker-desktop/> 下载安装包

2. 安装

3. 打开 docker, 点击设置, 选择资源, 设置内存和 cpu

4. 打开 docker, 点击设置, 选择共享文件夹, 选择共享文件夹

5. 打开 docker, 点击设置, 选择代理, 设置代理

6. 打开 docker, 点击设置, 选择镜像, 设置镜像加速器

## Windows 安装了 Docker Desktop 无法启动

1. 检查服务是否启动
   找到 【Docker Desktop Service】，然后，启动他；

   你也可以直接设置为“自动”

   找到服务，右键》属性》启动类型：自动》点击“确定”

2. 检查 Hyper-V 是否启用
   启用或关闭 Windows 功能
   打开控制面板》程序》程序和功能》启用或关闭 Windows 功能》勾选 Hyper-V

3. 检查 bcdedit 的 hypervisorlaunchtype 是否为 Auto
   打开命令提示符（以管理员身份运行），输入以下命令：

   ```bash
   bcdedit # 查看hypervisorlaunchtype是否为Auto
   ```

   ```bash
   bcdedit /set hypervisorlaunchtype auto
   ```

   重启电脑

4. 检查 CPU 是否开启虚拟化
   任务管理器》性能》CPU》虚拟化

5. 检查 WSL 是否启用
   启用或关闭 Windows 功能
   打开控制面板》程序》程序和功能》启用或关闭 Windows 功能》勾选适用于 Linux 的 Windows 子系统
   检查更新：打开 powershell，输入以下命令：

   ```bash
   wsl --update --web-download
   ```
