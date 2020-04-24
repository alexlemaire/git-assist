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

EXEC="$(npm bin -g)/git-assist"

# Pulling
header_print "Starting logs printing utility..."
$EXEC logs

echo "Done!"
read -p "Press Return to exit"
