# commit 提交规范

- feat: 引入新功能。
- fix: 修复 Bug。
- docs: 修改文档，如 README、注释等。
- style: 样式更改，不影响逻辑，比如空格、格式化、缺少分号等。
- refactor: 代码重构，既不新增功能也没有修复 Bug。
- perf: 提升性能的代码修改。
- test: 添加或修改测试用例。
- build: 影响构建系统或外部依赖的更改，比如升级 npm 包、修改 webpack 配置等。
- ci: 修改持续集成配置文件和脚本。
- chore: 其他不修改 src 或测试文件的更改，比如更新构建任务、包管理。
- revert: 撤销某次提交。

## 忽略已提交的文件

```bash
git rm --cached .env

git commit -m "remove .env"
```

## 代码回滚

```bash
git reset --hard HEAD^ # 回退到上一个版本

git push --force # 强制提交，覆盖远程仓库

git revert <commit_id> # 撤销某次提交

```

## 代码合并某次提交

```bash
git cherry-pick <commit_id> # 合并某次提交
```
