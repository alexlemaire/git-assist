#!/bin/bash

main() {
  header_print() {
    echo $1
    echo "Tip: you can cancel this operation by pressing CTRL + C"
  }

  # Install Node & git-assist
  header_print "Installing the latest Node version and git-assist on your machine..."
  bash ./install.sh --noEndMsg

  # Machine configuration
  header_print "Configuring your machine to work with GitHub..."
  EXEC="$(npm bin -g 2> /dev/null)/git-assist"
  bash ./machine-config.sh $EXEC --noEndMsg

  echo "Done!"
}

export -f main

x-terminal-emulator -e bash -c "main && read -p \"Press Return to exit\""
