'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP_X: 20,
  GAP_Y: 15
};
var Bar = {
  WIDTH: 40,
  MAX_HEIGHT: 150,
  GAP: 50
};
var CHART_GAP = 30;
var SHADOW_GAP = 10;
var FONT_GAP = 7;
var FONT_SIZE = 16;
// Максимально допустимое количество результатов - 4
var STATISTICS_ARRAY_SIZE = 4;


var getMaxOfArray = function (numArray) {
  return Math.max.apply(null, numArray);
};

// @see https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, Cloud.X + SHADOW_GAP, Cloud.Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, Cloud.X, Cloud.Y, '#fff');

  // Текст приветствия
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.fillText('Ура вы победили!', Cloud.X + Cloud.GAP_X, Cloud.Y + Cloud.GAP_Y + 5);
  ctx.fillText('Список результатов:', Cloud.X + Cloud.GAP_X, Cloud.Y + Cloud.GAP_Y + 22);

  // Формирование гистограммы
  var chartX = Cloud.X + Cloud.GAP_X + CHART_GAP;
  var namesY = Cloud.Y + Cloud.HEIGHT - Cloud.GAP_Y;
  var chartY = namesY - FONT_SIZE - FONT_GAP - Bar.MAX_HEIGHT;
  var timesY = chartY - FONT_GAP;

  names = names.splice(0, STATISTICS_ARRAY_SIZE);
  times = times.splice(0, STATISTICS_ARRAY_SIZE);
  var maxTime = getMaxOfArray(times);

  ctx.textBaseline = 'bottom';
  for (var i = 0; i < names.length; i++) {
    // Отрисовка столбцов гистограммы
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var colorSaturation = randomInteger(0, 255);
      ctx.fillStyle = 'rgba(0, 0, ' + colorSaturation + ', 1)';
    }
    var barHeight = Bar.MAX_HEIGHT * times[i] / maxTime;
    ctx.fillRect(chartX + (Bar.WIDTH + Bar.GAP) * i, chartY + Bar.MAX_HEIGHT - barHeight, Bar.WIDTH, barHeight);

    // Добавление текста
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), chartX + (Bar.WIDTH + Bar.GAP) * i, timesY + Bar.MAX_HEIGHT - barHeight);
    ctx.fillText(names[i], chartX + (Bar.WIDTH + Bar.GAP) * i, namesY);
  }
};
