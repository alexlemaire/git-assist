#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

cd $(dirname "$0")

# Install Node & git-assist
header_print "Installing the latest Node version and git-assist on your machine..."
bash ./install.sh --noEndMsg

# Machine configuration
header_print "Configuring your machine to work with GitHub..."
EXEC="$(npm bin -g)/git-assist"
bash ./machine-config.sh $EXEC --noEndMsg

printf "\nScript ran. You may now close this window if you're done working with it!"
