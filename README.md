![](https://img.shields.io/github/package-json/v/alexlemaire/git-assist)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/alexlemaire/git-assist?color=blue)

**GitHub Actions workflows status**

![](https://img.shields.io/github/workflow/status/alexlemaire/git-assist/publish?label=publish&logo=npm)
![](https://img.shields.io/github/workflow/status/alexlemaire/git-assist/upload?label=upload&logo=Amazon%20AWS)

---

# git-assist (WIP)

**Attention: this is a work in progress. Some features are currently working and you can try this package and play around with it but be aware that major changes may land in the near future**

This helper allows users to easily manage _GitHub_ on their machine. Some features are aimed at developers while some are aiming novice users/non developers.

_Features:_
- setup `git` user
- generate/configure SSH key
- generate/configure PGP key
- easy push (git add/commit/push all in one via interactive CLI)
- automatically pull for repositories (on machine startup/schedule/etc). Offers configuration options

_Notes:_
- this is an expansion upon a private work made to automate git pull at machine startup for every repositories
- tested on Linux. Cannot guarantee this will work with other OS
