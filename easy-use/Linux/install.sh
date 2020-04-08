#!/bin/bash

main() {
  # Get libsecret package name depending on distro
  source /etc/os-release
  if [ $NAME == "Ubuntu" -o $NAME=="Debian" ]; then
    LIBSECRET="libsecret-1-dev"
  elif [ $NAME == "RedHat" ]; then
    LIBSECRET="libsecret-devel"
  elif [ $NAME == "Arch" ]; then
    LIBSECRET="libsecret"
  else
    # fallback
    LIBSECRET="libsecret-1-dev"
  fi

  # Install universal package installer (does not work on non-package manager system)
  sudo wget -O /usr/local/bin/pacapt \
  https://github.com/icy/pacapt/raw/ng/pacapt

  sudo chmod 755 /usr/local/bin/pacapt

  sudo ln -sv /usr/local/bin/pacapt /usr/local/bin/pacman || true

  # Node installation
  NODE_VER="$(node -v)"
  NODE_MAJOR="${NODE_VER:1:2}"

  if [ $NODE_MAJOR != "12" ]
  then
    echo "Installing latest stable Node release..."
    sudo pacapt install curl
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo pacapt install nodejs
    echo "Node has been successfully updated to version $(node -v)!"
  else
    echo "Node is already up to date!"
  fi

  # git-assist installation
  echo "Installing git-assist on your machine..."
  sudo npm i -g git-assist

  # Dependencies installation
  echo "Installing system dependencies for git-assist..."
  sudo pacapt install gpg git gnome-keyring $LIBSECRET

  if [[ $1 != "--noEndMsg" ]]
  then
    echo "Done!"
  fi
}

export -f main

x-terminal-emulator -e bash -c "main && read -p \"Press Return to exit\""
