pnpm build
sed -i "s/\/assets/.\/assets/g" dist/index.html
sudo rsync --delete -a ~wheel/front/colorlampJoin/dist/* /var/www/colorlamp/joinEvent/
