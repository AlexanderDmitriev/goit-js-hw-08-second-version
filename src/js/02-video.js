/*  В HTML есть <iframe> с видео для Vimeo плеера. Напиши скрипт который будет сохранять текущее время
 воспроизведения видео в локальное хранилище и, при перезагрузке страницы, 
 продолжать воспроизводить видео с этого времени.

<iframe
  id="vimeo-player"
  src="https://player.vimeo.com/video/236203659"
  width="640"
  height="360"
  frameborder="0"
  allowfullscreen
  allow="autoplay; encrypted-media"
></iframe>
    Выполняй это задание в файлах 02-video.html и 02-video.js. 
    
    Разбей его на несколько подзадач:
1. Ознакомься с документацией библиотеки Vimeo плеера.
2. Добавь библиотеку как зависимость проекта через npm.
3. Инициализируй плеер в файле скрипта как это описано в секции pre-existing player, 
но учти что у тебя плеер добавлен как npm пакет, а не через CDN.
4. Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.
5. Сохраняй время воспроизведения в локальное хранилище. 
    Пусть ключом для хранилища будет строка "videoplayer-current-time".
6. При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение 
с сохраненной позиции.
7. Добавь в проект бибилотеку lodash.throttle и сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.
 */

//import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);


let timing;
let continueTime;

const setTiming = (event) => {
    timing = event.seconds;
    localStorage.setItem("videoplayer-current-time", timing);
    console.log(timing); 
}

player.on('timeupdate', throttle(setTiming, 1000));


    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

    try {
      continueTime = JSON.parse(localStorage.getItem("videoplayer-current-time"));
      console.log(continueTime);
    } catch (error) {
      console.log(error);
}
    
 player.setCurrentTime(continueTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
 }).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
}); 
