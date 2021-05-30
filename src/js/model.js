// Класс игрового поля
export class Field {

    static FIELD_SIDE = 300;
    static SHIP_SIDE = 30;
    static SHIP_DATA = {
        fourdeck: [1, 4],
        tripledeck: [2, 3],
        doubledeck: [3, 2],
        singledeck: [4, 1]
    };

    // Берем элемент по его ID
    static getElementById(element) {
        return document.getElementById(element);
    }

    // Выводим введенные имена игрока и компьютера
    static getFieldName(obj, inputID, outputID, labelID) {
        obj.name = this.getElementById(`${inputID}`).value;
        if (obj.name !== '') {
            this.getElementById(outputID).innerText = obj.name;
        } else {
            this.getElementById(labelID).innerText = 'Заполните поле.'
        }
    }

    // Скрываем главное меню и выводим игровые поля
    static startGame(playerObj, computerObj, menuID, fieldsID) {
        if (
            playerObj.name !== '' &&
            computerObj.name !== ''
        ) {
            this.getElementById(menuID).hidden = true;
            this.getElementById(fieldsID).hidden = false;
        }
    }

    // Возвращаем false для запрета вывода контектного меню на игровом поле
    static getFalse() {return false}

    // Генерация случайного числа из диапозона (включая границы диапозона)
    static getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Генерируем объект с данными о кораблях
    static createShipData(obj) {

        // Локальные переменные для создания и проверки координат
        let position = false,
            j,
            max = 0,
            x = 0, y = 0, x1 = 0, y1 = 0;

        // Проверяем, совпадают ли сгенерированные координаты с уже существующими
        function findMatches(arg) {
            for (let key2 in arg) {
                if (
                    ((x <= (arg[key2].x1 + Field.SHIP_SIDE)) && (x >= (arg[key2].x - Field.SHIP_SIDE))) &&
                    ((y <= (arg[key2].y1 + Field.SHIP_SIDE)) && (y >= (arg[key2].y - Field.SHIP_SIDE))) ||
                    ((x1 <= (arg[key2].x1 + Field.SHIP_SIDE)) && (x1 >= (arg[key2].x - Field.SHIP_SIDE))) &&
                    ((y1 <= (arg[key2].y1 + Field.SHIP_SIDE)) && (y1 >= (arg[key2].y - Field.SHIP_SIDE)))
                ) {
                    j = true;
                    break;
                } else {
                    j = false;
                }
            }
        }

        // Генерируем координаты начала корабля
        let getRandomCoords = secondRange => {return this.getRandomNumber(0, secondRange) * this.SHIP_SIDE;}

        // Вычисляем координаты конца корабля
        let getEndCoords = (coord, shipCount) => {return coord + (shipCount - 1) * this.SHIP_SIDE}

        // Вычисляем крайнюю координату стороны
        let lastCord = (this.FIELD_SIDE / this.SHIP_SIDE) - 1;

        for (let key in this.SHIP_DATA) {

            max = 10 - this.SHIP_DATA[key][1];

            for (let i = 1; i < (this.SHIP_DATA[key][0] + 1); i++) {

                // 1. Случайно генерируем положение корабля
                position = !this.getRandomNumber(0, 1);

                if (position) {

                    do {

                        // Координаты начала корабля
                        x = getRandomCoords(max);
                        y = getRandomCoords(lastCord);

                        // координаты конца корабля
                        x1 = getEndCoords(x, this.SHIP_DATA[key][1]);
                        y1 = y;

                        // Проверка сгенерированных координат
                        findMatches(obj);

                    } while (j)

                } else {

                    do {

                        // Координаты начала корабля
                        x = getRandomCoords(lastCord);
                        y = getRandomCoords(max);

                        // Координаты конца корабля
                        x1 = x;
                        y1 = getEndCoords(y, this.SHIP_DATA[key][1]);

                        // Проверка сгенерированных координат
                        findMatches(obj);

                    } while (j)

                }

                // Генерируем объект корабля
                obj[key + i] = {
                    x: x,
                    y: y,
                    x1: x1,
                    y1: y1,
                    position: position,
                    class: `${key}`,
                    decks: this.SHIP_DATA[key][1],
                    health: this.SHIP_DATA[key][1],
                };
            }
        }
    }

    // После создания объекта с кораблями проходим 1 раз по нему,
    // чтобы вычислить сумму хитпоинтов всех кораблей.
    // Это освободит нас от необходимости после каждого попадания проходить
    // по объекту и проверять не потопили ли мы все корабли.
    static getSumOfHealth(obj) {
        for (let key in obj.ships) {
            obj.totalHealth += obj.ships[key].health;
        }
    }

    // Определение положения корабля (вертикально или горизонтально)
    static getPositionOfShip(position) {
        if (position === false) {
            return ' vertical'
        } else {
            return ''
        }
    }

    // Расстановка кораблей на поле игрока
    static getPlacementOfShips(obj) {
        for (let key in obj.ships) {
            this.getElementById('player').insertAdjacentHTML(
                'beforeend',
                `<div id="${key}" class="ship ${obj.ships[key].class}${this.getPositionOfShip(obj.ships[key].position)}" style="top:${obj.ships[key].y}px; left:${obj.ships[key].x}px;"></div>`
            );
        }
    }

    static mouseEvent = {

        // Отображаем ячейку игрового поля в зависимости от результата хода
        displayCell: function(x, y, fieldID, cellClassName) {
            Field.getElementById(`${fieldID}`).insertAdjacentHTML(
                'beforeend',
                `<div class="${cellClassName}" style="top:${y}px;left:${x}px;"></div>`
            );
        },

        // Выводим сообщение в информационное окно
        getMessageInnerText: function(messageID, innerText) {
            Field.getElementById(`${messageID}`).innerHTML = `<p>${innerText}</p>`;
        },

        // Считаем нанесенный урон по кораблю
        getDamage: function (x, y, obj, ship, messageID, shipDownMessage, getHitMessage, fieldID) {
            
            ship.health--;

            // Проверяем, чтобы клетка была пустой и не находилась за пределами игрового поля
            // Если условия удовлетворены, то закрываем заведомо пустые клетки на поле и вносим их в лог выстрелов
            function getAroundSafe(obj, maxCoord, x, y, fieldID) {
                // Флаг, который будет говорить нам о том, что клетка пуста и не находится за пределами поля
                let safeFlag = true;

                for (let k = 0; k < obj.shootingData.length; k++) {
                    if (x === obj.shootingData[k].x &&
                        y === obj.shootingData[k].y)
                    {
                        safeFlag = true;
                        break;
                    } else if (x < maxCoord && y < maxCoord && x >= 0 && y >= 0) {
                        safeFlag = false;
                    }
                }

                if (!safeFlag)
                {
                    obj.shootingData.push(
                        {
                            x: x,
                            y: y,
                            type: 'safe',
                        }
                    )
                    Field.mouseEvent.displayCell(x, y, fieldID, 'safe');
                }
            }
            
            if (ship.health === 0) {
                let x,
                    y;

                function getX(ship, x, key) {
                    x = ship.x - Field.SHIP_SIDE;
                    return x + Field.SHIP_SIDE * key;
                }

                function getY(ship, y, key) {
                    y = ship.y - Field.SHIP_SIDE;
                    return y + Field.SHIP_SIDE * key;
                }

                if (ship.position) {

                    for (let i = 0; i < 3; i++) {
                        y = getY(ship, y, i);
                        for (let j = 0; j < (ship.decks + 2); j++) {
                            x = getX(ship, x, j);

                            getAroundSafe(obj, Field.FIELD_SIDE, x, y, fieldID);
                        }
                    }

                } else {

                    for (let i = 0; i < (ship.decks + 2); i++) {
                        y = getY(ship, y, i);
                        for (let j = 0; j < 3; j++) {
                            x = getX(ship, x, j);

                            getAroundSafe(obj, Field.FIELD_SIDE, x, y, fieldID);
                        }
                    }

                }
                obj.firing.shots = [];
                obj.firing.fire = false;
                Field.mouseEvent.getMessageInnerText(messageID, shipDownMessage);
            } else {
                obj.firing.fire = true;
                Field.mouseEvent.getMessageInnerText(messageID, getHitMessage);
            }
        },

        // Определяем координаты клика по игровому полю
        getCursorCoords: function (eventOffset) {
            return Math.floor(eventOffset / Field.SHIP_SIDE) * Field.SHIP_SIDE
        },

        // Перебираем координаты кораблей и проверяем попадание
        getHit: function (x, y, obj, messageID, shipDownMessage, getHitMessage, fieldID) {
            for (let key in obj.ships) {

                if (obj.ships[key].position) {

                    if (y === obj.ships[key].y &&
                        x >= obj.ships[key].x &&
                        x <= obj.ships[key].x1)
                    {
                        obj.totalHealth--;
                        obj.shootingData.push(
                            {
                                x: x,
                                y: y,
                                type: 'hit',
                            }
                        );
                        obj.firing.shots.push(
                            {
                                x: x,
                                y: y,
                                decks: obj.ships[key].decks,
                            }
                        );
                        Field.mouseEvent.getDamage(x, y, obj, obj.ships[key],
                            `${messageID}`,
                            `${shipDownMessage}`,
                            `${getHitMessage}`,
                            fieldID);
                        return true;
                    }
                } else {

                    if (x === obj.ships[key].x &&
                        y >= obj.ships[key].y &&
                        y <= obj.ships[key].y1)
                    {
                        obj.totalHealth--;
                        obj.shootingData.push(
                            {
                                x: x,
                                y: y,
                                type: 'hit',
                            }
                        );
                        obj.firing.shots.push(
                            {
                                x: x,
                                y: y,
                                decks: obj.ships[key].decks,
                            }
                        );
                        Field.mouseEvent.getDamage(x, y, obj, obj.ships[key],
                            `${messageID}`,
                            `${shipDownMessage}`,
                            `${getHitMessage}`,
                            fieldID);
                        return true;
                    }
                }
            }
            obj.shootingData.push(
                {
                    x: x,
                    y: y,
                    type: 'dot',
                }
            );
            return false;
        },

        // В зависимости от результата выстрела меняем отображение ячейки и передаем ход
        displayOnField: function (x, y, hitFlag, fieldID, obj, playerObj, playerTurn, computerTurn, messageID, computerID, playerID) {
            if (hitFlag === false ) {
                Field.mouseEvent.displayCell(x, y, fieldID, 'dot');
                if (playerTurn) {
                    Field.mouseEvent.getMessageInnerText(messageID, 'Ход компьютера');
                    setTimeout(Field.mouseEvent.getComputerShot,
                        500,
                        playerObj,
                        messageID,
                        computerID,
                        playerID,
                        'Вы проиграли :(')
                }
            } else {
                Field.mouseEvent.displayCell(x, y, fieldID, 'hit');
                if (computerTurn) {
                    Field.mouseEvent.getMessageInnerText(messageID, 'Ход компьютера');
                    setTimeout(Field.mouseEvent.getComputerShot,
                        500,
                        playerObj,
                        messageID,
                        computerID,
                        playerID,
                        'Вы проиграли :(')
                }
            }
        },

        checkTheHit: function(x, y, obj, player, messageID, shipDownMessage, getHitMessage, fieldID,
                              computerID, playerID, endGameMessage, playerTurn, computerTurn) {

            // Создаем флаг, который будет сигнализировать нам о попадании
            let hitFlag = Field.mouseEvent.getHit(x, y, obj, messageID, shipDownMessage, getHitMessage, fieldID);

            Field.mouseEvent.displayOnField(x, y, hitFlag, fieldID, obj, player, playerTurn, computerTurn, messageID, computerID, playerID);

            if (computerTurn && !hitFlag) {
                Field.mouseEvent.getMessageInnerText(messageID, 'Ваш ход');
            }

            // Проверяем totalHealth, если он равен 0, то заканчиваем игру
            if (obj.totalHealth === 0) {
                Field.getElementById(`${computerID}`).style = 'pointer-events:none;';
                Field.mouseEvent.getMessageInnerText(messageID, endGameMessage);
            }

        },

        getComputerShot: function (player, messageID, computerID, playerID, loseMessage) {

            let j = false,      // Флаг, запускающий цикл генерации координат, пока они не будут удовлетворять условию
                x, y;           // Локальные координаты, которые генерируются (или вычисляются) каждую итерацию

            if (player.firing.fire) {

                let shotsData = player.firing.shots;

                // Стратегия поведения компьютера, если идет обстрел 3-х ил 4-х палубного корабля
                if (player.firing.shots.length > 1) {

                    // Вычисляем смещение координат после второго выстрела по 3-х или 4-х палубному кораблю,
                    // чтобы определить его положение
                    let offsetX = shotsData[0].x - shotsData[1].x,
                        offsetY = shotsData[0].y - shotsData[1].y;

                    // Ищем палубы корабля по направлению смещения координат
                    outer: for (let i = -1; i < shotsData[0].decks; i++) {

                        x = shotsData[shotsData.length - 1].x + offsetX * i;
                        y = shotsData[shotsData.length - 1].y + offsetY * i;

                        for (let k = 0; k < player.shootingData.length; k++) {
                            if (x === player.shootingData[k].x &&
                                y === player.shootingData[k].y ||
                                (x < 0 || x >= Field.FIELD_SIDE) || (y < 0 || y >= Field.FIELD_SIDE))
                            {
                                continue outer;
                            }
                        }
                        break;

                    }

                    Field.mouseEvent.checkTheHit(x, y, player, player,
                        'message',
                        'Ваш корабль потоплен',
                        'По вашему кораблю попали',
                        'player',
                        computerID, playerID, loseMessage,
                        false,
                        true);

                }

                // Стратегия поведения компьютера, если идет обстрел 2-х палубного корабля
                else {
                    // Коэффициенты смещения от точки попадания
                    let offsetArray = [ {x: -1, y: 0    },
                                        {x: 0,  y: -1   },
                                        {x: 1,  y: 0    },
                                        {x: 0,  y: 1    }, ];

                    // Координаты последнего попадания
                    let firstShotX = shotsData[shotsData.length - 1].x,
                        firstShotY = shotsData[shotsData.length - 1].y;

                    // Перебираем соседние клетки от попадания
                    outer: for (let i = 0; i < 4; i++) {

                        x = firstShotX + offsetArray[i].x * Field.SHIP_SIDE;
                        y = firstShotY + offsetArray[i].y * Field.SHIP_SIDE;

                        for (let k = 0; k < player.shootingData.length; k++) {

                            if (x === player.shootingData[k].x &&
                                y === player.shootingData[k].y ||
                                (x < 0 || x >= Field.FIELD_SIDE) || (y < 0 || y >= Field.FIELD_SIDE))
                            {
                                continue outer;
                            }

                        }
                        break;
                    }

                    Field.mouseEvent.checkTheHit(x, y, player, player,
                        'message',
                        'Ваш корабль потоплен',
                        'По вашему кораблю попали',
                        'player',
                        computerID, playerID, loseMessage,
                        false,
                        true);
                }

            } else {

                do {

                    x = Field.getRandomNumber(0, 9) * Field.SHIP_SIDE;
                    y = Field.getRandomNumber(0, 9) * Field.SHIP_SIDE;

                    for (let i = 0; i < player.shootingData.length; i++) {
                        if (x === player.shootingData[i].x &&
                            y === player.shootingData[i].y)
                        {
                            j = true;
                            break;
                        } else {
                            j = false;
                        }
                    }

                } while (j);

                Field.mouseEvent.checkTheHit(x, y, player, player,
                    'message',
                    'Ваш корабль потоплен',
                    'По вашему кораблю попали',
                    'player',
                    computerID, playerID, loseMessage,
                    false,
                    true);

            }
        },

        getPlayerShot: function (event, player, computer, computerID, playerID, messageID, winnerMessage) {

            // Проверяем, не является ли клетка в статусе "мимо"
            let className = event.target.className;
            if (
                className !== 'dot' &&
                className !== 'safe' &&
                className !== 'hit'
            ) {

                // Определяем координаты клика
                let x = Field.mouseEvent.getCursorCoords(event.offsetX);
                let y = Field.mouseEvent.getCursorCoords(event.offsetY);

                Field.mouseEvent.checkTheHit(x, y, computer, player,
                    'message',
                    'Вы потопили корабль!',
                    'Вы попали по кораблю!',
                    'computer',
                    computerID, playerID, winnerMessage,
                    true,
                    false);
            }

        },

        getSkip: function(event, fieldID) {
            let className = event.target.className;

            // Проверяем состояние клетки и добавляем/убираем "safe" состояние
            if (className !== 'dot' &&
                className !== 'safe' &&
                className !== 'hit')
            {
                // Определяем координаты клика по игровому полю
                let x = Field.mouseEvent.getCursorCoords(event.offsetX);
                let y = Field.mouseEvent.getCursorCoords(event.offsetY);
                Field.mouseEvent.displayCell(x, y, fieldID, 'safe');

            } else if (className === 'safe') {
                event.target.remove();
            }
        }

    }

    constructor(field) {
        this.name = field;
        this.ships = {};
        this.totalHealth = 0;
        this.shootingData = [];
        this.firing = {
            fire: false,
            shots: [],
        };
    }
}