#!/bin/bash

# Homebrew installation
which -s brew
if [[ $? != 0 ]]
then
  echo "Installing Homebrew package manager..."
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi
brew update

# Node installation
which -s node
if [[ $? != 0 ]]
then
  echo "Installing latest stable Node release..."
  brew install node
  echo "Node has been successfully updated to version $(node -v)!"
else
  echo "Updating Node..."
  brew upgrade node
fi

# git-assist installation
echo "Installing git-assist on your machine..."

sudo npm i -g git-assist

if [[ $1 != "--noEndMsg" ]]
then
  echo "Done!"
  read -p "Press Return to exit"
fi
