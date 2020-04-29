<div align="center">
  <img src="static/git-assist-logo.jpg">

  ![Package version](https://img.shields.io/github/package-json/v/alexlemaire/git-assist?color=blue)
  [![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/alexlemaire/git-assist)](https://snyk.io/test/github/alexlemaire/git-assist)
  [![Depfu](https://badges.depfu.com/badges/370e3d75a8141b8e5bf0ea1f2c891132/overview.svg)](https://depfu.com/github/alexlemaire/git-assist?project_id=11766)

  ![Publish action status](https://img.shields.io/github/workflow/status/alexlemaire/git-assist/publish?label=publish&logo=npm)
  ![Upload action status](https://img.shields.io/github/workflow/status/alexlemaire/git-assist/upload?label=upload&logo=Amazon%20AWS)

  [![](https://img.shields.io/codeclimate/maintainability/alexlemaire/git-assist?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/alexlemaire/git-assist)
  [![](https://img.shields.io/codeclimate/tech-debt/alexlemaire/git-assist?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/alexlemaire/git-assist)
  <!-- [![](https://img.shields.io/codeclimate/coverage/alexlemaire/git-assist?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/alexlemaire/git-assist) -->

  ![Linux support](static/linux-badge.svg)
  ![MacOS support](static/mac-badge.svg)
  ![Windows support](static/windows-badge.svg)
</div>

## <img src="https://emoji.fileformat.info/gemoji/space_invader.png" width="32px"> What is `git-assist`?

This package allows users to easily manage _GitHub_ on their machines. Some features are aimed at developers while some are aiming novice users/non developers.

## <img src="https://emoji.fileformat.info/gemoji/package.png" width="32px"> How to install it

1. open a new terminal (can be _Terminal_ for _MacOS_, _cmd.exe_ for _Windows_, _Konsole_ for _Kubuntu_, etc.)
2. run `npm i -g git-assist`

<img src="https://emoji.fileformat.info/gemoji/warning.png" width="16px"> You will need to have `node` and `npm` installed on your machine for this to work.

Some other dependencies are also required for some of the utilities contained in this package to work. See [here](#required-dependencies).

## <img src="https://emoji.fileformat.info/gemoji/computer.png" width="32px"> How to use it

- **developers (CLI usage):** you can type `git-assist` as soon as your package is installed to enter interactive mode. Otherwise if you know which command to call simply do `git-assist <command> <arguments>`
- **non-developers (non-CLI usage):** you can copy files from the [easy-use](./easy-use) folder and use them directly (see [docs](./easy-use/README.md) to know how to use them)

<img src="https://emoji.fileformat.info/gemoji/warning.png" width="16px"> **Important: when using _two-factor authentication_ and _https_ protocol to work with _GitHub_, you should generate an access token in place of your password to be able to authenticate.**

<img src="https://emoji.fileformat.info/gemoji/point_right.png" width="16px"> You will find the process for creating an access token for your account [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

<img src="https://emoji.fileformat.info/gemoji/question.png" width="16px"> _Note:_ when choosing options for your token, you can go with _repo_ (all checkbox), _admin:repo_hook_ (all checkbox) and _delete_repo_.

## <img src="https://emoji.fileformat.info/gemoji/link.png" width="32px"> Required dependencies

Until work has been done to automate dependencies installation on package installation (or suppress some of them), here are the dependencies that needs to be on your computer for this utility to work correctly:
- `git`
- `gpg` (to generate GPG keys)
- `ssh` (to generate ssh keys)
- Linux only: `libsecret` & `gnome-keyring`

## <img src="https://emoji.fileformat.info/gemoji/closed_lock_with_key.png" width="32px"> Password management

Password management is handled via `keytar` (check it out [here](https://www.npmjs.com/package/keytar)). `keytar` is using system specific solutions in order to store your password in a secure way. This allows `git-assist` to reuse your saved password when working with _GitHub_ via HTTPS and not prompt you every time for it.

**For _Linux_ users:** you may encounter some undesired behavior if you use `git-assist` without a preconfigured keyring to store your passwords. It seems like `keytar` is creating for you a default keyring with a set password if no default keyring was found on first run. This can lead users to not being able to unlock this keyring afterward and therefore freezes some applications.

Below are details on how to handle/prevent this situation.

**Please install `seahorse` on your system via your package manager to get access to a frontend to manage your keyrings easily.**

### <img src="https://emoji.fileformat.info/gemoji/question.png" width="24px"> How to configure an initial keyring (Linux)

It is recommended to perform this step before working with `git-assist` if you don't have a keyring set up on your machine already.

1. start `seahorse` via your application manager
2. click _File_ > _New_
3. type `login` when prompted for the name of the keyring
4. type a password that you will remember when prompted for a password
5. back on the main page of `seahorse`, right click on your newly created keyring and click on _Set as default_

### <img src="https://emoji.fileformat.info/gemoji/question.png" width="24px"> How to fix a locked default keyring (Linux)

If you started using `git-assist` with no keyring configured it is possible that some of your apps may be frozen because the keyring would be locked (since you don't know the password to unlock it).

1. go into `~/.local/share/keyrings` either via your console and via your file explorer
2. delete the file containing `default` in its name and ending with `.keyring` (via terminal or file explorer)
3. start `seahorse` via your application manager
4. right click on the keyring containing `default` in its name and click on `Delete`
5. when prompted, confirm deletion
6. follow the steps 2 to 5 in the section [above](#how-to-configure-an-initial-keyring-linux) to create a new default keyring

## <img src="https://emoji.fileformat.info/gemoji/bulb.png" width="32px"> Available features

|   Feature   |      Config      |             SSH            |             GPG            |        Clone       |                              Push                              |             Pull            |                                              Auto-pull                                              |                                        Logs                                        |             Help            |                     Version                     |
|:-----------:|:----------------:|:--------------------------:|:--------------------------:|:------------------:|:--------------------------------------------------------------:|:---------------------------:|:---------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------:|:---------------------------:|:-----------------------------------------------:|
| Description | Setup `git` user | Generate/configure SSH key | Generate/configure GPG key | Clone repositories | Easy push (git add/commit/push all in one via interactive CLI) | Easy pull (interactive CLI) | Automatically pull for repositories (on machine startup/schedule/etc). Offers configuration options |                             Print out desired logs file                            | Get help about `git-assist` | Print current installed version of `git-assist` |
|   Command   |     `config`     |       `generate-ssh`       |       `generate-gpg`       |       `clone`      |                             `push`                             |            `pull`           |                                             `auto-pull`                                             |                                       `logs`                                       |       `--help` or `-h`      |               `--version` or `-v`               |
|  Arguments  |       `-g`       |                            |                            |                    |                                                                |                             |                                          `--config` or `-c`                                         | `[file1, file2, ..., fileN]` `--watch [file]` `--purge [file1, file2, ..., fileN]` |                             |                                                 |
|    Status   |         ✔️        |              ✔️             |              ✔️             |          ✔️         |                                ✔️                               |              ✔️              |                                                  ✔️                                                  |                                          ✔️                                         |              ✔️              |                        ✔️                        |

## <img src="https://emoji.fileformat.info/gemoji/wrench.png" width="32px"> OS support

| Windows | Linux | MacOS |
|:-------:|:-----:|:-----:|
| ❓       | ✔️     | ⏲     |

## <img src="https://emoji.fileformat.info/gemoji/bookmark.png" width="32px"> Legend

| Icon |           Meaning           |
|:----:|:---------------------------:|
|   ✔️  |     Implemented/working     |
|   ⏲  |       Work in progress      |
|   ❓  |          Not tested         |
|   ❌  | Not implemented/not working |

_*Logo generated via [Tailor Brands](https://www.tailorbrands.com/)_
