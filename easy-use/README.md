# Easy-use

Those scripts are mainly intended for non-developer users. It eases the process of running a basic configuration for your machine and allows you to quickly work with GitHub.

## How to get those scripts

Two solutions:
1. You can clone `git-assist` [repository](https://github.com/alexlemaire/git-assist) on your machine ([how?](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)) to access those scripts directly
2. You will also find the latest version to download [here](https://cdn.klimapartner.net/alexis/@git-assist/easy-use.zip) as a _ZIP_ archive. **Note:** to get OS specific scripts instead of the entire collection, head here:
  - [Linux](https://cdn.klimapartner.net/alexis/@git-assist/easy-use_Linux.zip)
  - [Mac](https://cdn.klimapartner.net/alexis/@git-assist/easy-use_Mac.zip)

:warning: **Warning:** you may have changed your default settings to open `.sh` files via something else than your terminal on your system. If so, those scripts won't work as intended... To fix this:
- _Linux users_:
  1. Right-click on a file that uses the file type you'd like to change the default for (`.sh` in our case, you can use the files you've just downloaded)
  2. Click on `Properties`
  3. Click on the `Open With` tab
  4. Select your terminal application (`Konsole` for _Kubuntu_ for example)
  5. Click on `Set as default`
- _Mac users_:
  1. Right-click on a file that uses the file type you'd like to change the default for (`.sh` in our case, you can use the files you've just downloaded)
  2. Click on `Get Info` in the pop-up
  3. Click `Open With` if the section isn't already expanded
  4. Click the dropdown and choose `Terminal`
  5. Click `Change All...`
  6. Click `Continue` when the Finder asks you if you're sure

## How to use those scripts?

Simply double click the script you want to use! :tada:

:warning: **Warning:** all those scripts uses an hidden directory `.scripts` in the background to work. All the naming + hidden directory pattern was done to limit user errors but mishaps can happen. Do not modify anything in `.scripts` and the scripts themselves if you're not sure of what you're doing! (mostly for people not working with `bash` scripts)

## Scripts

|  Script |                                `full-setup.sh`                                |                                `install.sh`                                |                                                    `machine-config.sh`                                                    |                  `clone.sh`                  |                                              `update.sh`                                             |                        `push.sh`                        |                     `pull.sh`                    |
|:-------:|:-----------------------------------------------------------------------------:|:--------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------:|:----------------------------------------------------------------------------------------------------:|:-------------------------------------------------------:|:------------------------------------------------:|
| Purpose | configure your machine to work with `git-assist` (and its `easy-use` scripts) | installs both the latest Node LTS version and `git-assist` on your machine | configures your machine to work with GitHub. Generates a GPG key, an SSH key and setup your user configuration for GitHub | allows you to clone a repository from GitHub | updates the installed version of `git-assist`. Will scan for global packages but also local packages | stages, commits and pushes changes made in a repository | pulls from remote repository via interactive CLI |

:warning: **Important:**
- for all those scripts, you should copy them in the folder you want to work from and delete them afterward. This will be improved later on
- those scripts probably will work only if you're using Linux!

## Initial machine setup

You can follow those instructions in case you are using a machine for the first time and you would like to make it work with `git-assist`

**Manual setup:**
1. Get the scripts by following the instructions [here](#how-to-get-those-scripts)
2. Run `install.sh`
3. Run `machine-config.sh`

**Automated setup:**
1. See step 1 above
2. Run `full-setup.sh`
