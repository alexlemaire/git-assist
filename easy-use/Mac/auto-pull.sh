#!/bin/bash

back_if() {
  if [ "$(basename "$(pwd)")" == $1 ]
  then
    cd ../
  fi
}
back_if "Linux"
back_if "easy-use"

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}
EXEC="$(npm bin -g 2> /dev/null)/git-assist"

# auto-pull
header_print "Running auto-pull utility..."
$EXEC auto-pull

read -p "Press Return to exit"
