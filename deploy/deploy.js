const simpleGit = require("simple-git");
const { NodeSSH } = require("node-ssh");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

// 配置项
const REPO_DIR = ".";
const BUILD_DIR = "./dist-prod";
const ZIP_PATH = "./dist-prod.zip";
const BUILD_COMMAND = "npm run build:prod";

const SERVER = "192.168.1.120";
const USERNAME = "cdjzxy";
const PASSWORD = "cdjzxy@2024";
const REMOTE_DIR = "/home/web/vue-app";

const GIT_BRANCH = "feat_ljf";

const ssh = new NodeSSH();

async function build() {
  return new Promise((resolve, reject) => {
    exec(BUILD_COMMAND, { cwd: REPO_DIR }, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        reject(err);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function distZip() {
  // 创建输出ZIP文件的输出流
  const output = fs.createWriteStream(ZIP_PATH);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // 设置压缩级别
  });
  // 监听关闭事件
  output.on("close", () => {
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
  archive.directory(BUILD_DIR, false);

  // 完成并关闭归档
  await archive.finalize();
}

async function uploadFiles(localPath, remotePath) {
  await ssh.connect({
    host: SERVER,
    username: USERNAME,
    password: PASSWORD,
    port: 22,
  });
  console.log("SSH Connection established.");

  const localFilePath = path.resolve(localPath);
  const remoteFilePath = path.join(remotePath, path.basename(localPath));

  console.log(`Uploading ${localFilePath} to ${remoteFilePath}`);

  if (!fs.existsSync(localFilePath)) {
    throw new Error(`File ${localFilePath} does not exist.`);
  }

  await ssh.execCommand(`rm dist-prod.zip`);

  try {
    await ssh.putFile(localFilePath, remoteFilePath);
  } catch (err) {
    throw new Error(err);
  }

  console.log(`Files uploaded to ${remoteFilePath}`);
}

async function deploy() {
  const result = await ssh.execCommand("sh deploy.sh", { cwd: REMOTE_DIR });
  console.log("STDOUT: " + result.stdout);
  console.log("STDERR: " + result.stderr);
}

async function main() {
  const git = simpleGit(REPO_DIR);

  // 拉取最新的代码
  await git.pull("origin", GIT_BRANCH);

  // 编译打包
  // await build();

  // 创建ZIP文件
  await distZip();

  // 上传文件
  await uploadFiles(ZIP_PATH, REMOTE_DIR);

  // 部署
  await deploy();

  // 断开SSH连接
  ssh.dispose();
}

main().catch((err) => console.error(err));
