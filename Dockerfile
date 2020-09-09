
FROM node:11 as build

#设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

# 切换为阿里源
RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /webapp

COPY package.json package-lock.json ./

RUN npm install tslib  && npm install --production 


#使用alpine的node版本可以减少90%的体积
FROM node:11-alpine

COPY --from=build /webapp/node_modules  /node_modules

COPY . .
# 暴露端口映射
EXPOSE 3000

ENTRYPOINT ["npm", "run","docker"]


