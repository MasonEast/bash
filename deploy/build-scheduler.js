const cron = require("node-cron");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");
const archiver = require("archiver");

const REPO_DIR = ".";
const ENV = "dev";
const GIT_BRANCH = "dev";

// 源目录和目标目录
const buildDir = path.join(__dirname, "dist-prod"); // 假设构建输出在'dist'目录
const targetDir = `/home/project/${ENV}/front`; // 用于存放打包文件和备份

const ZIP_PATH = path.join(targetDir, "dist-prod.zip"); // 压缩包路径

const git = simpleGit(REPO_DIR);

async function distZip() {
  // 创建输出ZIP文件的输出流
  const output = fs.createWriteStream(ZIP_PATH);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // 设置压缩级别
  });
  // 监听关闭事件
  output.on("close", async () => {
    console.log(`ZIP 文件已经生成，总共 ${archive.pointer()} 字节`);
  });

  // 监听警告事件
  archive.on("warning", (err) => {
    if (err.code === "ENOENT") {
      console.warn(err);
    } else {
      throw err;
    }
  });

  // 监听错误事件
  archive.on("error", (err) => {
    throw err;
  });

  // 关联输出流和archiver
  archive.pipe(output);

  // 将 源文件夹内容添加到ZIP文件
  archive.directory(buildDir, false);

  // 完成并关闭归档
  await archive.finalize();
}

const build = async () => {
  const currentBranch = await git.branchLocal();
  if (currentBranch.current !== "dev") {
    console.log(`切换到 ${GIT_BRANCH} 分支...`);
    await git.checkout(`${GIT_BRANCH}`);
  }

  // 从远程仓库拉取最新的 ${GIT_BRANCH} 分支代码
  console.log(`正在更新 ${GIT_BRANCH} 分支...`);

  await git.pull("origin", GIT_BRANCH);

  console.log("开始打包前端项目...");

  exec("npm run build:prod", async (error, stdout, stderr) => {
    if (error) {
      console.error(`执行打包时出错: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`标准错误输出: ${stderr}`);
    }

    console.log(`标准输出: ${stdout}`);

    // 检查输出目录是否存在
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    // 备份现有打包文件
    const backupDir = path.join(
      targetDir,
      "backup",
      `backup_${Date.now()}.zip`
    );
    if (fs.existsSync(buildDir)) {
      fs.mkdirSync(path.join(targetDir, "backup"), { recursive: true });

      const codeDir = path.join(targetDir, "dist-prod");
      if (fs.existsSync(codeDir)) fs.rmSync(codeDir, { recursive: true }); // 删除目录及其内容
      fs.renameSync(buildDir, codeDir);

      await distZip();
      fs.renameSync(ZIP_PATH, backupDir);
      console.log(`备份已保存到 ${backupDir}`);
    }

    // 将新的构建结果复制到目标目录
    // fs.mkdirSync(buildDir, { recursive: true })
    // copyDirectoryRecursively(buildDir, targetDir)
    // console.log('打包完成并保存到目标目录')
  });
};

cron.schedule("0 11 * * *", build, {
  timezone: "Asia/Shanghai",
});

cron.schedule("0 16 * * *", build, {
  timezone: "Asia/Shanghai",
});

// 递归复制目录方法
function copyDirectoryRecursively(src, dest) {
  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.statSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile, { recursive: true });
      copyDirectoryRecursively(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

console.log("定时打包任务已启动");
