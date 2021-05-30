import '/src/scss/styles.scss';
require.context("/src/images", true, /^\.\/.*\..*/);

import {Field} from './js/model';

;(function () {
    'use strict';

    // Убираем вывод контекстного меню на игровых полях
    Field.getElementById('computer').oncontextmenu = Field.getFalse;
    Field.getElementById('player').oncontextmenu = Field.getFalse;

    // Создаем объекты игровых полей игрока и компьютера
    let player      = new Field('Player'),
        computer    = new Field('Computer');

    // Выводим введенные имена игрока и компьютера
    Field.getElementById('start-game').addEventListener("click", function () {
        Field.getFieldName(player, 'player-input', 'player-name', 'player-label');
        Field.getFieldName(player, 'computer-input', 'computer-name', 'computer-label');
        Field.startGame(player, computer, 'game-menu', 'fields')
    });

    // Генерируем координаты кораблей
    Field.createShipData(player.ships);
    Field.createShipData(computer.ships);

    // Вычисляем суммарные хитпоинты кораблей
    Field.getSumOfHealth(player);
    computer.totalHealth = player.totalHealth;

    // Расставляем корабли на игровом поле игрока
    Field.getPlacementOfShips(player);

    // Обрабатываем события кликов по игровому полю оппонента
    Field.getElementById('computer').addEventListener("click", function () {
        Field.mouseEvent.getPlayerShot(event, player, computer, 'computer', 'player', 'message', 'Вы победили!')
    });
    Field.getElementById('computer').addEventListener("contextmenu", function () {
        Field.mouseEvent.getSkip(event, 'computer')
    });

})();