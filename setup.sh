#!/bin/bash

# user en root
if [ "$EUID" -ne 0 ]; then
    echo "Attention : Vous devez être en mode root pour executer le programme :)"
    exit 1
fi

# deja install
declare -A dependencies=(
    ["apache2"]="apache2"
    ["dnsmasq"]="dnsmasq"
    ["hostapd"]="hostapd"
    ["tshark"]="tshark"
    ["perl"]="perl"
)


function check_dependency {
    echo -n -e "$1 ..."
    dpkg -s "$2" &> /dev/null
    if [ $? -eq 0 ]; then
        echo -e "\e[32mOk\e[0m"
    else
        echo -e "\e[31mNo\e[0m"
        not_installed_dependencies+=("$2")
    fi
}


function animation {
    echo -e -n "     "
    for _ in {1..5}; do
        echo -e -n "."
        sleep 0.10
    done
}


not_installed_dependencies=()

# statut
clear
echo -e "\e[1mVérification des dépendances en cours...\e[0m"
for dependency in "${!dependencies[@]}"; do
    check_dependency "$dependency" "${dependencies[$dependency]}"
    animation
done

# dependances
if [ ${#not_installed_dependencies[@]} -ne 0 ]; then
    echo -e "\e[1mInstallation des dépendances manquantes...\e[0m"
    apt-get update
    apt-get install -y ${not_installed_dependencies[@]}
fi

# Perl URI::Escape
echo -n -e "\e[1mInstallation du module Perl URI::Escape...\e[0m"
cpan -i URI::Escape &> /dev/null
echo -e "\e[32mOk\e[0m"
animation


clear
echo -e "\e[31m \e[1mL'installation est terminée ! Vous pouvez désormais démarrer le programme (toujours en mode root) :) !\e[0m"
