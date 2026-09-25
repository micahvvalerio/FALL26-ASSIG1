# Mission 0: Get the code, the professional way

**Name: Micah Valerio**
**GitHub username: micahvvalerio**

## Evidence

### `git remote -v`
```
origin  https://github.com/micahvvalerio/FALL26-ASSIG1.git (fetch)
origin  https://github.com/micahvvalerio/FALL26-ASSIG1.git (push)
```

### `git branch`
```
* assignment1
  main
```

### `git status` before the `.gitignore` fix
```
On branch assignment1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   answers/mission0.md
        modified:   public/js/validator.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        node_modules/
        package-lock.json

no changes added to commit (use "git add" and/or "git commit -a")
```

### `git status` after the `.gitignore` fix
```
On branch assignment1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   answers/mission0.md
        modified:   public/js/validator.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        package-lock.json

no changes added to commit (use "git add" and/or "git commit -a")
```

## Questions

1. Which folder should not be committed, and why? Give one practical reason and one security-related reason.

   The folder is node_modules/
   Practical reason: The folder is too large and long to upload.
   Security-related reason: It can leak local configuration settings from my computer.

2. What line or lines did you add to `.gitignore`? What does a trailing `/` mean in a `.gitignore` pattern?

   I added node_modules/ to the file. The trailing / ignores the folder and the content inside it.


3. **Connections:** in one or two sentences, what is the difference between a **fork** and a **clone**? Which one lives on GitHub and which one lives on your machine?

   A fork is when you clone a repository and a clone is a copy that is downloaded onto your computer.

## Documentation log

| Page I used, with URL | One thing I learned from it |
|Class slides|Learned how to use .gitignore to hide folders|
| | |
