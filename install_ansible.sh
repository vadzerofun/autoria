#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Ansible on Ubuntu
install_ansible_ubuntu() {
    echo "Installing Ansible on Ubuntu..."
    sudo apt update
    sudo apt install -y software-properties-common
    sudo add-apt-repository --yes --update ppa:ansible/ansible
    sudo apt install -y ansible
}

# Function to install Ansible on Debian
install_ansible_debian() {
    echo "Installing Ansible on Debian..."

    # Determine Ubuntu codename based on Debian version
    if [ "$(lsb_release -rs)" == "12" ]; then
        UBUNTU_CODENAME=jammy
    elif [ "$(lsb_release -rs)" == "11" ]; then
        UBUNTU_CODENAME=focal
    elif [ "$(lsb_release -rs)" == "10" ]; then
        UBUNTU_CODENAME=bionic
    else
        echo "Unsupported Debian version. Exiting."
        exit 1
    fi

    # Install wget and gpg if not already installed
    if ! command_exists wget || ! command_exists gpg; then
        sudo apt update
        sudo apt install -y wget gpg
    fi

    # Add Ansible repository and install
    wget -O- "https://keyserver.ubuntu.com/pks/lookup?fingerprint=on&op=get&search=0x6125E2A8C77F2818FB7BD15B93C4A3FD7BB9C367" | sudo gpg --dearmour -o /usr/share/keyrings/ansible-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/ansible-archive-keyring.gpg] http://ppa.launchpad.net/ansible/ansible/ubuntu $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/ansible.list
    sudo apt update
    sudo apt install -y ansible
}

# Main script
if command_exists lsb_release; then
    distro=$(lsb_release -is)
    if [ "$distro" == "Ubuntu" ]; then
        install_ansible_ubuntu
    elif [ "$distro" == "Debian" ]; then
        install_ansible_debian
    else
        echo "Unsupported distribution. This script only supports Ubuntu and Debian."
        exit 1
    fi
else
    echo "lsb_release command not found. Cannot determine distribution."
    exit 1
fi

echo "Ansible installation completed. Version installed:"
ansible --version