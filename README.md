# e-diary-backend
(en)
<ol type="I">
  <h1><li>Description:</h1>
  This is a backend for my thesis. My thesis was: "Implementation of E-diary in frameworks NestJS and Vue.js". This project is meant to be use alongside: https://github.com/Enkeiie/e-dziennik-frontend. It offers: <ol type="1">
  <li>Admin panel that allows him to manage users, classes, subjects, parents</li>
  <li>Teacher panel that gives him ability to create and order tests, grade students and check their presence as well as to browse homeroom class grades and presences</li>
  <li>Student panel which allows him to see grades and presences as well as take part in tests</li>
  <li>Parent panel which allows to see grades and presences of children and to send excuses for childrens absences</li>
  <li>All user types have acccess to profile where they can change their data</li>
  </ol>
  </li>
  <h1><li>What's needed to run:</h1>
  For Docker use:<ul>
  <li>MongoBD database</li>
  <li>Docker</li>
</ul>
  For Windows/Linux use:
  <ul>
  <li>MongoBD database</li>
  <li>Latest Node.js</li>
  <li>Vue.js and NestJS</li>
</ul></li>
  <h1><li>How to run the app:</h1>
    For Docker use:<ol type="1">
  <li>git clone both parts of the app into one directory.</li>
  <li>create docker-compose in the main directory with this content:</li>
  
```

version: '3'
services:
  e_dziennik_frontend:
    build:
      context: ./<frontend directory>
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    networks:
      - app_net
      
  e_dziennik_backend:
    build:
      context: ./<backend directory>
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    networks:
      - app_net

networks:
  app_net:
    driver: bridge
```
  <li>now create dockerfile:</li>
  
  ```
  FROM nginx:1.21.6
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
  ```
  <li>and nginx config file:</li>
  
  ```
  
  server {
      listen 80;
      server_name localhost;
      include /etc/nginx/mime.types;
      location / {
        proxy_pass http://<frontend-container>:8080;
      }
      location /api {
        proxy_pass http://<backend-container>:3000/;
      }
  }
  ```
  </li>
  <li>replace connection data in backend part in the directory "/src/app.module.ts" with your own database connection</li>
  <li>launch MongoDB database and Docker</li>
  <li>run in terminal with <i>docker-compose up</i></li>
</ol>
  For Windows/Linux use:<ol type="1">
  <li>git clone both parts of the app into one directory.</li>
  <li>replace connection data in backend part in the directory "/src/app.module.ts" with your own database connection</li>
   <li>launch MongoDB database</li>
  <li>run in terminal <i>npm run start</i> in backend directory and <i>npm run serve</i> in frontend directory</li>
</ol>
  </li>
</ol>
(pl)
<ol type="I">
  <h1><li>Opis:</h1>
  Aplikacja serwerowa wykonana na potrzebę pracy inżynierskiej. Tematem pracy była: "Implementacja e-dziennika w technologiach NestJS i Vue,js". Projekt powinien być używany razem z : https://github.com/Enkeiie/e-dziennik-frontend. Aplikacja oferuje następujące możliwości: <ol type="1">
  <li>Panel administratorski, który pozwala na zarządzanie listą użytkowników, klas, przedmiotów, rodziców</li>
  <li>Panel nauczyciela pozwalajączy na tworzenie i przeprowadzanie sprawdzianów, sprawdzanie obecności oraz wystawianie ocen jak i wgląd w oceny wychowywanej klasy</li>
  <liPanel ucznia, który udostepnia uczniowi listę ocen i obecności oraz pozwala brać udział w sprawdzianych</li>
  <li>Panel rodzica pozwalający na wgląd w oceny i obecności dzieci oraz usprawiedliwienie nieobecności dziecka</li>
  <li>Wszyscy użytkownicy mają dostęp do swojego profilu, gdzie może zmienić swoje informacje</li>
  </ol>
  </li>
  <h1><li>Co jest potrzebne do uruchomienia:</h1>
  Przy użyciu dockera:<ul>
  <li>Baza MongoDB</li>
  <li>Docker</li>
</ul>
  Dla Windows/Linux:<ul>
  <li>Baza MongoDB</li>
  <li>Aktualny Node.js</li>
  <li>Vue.js i NestJS</li>
</ul>
  </li>
  <h1><li>Jak uruchomić aplikację:</h1>
    Przy użyciu dockera:<ol type="1">
  <li>wykonaj git clone na obu częściach aplikacji i umieść je w jednym folderze.</li>
  <li>Utwórz plik docker-compose z następującą zawartością:</li>
  
```

version: '3'
services:
  e_dziennik_frontend:
    build:
      context: ./<folder z frontendem>
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    networks:
      - app_net
      
  e_dziennik_backend:
    build:
      context: ./<folder z backendem>
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    networks:
      - app_net

networks:
  app_net:
    driver: bridge
```
  <li>now create dockerfile:</li>
  
  ```
  FROM nginx:1.21.6
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
  ```
  <li>and nginx config file:</li>
  
  ```
  
  server {
      listen 80;
      server_name localhost;
      include /etc/nginx/mime.types;
      location / {
        proxy_pass http://<frontend-container>:8080;
      }
      location /api {
        proxy_pass http://<backend-container>:3000/;
      }
  }
  ```
  <li>zamień dane połączenia w pliku pod "/src/app.module.ts" danymi z własnej bazy</li>
  <li>uruchom bazę MongoDB oraz aplikację Docker</li>
  <li>W terminalu wykonaj polecenie <i>docker-compose up</i> </li>
</ol>
  Dla Windows/Linux:<ol type="1">
  <li>wykonaj git clone na obu częściach aplikacji i umieść je w jednym folderze.</li>
  <li>zamień dane połączenia w pliku pod "/src/app.module.ts" danymi z własnej bazy</li>
  <li>uruchom bazę MongoDB</li>
  <li>w terminalu wykonaj <i>npm run start</i> wewnątrz folderu z backendem<i>npm run serve</i> w folderze z frontendem</li>
</ol>
  </li>
</ol>
