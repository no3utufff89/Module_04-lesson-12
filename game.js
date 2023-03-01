'use strict';

(() => {
  // Фразы и названия фигур
  const FIGURES_ENG = ['rock', 'scissors', 'paper'];
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];
  const MESSAGE_ENG = {
    tie: 'Tie!',
    win: 'You win!',
    lose: 'You lose!',
    cancel: 'You canceled the game',
    exit: 'Do you really want to exit?',
    result: 'Player: $$$ Computer: $$$',
    move: 'Enter your move (rock, paper, scissors)',
    invalid: 'Wrong move, try again',
    again: 'Do you want to play again?',

  };
  const MESSAGE_RUS = {
    tie: 'Ничья!',
    win: 'Вы выиграли!',
    lose: 'Вы проиграли!',
    cancel: 'Вы отменили игру',
    exit: 'Действительно ли вы хотите выйти?',
    result: 'Игрок: $$$ Компьютер: $$$',
    move: 'Введите ваш ход (камень, ножницы, бумага)',
    invalid: 'Неверный ход, пожалуйста, попробуйте еще раз.',
    again: 'Еще тянет играть?',
  };
    // ==========================

  class GameSettings {
    constructor(figures, messages) {
      this.figures = figures;
      this.messages = messages;
    }
  }
  const createObject = (lang) => {
    let gameSettings;
    if (lang === 'ENG' || lang === 'EN') {
      gameSettings = new GameSettings(FIGURES_ENG, MESSAGE_ENG);
      return gameSettings;
    } else {
      gameSettings = new GameSettings(FIGURES_RUS, MESSAGE_RUS);
      return gameSettings;
    }
  };
  // Получаем случайное число в заданном диапозоне
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
    // Ход компьютера, получаем фигуру на основе полученного языка
  const getBotFigure = (settings) => {
    const botRandomNumber = getRandom(1, 3);
    return settings.figures[botRandomNumber - 1];
  };
  // Ход игрока
  const getPlayerMove = (settings) => prompt(settings.messages.move);
  // ОСНОВА =======================================================================================================
  const game = (lang) => {
    // Конструируем языковой объект
    const settings = createObject(lang);

    // Проверка результатов ходов
    const compareRes = (playerFigure, botFigure) => {
      if (settings.figures.indexOf(playerFigure) === -1) {
        alert(settings.messages.invalid);
        return start(settings);
      }
      if (playerFigure === botFigure) {
        alert(settings.messages.tie);
        return 'tie';
      } else if (
        (botFigure === settings.figures[0] && playerFigure === settings.figures[2]) ||
                (botFigure === settings.figures[1] && playerFigure === settings.figures[0]) ||
                (botFigure === settings.figures[2] && playerFigure === settings.figures[1])
      ) {
        alert(settings.messages.win);
        return 'win';
      } else {
        alert(settings.messages.lose);
        return 'lose';
      }
    };
    // Делаеем ходы

    function start(settings) {
      const result = {
        player: 0,
        computer: 0,
      };
      let playerWins = 0;
      let computerWins = 0;
      // запускаем функцию хода компа
      const botFigure = getBotFigure(settings);
      // запускаем функцию хода игрока
      const playerFigure = getPlayerMove(settings);
      if (playerFigure === null || playerFigure === '') {
        const cancel = confirm(settings.messages.exit);
        if (cancel) {
          alert(
              settings.messages.result
                  .replace('$$$', result.player)
                  .replace('$$$', result.computer),
          );
          return;
        } else {
          return game(lang);
        }
      }
      // Все походили, пора сравнить фигуры
      const checkResult = compareRes(playerFigure, botFigure);
      if (checkResult === 'win') {
        result.player++;
        playerWins++;
      } else if (checkResult === 'lose') {
        result.computer++;
        computerWins++;
      }
      alert(`Компьютер показал: ${botFigure} Игрок показал: ${playerFigure}`);
      const again = confirm(settings.messages.again);
      if (again) {
        game(lang);
      } else {
        alert(
            `Игрок выиграл ${playerWins} раз,Компьютер выиграл ${computerWins} раз`,
        );
      }
      console.log(playerFigure);
      console.log(botFigure);
    }
    start(settings);
  };
  window.RPS = game;
})();
