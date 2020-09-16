
#下载项目文件的node_modules
FROM node:11 as build

# 切换为阿里源
RUN npm config set registry http://47.113.105.208:8088/

WORKDIR /webapp

COPY package.json ./

RUN npm install


#获取生产文件
FROM node:11 as builddist

WORKDIR /web

COPY --from=build /webapp/node_modules  ./node_modules

COPY . .

RUN npm run build

# RUN dir


#下载生产的node_modules
FROM node:11 as distnodemodules

# 切换为阿里源
RUN npm config set registry http://47.113.105.208:8088/

WORKDIR /webapp

COPY package.json ./

RUN npm install tslib  && npm install --production


#产出生产镜像
FROM node:11-alpine

#设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

WORKDIR /web

COPY --from=distnodemodules /webapp/node_modules ./node_modules

COPY --from=builddist /web/dist ./


# 暴露端口映射
# EXPOSE 2000
ENTRYPOINT ["npm", "run","docker"]


