Pour créer vos branches , 


git checkout -b feature/(nomdebranche)


pour switch de branch

git checkout (nomdevotrebranche)


une fois le travail terminé vous faites 

git checkout develop

git merge --no-ff feature/(nomdebranche)


git push origin develop


normalement c'est bon apres

Pour allumer le serveur : heroku ps:scale web=1

Pour éteindre le serveur : heroku ps:scale web=0