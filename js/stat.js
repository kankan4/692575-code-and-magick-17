'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP_X = 20;
var CLOUD_GAP_Y = 15;
var SHADOW_GAP = 10;
var FONT_GAP = 7;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var CHART_GAP = 30;
var FONT_SIZE = 16;
// Максимально допустимое количество результатов - 4
var STATISTICS_ARRAY_SIZE = 4;


var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] && (!maxElement || arr[i] > maxElement)) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Текст приветствия
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_GAP_X, CLOUD_Y + CLOUD_GAP_Y + 5);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_GAP_X, CLOUD_Y + CLOUD_GAP_Y + 22);

  // Формирование гистограммы
  var chartX = CLOUD_X + CLOUD_GAP_X + CHART_GAP;
  var namesY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP_Y;
  var chartY = namesY - FONT_SIZE - FONT_GAP - BAR_MAX_HEIGHT;
  var timesY = chartY - FONT_GAP;

  names = names.splice(0, STATISTICS_ARRAY_SIZE);
  times = times.splice(0, STATISTICS_ARRAY_SIZE);
  var maxTime = getMaxElement(times);

  ctx.textBaseline = 'bottom';
  for (var i = 0; i < names.length; i++) {
    // Отрисовка столбцов гистограммы
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var colorSaturation = randomInteger(0, 255);
      ctx.fillStyle = 'rgba(0, 0, ' + colorSaturation + ', 1)';
    }
    var barHeight = BAR_MAX_HEIGHT * times[i] / maxTime;
    ctx.fillRect(chartX + (BAR_WIDTH + BAR_GAP) * i, chartY + BAR_MAX_HEIGHT - barHeight, BAR_WIDTH, barHeight);

    // Добавление текста
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), chartX + (BAR_WIDTH + BAR_GAP) * i, timesY + BAR_MAX_HEIGHT - barHeight);
    ctx.fillText(names[i], chartX + (BAR_WIDTH + BAR_GAP) * i, namesY);
  }
};
