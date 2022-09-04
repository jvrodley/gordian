SET ACTIVEMQ_HOST=192.168.23.237
SET NODE_ENV=development
SET POSTGRES_SYSTEM_DBNAME=postgres
SET POSTGRESQL_APPLICATION_DBNAME=bubbles_dev
SET POSTGRESQL_HOST=192.168.23.237
SET POSTGRESQL_POSTGRES_PASSWORD=postgres
SET POSTGRESQL_POSTGRES_USER=postgres
SET POSTGRESQL_SHARED_DIRECTORY=/Users/john/Documents/go/src/bubblesnet/controller
SET REACT_APP_API_HOST=192.168.23.237
SET REACT_APP_NODE_ENV=development
SET POSTGRESQL_UNIX_USER=postgres
SET DEBUG=*
SET REACT_APP_UI_PORT=3001
SET LOG_LEVEL=silly

cd ../gordian
call npm run build

cd ../server

xcopy /q ..\gordian\build\static src\public\static /I /S /Y
xcopy /q ..\gordian\build\manifest.json src\public\asset-manifest.json /I /S /Y
xcopy /q ..\gordian\build\manifest.json src\public\favicon.ico /I /S /Y
xcopy /q ..\gordian\build\index.html src\public\index.html /I /S /Y
xcopy /q ..\gordian\build\manifest.json src\public\manifest.json /I /S /Y
xcopy /q ..\gordian\build\manifest.json src\public\robots.txt /I /S /Y

node src/api-server.js

