pnpm build
sed -i "s/\/assets/.\/assets/g" dist/index.html
sudo rsync --delete -a ~wheel/front/colorlampAnnouncement/dist/* /var/www/colorlamp/announcement/
