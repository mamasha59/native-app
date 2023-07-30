React Native Expo app - в процессе...

To start :  
download/скачать ExpoGo from app store()
npm i - in terminal redactor  
npm run start  
scan Qr cod or type url  

Для того что бы увидеть начальные экрана если юзера еще нет измените условие в главном файле App.tsx на:   
initialRouteName={exist ? 'MainScreen' : 'WelcomeScreens'}