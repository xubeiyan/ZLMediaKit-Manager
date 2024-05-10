# ZLMediaKit Media Server Web Manager

## 简介

针对 `ZLMediaKit` 开发的 Web 前端框架，减少调试的困难

## 使用技术

使用了 `Vue3` 框架和 `Vuetify3` UI 框架

使用搭配 `rollup` 的 `Vite` 构建

## 安装方法

1. `clone`本仓库至 `ZLMediaKitFrontend`，切换目录至当前仓库

```bash
$ git clone https://github.com/xubeiyan/ZLMediaKit-Manager --depth=1 ZLMediaKitFrontend 

$ cd ZLMediaKitFrontend
```

2. 安装所需依赖（这里使用的是`pnpm`，其他类似）

```bash
pnpm i
```

3. 进行打包，会在当前目录生成`dist`文件夹

```bash
# 生成生产环境的包
$ pnpm run build

# 生成预览
$ pnpm run preview
```

4. 复制到 web 目录

* 假设 web 目录为 `/opt/zlmk`，终端工作目录为当前仓库目录

```bash
# 新建目录
$ mkdir /opt/zlmk 
```

* 复制 `dist` 到 `/opt/zlmk`

```bash
$ cp dist/ /opt/zlmk
```

5. 配置Web服务器软件，使其可以访问（本步骤省略）

