#!/bin/bash

sed -i -e "s/GITHUB_ACCESS_TOKEN/$1/g"  .npmrc
