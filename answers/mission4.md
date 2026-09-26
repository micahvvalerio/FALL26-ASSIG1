# Mission 4: Report it and brief the owner

## Commit history

Output of `git log --oneline`:

```
22d84ba (HEAD -> assignment1) answers to mission 2
5acef30 answers
67f5eb8 added answers
d890ff1 (origin/main, origin/HEAD, main) first push with the assignment files
294714d Initial commit
```

Pick your **best** commit message and your **worst** one. Which of the 7 rules does the worst one break?

My best commit message was answers to mission 2. My worst is answers since it is too vague and does not explain what changed. It breaks the rule that a commit message should clearly describe the change.

## Pull Request

PR link, inside your fork:

> https://github.com/...

## Creating value: the risk brief

The Operations Manager who owns the portal is not a developer. Write a brief of **120 to 180 words** addressed to them. It must answer:

1. What you proved, in terms of **impact** on operators and on the campus, not in terms of code.
2. Why "it uses HTTPS and validates its data" did **not** protect them.
3. The single most important change the backend team must make, stated concretely.
4. One honest limit of your engagement: what you did **not** test.

We conducted testing that demonstrated what would happen if someone ran code through the operator's browser. Specifically, it showed how it could change what the operator sees and how the portal operates. For example, we made services appear as online even during an outage and we made a button stop functioning. As a result, operators may not be able to identify these real problems in time, which affects campus services. Data validation and HTTPS did not stop the attacker because it occured after the page has loaded so inside the browser and the portal trusted the information that the browser showed. The most important change is rather than trusting the browser, the backend must check all important actions and service information. A honest limit to our testing would be that we only tested the provided local portal and not any real campus systems or networks. 

## Reflection

In one or two sentences: which concept from Units 1.1 to 1.3 do you understand much better now, and what made it click?

I understand client-side security a bit more. I learned that browser-side JavaScript can be changed, so instead of relying only on the browser, it should be enforced by the server 
