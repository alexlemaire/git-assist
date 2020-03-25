![](https://img.shields.io/github/package-json/v/alexlemaire/git-assist)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/alexlemaire/git-assist?color=blue)

**GitHub Actions workflows status**

![](https://img.shields.io/github/workflow/status/alexlemaire/git-assist/publish?label=publish&logo=npm)
![](https://img.shields.io/github/workflow/status/alexlemaire/git-assist/upload?label=upload&logo=Amazon%20AWS)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/alexlemaire/git-assist?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/alexlemaire/git-assist)
[![](https://img.shields.io/codeclimate/tech-debt/alexlemaire/git-assist?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/alexlemaire/git-assist)
<!-- [![](https://img.shields.io/codeclimate/coverage/alexlemaire/git-assist?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/alexlemaire/git-assist) -->

---

# git-assist (WIP)

**Attention: this is a work in progress. Some features are currently working and you can try this package and play around with it but be aware that major changes may land in the near future**

This helper allows users to easily manage _GitHub_ on their machines. Some features are aimed at developers while some are aiming novice users/non developers.

## How to use it

- **developers:** you can type `git-assist` as soon as your package is installed to enter interactive mode. Otherwise if you know which command to call simply do `git-assist <command> <arguments>`
- **non-developers:** you can copy files from the [easy-use](./easy-use) folder and use them directly (see [docs](./easy-use/README.md) to know how to use them)

## Features

| Feature     | Config           | SSH                        | GPG                        | Clone              | Push                                                           | Auto-pull                                                                                           | Help                        | Version                                         |
|-------------|------------------|----------------------------|----------------------------|--------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------|-------------------------------------------------|
| Description | Setup `git` user | Generate/configure SSH key | Generate/configure GPG key | Clone repositories | Easy push (git add/commit/push all in one via interactive CLI) | Automatically pull for repositories (on machine startup/schedule/etc). Offers configuration options | Get help about `git-assist` | Print current installed version of `git-assist` |
| Command     | `config`         | `generate-ssh`             | `generate-gpg`             | `clone`            | `push`                                                         | `auto-pull`                                                                                         | `--help`                    | `--version`                                     |
| Arguments   | `-g`             |                            |                            |                    |                                                                |                                                                                                     |                             |                                                 |
| Status      | ✓                | ✓                          | ✓                          | ✓                  | ⏲                                                              | ❌                                                                                                   | ✓                           | ✓                                               |

## OS support

| Windows | Linux | MacOS |
|---------|-------|-------|
| ❌       | ✓     | ❌     |

## Notes

- this is an expansion upon a private work made to automate git pull at machine startup for every repositories
- tested on Linux. Cannot guarantee this will work with other OS
