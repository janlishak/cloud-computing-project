# cloud-computing-project
6130COMP Assignment, Jan Lishak, 2022

## Enviroment Setup

### Install docker  

Install docker using the convenience script
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Test the installation
```bash
sudo docker run hello-world
```

Install Docker Compose
```bash
sudo apt install docker-compose
```

### Install git and github cli (optional)
add github cli repository and install the utility
```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

Follow the wizard to authenticate with github (optional)
```bash
gh auth login
```

Example post request to the webservice
```bash
curl -X POST -H "Content-Type: application/json" -d '{"_id": 26, "accountID": 12345, "username": "janlishak", "titleID": 21, "userAction": "scrolling", "date": "2012-04-23T18:25:43.511Z", "interactionPoint": "menu", "interactionType": "mouse"}'  http://127.0.0.1:80
```