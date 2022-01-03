# Run the server

Open your terminal window and run the following commands :

```
~$ cd server
~$ npm install
~$ npm start
```

# API

The api ends points :

## Login

---

### **Request**

```
EndPoint: POST /api/users/login

Expected body:
{
  email: example@gmail.com
  password: superSecretPassword
}
```

### **Response Body**

```
{
  success: true,
  data: 'Bearer THE_USER_TOKEN'
}
```

## Signup

---

### **Request**

```
EndPoint: POST /api/users/signup

Expected body:
{
  name: John Doe,
  email: example@gmail.com,
  password: superSecretPassword,
}
```

### **Response Body**

```
{
  success: true,
  data: 'Bearer THE_USER_TOKEN'
}
```
