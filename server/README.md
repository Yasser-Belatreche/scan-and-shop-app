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

## Google Auth

### **Request**

```
EndPoint: POST /api/users/auth/google

Expected body:
{
  idToken: THE_USER_GOOGLE_ID_TOKEN
}
```

### **Response Body**

```
{
  success: true,
  data: 'Bearer THE_USER_TOKEN'
}
```

## Facebook Auth

### **Request**

```
EndPoint: POST /api/users/auth/facebook

Expected body:
{
  accessToken: THE_USER_FACEBOOK_ACCESS_TOKEN
}
```

### **Response Body**

```
{
  success: true,
  data: 'Bearer THE_USER_TOKEN'
}
```

## Reset Password

### **Request**

```
EndPoint: POST /api/users/resetPassword

Expected Headers:
{
  ...
  authorization: Bearer THE_USER_TOKEN
  ...
}

Expected body:
{
  password: YOUR_NEW_PASSWORD,
  confirmPassword: YOUR_NEW_PASSWORD
}
```

### **Response Body**

```
{
  success: true,
  data: 'password of the user with id TARGET_USER_ID has successfully changed'
}
```

## sendVerificationEmail

### **Request**

```
EndPoint: POST /api/users/sendVerificationEmail

Expected body:
{
  email: THE_TARGET_EMAIL
}
```

### **Response Body**

```
{
  success: true,
  data: 'the verification code sent successfully to THE_TARGET_EMAIL'
}
```

## verifyCode

### **Request**

```
EndPoint: POST /api/users/verifyCode

Expected body:
{
  email: THE_TARGET_EMAIL,
  code: THE_RECIEVED_VERIFICATION_CODE
}
```

### **Response Body**

```
{
  success: true,
  data: 'Bearer THE_USER_TOKEN'
}
```

## imageRecognition

### **Request**

```
EndPoint: POST /api/products/imageRecognition

Expected Headers:
{
  'Content-Type': 'multipart/form-data'
}

Expected body: {
  [image in FORM_DATA with the name: 'image']
}
```

### **Response Body**

```
{
  success: true,
  data: {
    product: PRODUCT_NAME,
    descriptiveLabel: PRODUCT_LABEL,
    logo: LOGO_IF_EXIST,
    dominantColor: {
      rgb: 'rgb(RED, GREEN, BLUE)',
      hex: 'HEX_COLOR'
    },
  }
}
```
