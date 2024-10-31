# 包安装

## Conda

- 用途广泛：Conda 不仅用于管理 Python 包，它也可以管理其他语言的包和- 环境（如 R）。它是 Anaconda 发行版的一部分，特别适合于科学计算和数据科学的环境。
- 环境管理：Conda 内置了强大的虚拟环境管理功能，可以轻松创建和切换环境。
- 依赖管理：Conda 使用全局包解决器，可以自动解决包依赖关系，这对于复杂项目和科学计算非常重要。
- 包来源：Conda 从 Anaconda 仓库安装包，这些包通常经过优化，特别对于非 Python 库更为方便。

- 优点：Conda 是一个功能强大的包和环境管理工具，特别适合于科学计算和数据科学。
- 缺点：Conda 可能会占用更多的磁盘空间，因为它需要存储大量的包和依赖项。

```bash
conda create --name Abc python=3.10 -y # 创建名为Abc的虚拟环境
conda activate Abc # 激活虚拟环境

conda install numpy # 安装numpy包

conda install -c anaconda ipython -y # 从anaconda仓库安装ipython包
```

通常用 Conda 创建和管理环境，而用 pip 安装特定的 Python 包

安装地址： <https://www.anaconda.com/download/success>

## Pip

- 用途广泛：Pip 是 Python 的官方包管理工具，用于安装和管理 Python 包。它支持从 Python Package Index（PyPI）和其他包源安装包。
- 环境管理：Pip 本身不提供环境管理功能，但可以通过结合使用虚拟环境工具（如 venv 或 virtualenv）来管理 Python 环境。

```bash

pip install numpy # 安装numpy包

pip install --upgrade pip # 更新pip

pip install -r requirements.txt # 安装requirements.txt文件中列出的所有包

pip install --upgrade -r requirements.txt # 更新requirements.txt文件中列出的所有包

pip install -i https://pypi.tuna.tsinghua.edu.cn/simple numpy # 使用清华大学的PyPI镜像安装numpy包

pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt # 使用清华大学的PyPI镜像安装requirements.txt文件中列出的所有包

```
