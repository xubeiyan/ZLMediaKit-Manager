# ZLMediaKit Media Server Web Manager

## 简介

针对 `ZLMediaKit` 开发的 Web 前端框架，减少调试的困难

## 使用技术

使用了 `Vue3` 框架和 `Vuetify3` UI 框架

使用搭配 `rollup` 的 `Vite` 构建

## 安装方法

1. `clone`本仓库，切换目录至当前仓库

```bash
$ git clone https://github.com/xubeiyan/ZLMediaKit-Manager --depth=1  

$ cd ZLMediaKitFrontend
```

2. 安装所需依赖（这里使用的是`pnpm`，其他类似）

```bash
pnpm i
```

3. 进行打包，生成的`target`文件夹，复制到合适位置即可使用

```bash
# 生成生产环境的包
$ pnpm run build

# 生成预览
$ pnpm run preview
```
