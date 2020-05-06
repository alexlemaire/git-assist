#!/bin/bash

main() {
  header_print() {
    echo $1
    echo "Tip: you can cancel this operation by pressing CTRL + C"
  }

  EXEC="$(npm bin -g 2> /dev/null)/git-assist"

  # delete SSH key
  header_print "Starting SSH key deletion utility..."
  $EXEC ssh --delete

  echo "Done!"
}

export -f main

x-terminal-emulator -e bash -c "main && read -p \"Press Return to exit\""
