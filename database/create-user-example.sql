CREATE USER 'mymediauser'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'mymediauser'@'localhost';
FLUSH PRIVILEGES;
