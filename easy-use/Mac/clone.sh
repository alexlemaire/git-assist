#!/bin/bash

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

EXEC="$(npm bin -g)/git-assist"

# clone repo
header_print "Cloning a new repository..."
$EXEC clone

read -p "Press Return to exit"
