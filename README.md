## React Easy Start
常用的React脚手架，create-react-app太轻，用它搭建需要对react生态的各个知识点掌握好。相反，ant-design-pro太重，维护其代码还是挺复杂的，很多功能根本不需要，去掉也很有很大的工作量。本脚手架基于create-react-app加了具备ant-design-pro的框架功能(如图)，开发人员只需关注自己的业务功能。
## Installation
```
git clone https://github.com/sunnut/react-easy-start.git
cd react-easy-start
npm install
npm run mock
npm start
```  
## Dependencies
* React 16.7      --hooks
* Redux           --状态管理
* React-Router-V4 --多页面
* Ant Design      --UI
* React Intl      --国际化
* Gulp            --合并国际化词条
* Restify         --Mock服务器
## 主要解决的问题
* React、Redux、React-Router-V4等整合
* [组件](https://zhuanlan.zhihu.com/p/40134493)按功能划分
* [国际化](https://zhuanlan.zhihu.com/p/40176138)
* [服务器交互](https://zhuanlan.zhihu.com/p/40512216)
* [侧边栏](https://zhuanlan.zhihu.com/p/41111300)更易配置
* [样式](https://zhuanlan.zhihu.com/p/50837353)使用局部结合全局
* 全局等待效果 & 局部组件加载等待
* ...
## Examples
#### Login
![Screenshot](https://github.com/sunnut/react-easy-start/blob/master/images/ex1.png?raw=true "login")
#### Dashboard with sidebar not collapsed
![Screenshot](https://github.com/sunnut/react-easy-start/blob/master/images/ex2.png?raw=true "dashboard")
#### Dashboard with sidebar not collapsed
![Screenshot](https://github.com/sunnut/react-easy-start/blob/master/images/ex3.png?raw=true "dashboard")