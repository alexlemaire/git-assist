![](https://img.shields.io/github/package-json/v/alexlemaire/git-assist?color=blue)
[![Known Vulnerabilities](https://snyk.io/test/github/alexlemaire/git-assist/badge.svg)](https://snyk.io/test/github/alexlemaire/git-assist)
[![Depfu](https://badges.depfu.com/badges/370e3d75a8141b8e5bf0ea1f2c891132/overview.svg)](https://depfu.com/github/alexlemaire/git-assist?project_id=11766)

![](https://img.shields.io/github/workflow/status/alexlemaire/git-assist/publish?label=publish&logo=npm)
![](https://img.shields.io/github/workflow/status/alexlemaire/git-assist/upload?label=upload&logo=Amazon%20AWS)

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

:warning: **Important: when using _two-factor authentication_ and _https_ protocol to work with _GitHub_, you should generate an access token in place of your password to be able to authenticate.**

:point_right: You will find the process for creating an access token for your account [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

:question: _Note:_ when choosing options for your token, you can go with _repo_ (all checkbox), _admin:repo_hook_ (all checkbox) and _delete_repo_.

## Required dependencies

Until work has been done to automate dependencies installation on package installation (or suppress some of them), here are the dependencies that needs to be on your computer for this utility to work correctly:
- `git`
- `gpg` (to generate GPG keys)
- `ssh` (to generate ssh keys)
- Linux only: `libsecret` & `gnome-keyring`

## Features

|   Feature   |      Config      |             SSH            |             GPG            |        Clone       |                              Push                              |             Pull            |                                              Auto-pull                                              |             Help            |                     Version                     |
|:-----------:|:----------------:|:--------------------------:|:--------------------------:|:------------------:|:--------------------------------------------------------------:|:---------------------------:|:---------------------------------------------------------------------------------------------------:|:---------------------------:|:-----------------------------------------------:|
| Description | Setup `git` user | Generate/configure SSH key | Generate/configure GPG key | Clone repositories | Easy push (git add/commit/push all in one via interactive CLI) | Easy pull (interactive CLI) | Automatically pull for repositories (on machine startup/schedule/etc). Offers configuration options | Get help about `git-assist` | Print current installed version of `git-assist` |
|   Command   |     `config`     |       `generate-ssh`       |       `generate-gpg`       |       `clone`      |                             `push`                             |            `pull`           |                                             `auto-pull`                                             |           `--help`          |                   `--version`                   |
|  Arguments  |       `-g`       |                            |                            |                    |                                                                |                             |                                                                                                     |                             |                                                 |
|    Status   |         ✓        |              ✓             |              ✓             |          ✓         |                                ✓                               |              ✓              |                                                  ❌                                                  |              ✓              |                        ✓                        |

## OS support

| Windows | Linux | MacOS |
|:-------:|:-----:|:-----:|
| ❓       | ✔️     | ⏲     |

## Legend

| Icon |           Meaning           |
|:----:|:---------------------------:|
|   ✔️  |     Implemented/working     |
|   ⏲  |       Work in progress      |
|   ❓  |          Not tested         |
|   ❌  | Not implemented/not working |

## Notes

- this is an expansion upon a private work made to automate git pull at machine startup for every repositories
- tested on Linux. Cannot guarantee this will work with other OS
