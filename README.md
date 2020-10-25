## JWT Authentication (JSON WEB TOKEN)
<p style="text-align:center">
<img src="https://fullstackmark.com/img/posts/19/jwt-flow-using-authentication-server-with-access-token-and-refresh-token-and-resource-server.png" />
</p>

💻 API
 - /login 👉
```
Method: GET
Parms(Headers): username, password
Return: login_status and token
```
 - /register 👉
```
 Method: POST
 Params(Body): username, password
 Return: register_status
```

 - /jwt_validation 👉
```
Method: GET
Params(Headers): "Baerer <token>"
Return: token_is_valid and token_decoded
```
 - /refresh_token 👉
```
Method: GET
Params(Headers): user_id, username, password, jwt_token
Return: refresh_token
```
