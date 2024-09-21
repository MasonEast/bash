```bash
# 编辑sudo
sudo visudo

# 设置用户名免密，尽量放在最后，防止被覆盖
username ALL=(ALL) NOPASSWD:ALL

# 查看sudo权限是否生效
sudo -l
```
