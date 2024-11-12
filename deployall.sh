cd colorlampAnnouncement
./deploy.sh &
cd ../colorlampJoin
./deploy.sh &
cd ../colorlampManage
./deploy.sh

fg 2> /dev/null
fg 2> /dev/null

cd ..

printf "\nDeploy Done!\n"
