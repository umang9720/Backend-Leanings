Access token
- short
- expires often
- used for APIs

Refresh token
- long
- stored in httpOnly cookie
- used ONLY for /refresh
- rotated silently

401 from backend
↓
call /refresh
↓
retry request


Login once
↓
Access token expires → silent refresh
↓
Refresh token expires → login required


| Token type    | Lifetime      | Used for                  |
| ------------- | ------------- | ------------------------- |
| Access token  | 5–15 minutes  | API requests              |
| Refresh token | 7–30 days     | Getting new access tokens |


Login
↓
Access token (15m)
↓
401 → /refresh
↓
Rotate refresh token
↓
New access token
↓
Continue forever (while active)

