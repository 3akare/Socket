#!/usr/bin/env bash
# Transfer a file from local to my ubuntu server

# {$1} - IP Address of Ubuntu Server (52.23.172.2)
# {$2} - Path to ssh key
# {$3} - Username (ubuntu)
# {$4} - Path to file file to be sent
# Example - ./0* 0-transfer_file 35.175.126.203 ubuntu ~/.ssh...

if [ $# != 0 ]; then
	echo "Usage: ./transfer.sh PATH_TO_FILE IP USERNAME PATH_TO_SSH_KEY"
else
	scp -o StrictHostKeyChecking=no -i "~/.ssh/id_rsa_linode" "index.html" "bakare"@"88.80.187.75":~/
	scp -o StrictHostKeyChecking=no -i "~/.ssh/id_rsa_linode" "setup.sh" "bakare"@"88.80.187.75":~/
fi
