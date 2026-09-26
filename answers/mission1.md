# Mission 1: Python habits that break JavaScript security

## Evidence

Output of `npm run test:m1`, pasted or as a screenshot in `img/`:

```
  PASS  missing latencyMs is rejected

parseStatusReport()
  PASS  invalid JSON fails safe
  PASS  missing services array fails safe
  PASS  services that is not an array fails safe
  PASS  JSON null fails safe
  PASS  mixed report keeps valid entries and counts rejected ones

24 passed, 0 failed
```

## Connections: Python to JavaScript

For each check you implemented, write how you would do it in Python and how you did it in JavaScript.

| Rule | Python | JavaScript, as in my code |
|---|---|---|
| raw is a dictionary or object, not a list | type(raw) == dict | raw !== null && typeof raw === "object" && !Array.isArray(raw) |
| name is a non-empty string after trimming | len(raw['name'].strip()) > 0 | typeof raw.name === "string" && raw.name.trim().length > 0 |
| status is one of the allowed values | raw['status'] in ALLOWED_STATUS | ALLOWED_STATUS.includes(raw.status) |
| online is a real boolean | type(raw['online']) == bool | typeof raw.online === "boolean" |
| latencyMs is a finite number ≥ 0 | raw['latencyMs'] >= 0 | typeof raw.latencyMs === "number" && Number.isFinite(raw.latencyMs) && raw.latencyMs >= 0 |
| invalid JSON does not crash the program | try: / except: | try { ... } catch (error) { ... } |


## Questions

1. Why is `latencyMs: 0` a trap for code such as `if (!raw.latencyMs) return null;`?

   In JavaScript, the integer 0 is considered a falsy value. 


2. Your function builds a **new** object and ignores fields like `isAdmin`. Describe in two or three sentences what could go wrong later in an application that copied **every** field it received.

   An attacker can inject fake variables such as `isAdmin: true` or `role: "admin"` directly. If the application copies everything, it could change their privileges.


## Documentation log

| Page I used, with URL | One thing I learned from it |
|Class slides|Learned about JavaScript falsy zero|
| | |
