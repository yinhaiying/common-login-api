## 接口文档
**baseUrl**
```javascript
https://common-login-api.herokuapp.com
```


## user
注册
```javascript
url: /api/users/register
params:
    username:string
    password:string
    email?:string;
    avatar?:string
```

登录
```javascript
url: /api/users/login
params:
    username:string
    password:string
```

获取用户信息
```javascript
/getUserInfo
```
