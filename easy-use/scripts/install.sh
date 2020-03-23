#!/bin/bash

# Node installation
NODE_VER="$(node -v)"
NODE_MAJOR="${NODE_VER:1:2}"

if [ $NODE_MAJOR != "12" ]
then
  echo "Installing latest stable Node release..."
  sudo apt-get install curl
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt-get install nodejs
  echo "Node has been successfully updated to version $(node -v)!"
else
  echo "Node is already up to date!"
fi

# git-assist installation
echo "Installing git-assist on your machine..."

sudo npm i -g git-assist

printf "\nScript ran. You may now close this window if you're done working with it!"
