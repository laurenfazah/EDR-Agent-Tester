#!/bin/bash

echo "Making curl request to $1"
curl "$1" -v
