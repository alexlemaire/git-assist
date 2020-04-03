#!/bin/bash

EXEC="$(npm bin -g)/git-assist"

konsole --noclose -e ./.scripts/clone-exe.sh $EXEC
