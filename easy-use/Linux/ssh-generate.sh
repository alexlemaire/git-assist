#!/bin/bash

main() {
  header_print() {
    echo $1
    echo "Tip: you can cancel this operation by pressing CTRL + C"
  }

  EXEC="$(npm bin -g 2> /dev/null)/git-assist"

  # generate SSH key
  header_print "Generating SSH key for GitHub..."
  $EXEC ssh --generate

  echo "Done!"
}

export -f main

x-terminal-emulator -e bash -c "main && read -p \"Press Return to exit\""
