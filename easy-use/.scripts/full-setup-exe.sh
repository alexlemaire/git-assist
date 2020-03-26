#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

# Install Node & git-assist
header_print "Installing the latest Node version and git-assist on your machine..."
bash ./install-exe.sh --noEndMsg

# Machine configuration
header_print "Configuring your machine to work with GitHub..."
bash ./machine-config-exe.sh --noEndMsg

printf "\nScript ran. You may now close this window if you're done working with it!"
