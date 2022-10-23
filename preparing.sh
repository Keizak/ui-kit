#!/bin/bash

sed -i -e "s/GITHUB_ACCESS_TOKEN_WRITE/$1/g"  .npmrc
