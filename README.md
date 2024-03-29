# ⚠️ Repository status

---

**This repository is no longer maintained!** 😦

---

## What is `git-assist`?

This package allows users to easily manage _GitHub_ on their machines. Some features are aimed at developers while some are aiming novice users/non developers.

**Examples of what can be done:**
- commit, stage & push operation at once via interactive CLI
- pull (for current, multiple or all branches)
- clone a repository
- generate an SSH key and automatically work with it inside of `git-assist`
- generate a GPG key and automatically work with it inside of `git-assist`
- configure user globally or for a repository
- setup `git-assist` so that it auto-pulls from multiple repository. This can also be scheduled to run on machine startup or following a _cron_ pattern

## How to install it

**via NPM (recommended)**

```
npm i -g git-assist
```

You will need to have `node` and `npm` installed on your machine for this to work.

Some other dependencies are also required for some of the utilities contained in this package to work. See [here](#required-dependencies).

**via install script**

If you don't feel comfortable with the command line/you don't have `npm` installed on your machine, you can use the install script (`install.sh`) available in the [easy-use](./easy-use) folder (see [docs](./easy-use/README.md) to know how to use them).

To install `git-assist` following this method:

1. download the appropriate collection of scripts for your OS following the appropriated link below
2. extract this collection on your machine
3. double click on `install.sh`

This will install `git-assist` on your machine as well as all [necessary system dependencies](#required-dependencies).

This script is part of a collection of scripts available here:
- [Linux](https://cdn.klimapartner.net/alexis/@git-assist/easy-use_Linux.zip)
- [Mac](https://cdn.klimapartner.net/alexis/@git-assist/easy-use_Mac.zip)
- **Windows**: not created yet...

_Tip:_ you can use `update.sh` when `git-assist` is installed to update it to the latest version if yours is outdated.

## How to use it

- **via CLI:** you can type `git-assist` to enter interactive mode. Otherwise if you know which command to call simply do `git-assist <command> <arguments>`
- **non-CLI usage:** you can copy files from the [easy-use](./easy-use) folder and use them directly inside of your repository (see [docs](./easy-use/README.md) to know how to use them)

If needed, call `git-assist [-h, --help] <function_name>` in order to get access to the help for `git-assist` or any of its utilities!

**Important: when using _two-factor authentication_ and _https_ protocol to work with _GitHub_, you should generate an access token in place of your password to be able to authenticate.**

You will find the process for creating an access token for your account [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

_Note:_ when choosing options for your token, you can go with _repo_ (all checkbox), _admin:repo_hook_ (all checkbox) and _delete_repo_.

## <a name="required-dependencies"></a> Required dependencies

Until work has been done to automate dependencies installation on package installation (or suppress some of them), here are the dependencies that needs to be on your computer for this utility to work correctly:
- `git`
- `gpg` (to generate GPG keys)
- `ssh` (to generate ssh keys)
- Linux only: `libsecret` & `gnome-keyring`

## Password management

Password management is handled via `keytar` (check it out [here](https://www.npmjs.com/package/keytar)). `keytar` is using system specific solutions in order to store your password in a secure way. This allows `git-assist` to reuse your saved password when working with _GitHub_ via HTTPS and not prompt you every time for it.

**For _Linux_ users:** you may encounter some undesired behavior if you use `git-assist` without a preconfigured keyring to store your passwords. It seems like `keytar` is creating for you a default keyring with a set password if no default keyring was found on first run. This can lead users to not being able to unlock this keyring afterward and therefore freezes some applications.

Below are details on how to handle/prevent this situation.

**Please install `seahorse` on your system via your package manager to get access to a frontend to manage your keyrings easily.**

### <a name="initial-keyring-config"></a> How to configure an initial keyring (Linux)

It is recommended to perform this step before working with `git-assist` if you don't have a keyring set up on your machine already.

1. start `seahorse` via your application manager
2. click _File_ > _New_
3. type `login` when prompted for the name of the keyring
4. type a password that you will remember when prompted for a password
5. back on the main page of `seahorse`, right click on your newly created keyring and click on _Set as default_

### How to fix a locked default keyring (Linux)

If you started using `git-assist` with no keyring configured it is possible that some of your apps may be frozen because the keyring would be locked (since you don't know the password to unlock it).

1. go into `~/.local/share/keyrings` either via your console and via your file explorer
2. delete the file containing `default` in its name and ending with `.keyring` (via terminal or file explorer)
3. start `seahorse` via your application manager
4. right click on the keyring containing `default` in its name and click on `Delete`
5. when prompted, confirm deletion
6. follow the steps 2 to 5 in the section [above](#initial-keyring-config) to create a new default keyring

## Available features

|   Feature   |      Config      |                                                                                    SSH                                                                                    |                                                                                    GPG                                                                                    |        Clone       |                              Push                              |             Pull            |                                              Auto-pull                                              |                                                                            Logs                                                                           |             Help            |                     Version                     |
|:-----------:|:----------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------:|:--------------------------------------------------------------:|:---------------------------:|:---------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------:|:-----------------------------------------------:|
| Description | Setup `git` user |                                                                            Manipulate SSH keys                                                                            |                                                                             Manipulate GPG key                                                                            | Clone repositories | Easy push (git add/commit/push all in one via interactive CLI) | Easy pull (interactive CLI) | Automatically pull for repositories (on machine startup/schedule/etc). Offers configuration options |                                                                  Prints `git-assist` logs                                                                 | Get help about `git-assist` | Print current installed version of `git-assist` |
|   Command   |     `config`     |                                                                                   `ssh`                                                                                   |                                                                                   `gpg`                                                                                   |       `clone`      |                             `push`                             |            `pull`           |                                             `auto-pull`                                             |                                                                           `logs`                                                                          |       `--help` or `-h`      |               `--version` or `-v`               |
|  Arguments  |       `-g`       | `--generate`: generate a new key for given user,  `--list`: list all keys generated via `git-assist`,  `--delete`: delete one or multiple keys generated via `git-assist` | `--generate`: generate a new key for given user,  `--list`: list all keys generated via `git-assist`,  `--delete`: delete one or multiple keys generated via `git-assist` |                    |                                                                |                             |                                          `--config` or `-c`                                         | `[file1, file2, ..., fileN]`: target specific log,  `--watch [file]`: watch a given log file,  `--purge [file1, file2, ..., fileN]`: purge given log file |                             |                                                 |
|    Status   |         ✔️        |                                                                                     ✔️                                                                                     |                                                                                     ✔️                                                                                     |          ✔️         |                                ✔️                               |              ✔️              |                                                  ✔️                                                  |                                                                             ✔️                                                                             |              ✔️              |                        ✔️                        |

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
