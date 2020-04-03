#!/bin/bash

main() {
  cd ../
  DIR="$(basename "$(pwd)")"
  if [ $DIR == "easy-use" ]
  then
    cd ../
  fi

  header_print() {
    echo $1
    echo "Tip: you can cancel this operation by pressing CTRL + C"
  }

  EXEC="$(npm bin -g 2> /dev/null)/git-assist"

  # Staging, commiting and pushing
  header_print "Staging, commiting and pushing your changes..."
  $EXEC push

  echo "Done!"
}

export -f main

x-terminal-emulator -e bash -c "main && read -p \"Press Return to exit\""
