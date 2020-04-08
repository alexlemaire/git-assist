#!/bin/bash

main() {
  # Get architecture, this may not work...
  source /etc/os-release
  if [ $NAME == "Ubuntu" -o $NAME=="Debian" ]; then
    INSTALL="apt-get install"
    LIBSECRET="libsecret-1-dev"
  elif [ $NAME == "RedHat" ]; then
    INSTALL="yum install"
    LIBSECRET="libsecret-devel"
  elif [ $NAME == "Arch" ]; then
    INSTALL="pacman -S"
    LIBSECRET="libsecret"
  else
    # fallback
    INSTALL="apt-get install"
    LIBSECRET="libsecret-1-dev"
  fi
  # Node installation
  NODE_VER="$(node -v)"
  NODE_MAJOR="${NODE_VER:1:2}"

  if [ $NODE_MAJOR != "12" ]
  then
    echo "Installing latest stable Node release..."
    sudo $INSTALL curl
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo $INSTALL nodejs
    echo "Node has been successfully updated to version $(node -v)!"
  else
    echo "Node is already up to date!"
  fi

  # git-assist installation
  echo "Installing git-assist on your machine..."
  sudo npm i -g git-assist

  # Dependencies installation
  echo "Installing system dependencies for git-assist..."
  sudo $INSTALL gpg git gnome-keyring $LIBSECRET

  if [[ $1 != "--noEndMsg" ]]
  then
    echo "Done!"
  fi
}

export -f main

x-terminal-emulator -e bash -c "main && read -p \"Press Return to exit\""
