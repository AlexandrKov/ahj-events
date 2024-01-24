class Cell {
    constructor() {
      this.element = document.createElement("div");
      this.element.classList.add("cell");
    }
  }

  class Character {
    constructor() {
      this.element = document.querySelector(".goblin");
      this.element.classList.add("active");
    }

    moveTo(cell) {
      cell.appendChild(this.element);
    }

    removeGoblinClass() {
      this.element.classList.remove("active");
    }
  }

  class GoblinGame {
    constructor() {
      this.gameBoard = document.querySelector(".board");
      this.scoreElement = document.querySelector(".score");
      this.missedElement = document.querySelector(".miss");
      this.restartButton = document.querySelector("restart-button");
      this.intervalId = null;
      this.score = 0;
      this.prevCell = 0;
      this.missedGoblins = 0;
      this.cells = [];
      this.character = new Character();

      this.initializeBoard();
      this.placeCharacter();
      this.attachClickHandler();
      this.moveCharacter();
    }

    initializeBoard() {
      for (let i = 0; i < 16; i++) {
        const cell = new Cell();
        this.cells.push(cell);
        this.gameBoard.appendChild(cell.element);
      }
    }

    placeCharacter() {
      const randomCell = this.getRandomCell();
      this.character.moveTo(randomCell);
    }

    getRandomCell() {
      let randomCell;
      do {
        randomCell = Math.floor(Math.random() * this.cells.length);
      } while (this.prevCell === randomCell);

      this.prevCell = randomCell;
      return this.cells[randomCell].element;
    }

    attachClickHandler() {
      this.gameBoard.addEventListener("click", (e) => {
        const characterCell = e.target;
        if (characterCell.classList.contains("active")) {
          this.score++;
          this.scoreElement.textContent = `Score: ${this.score}`;
          this.character.removeGoblinClass();
          if (this.missedGoblins > 0) {
            this.missedGoblins--;
          }
        }
      });
    }

    moveCharacter() {
      this.intervalId = setInterval(() => {
        const nextCell = this.getRandomCell();
        this.character.moveTo(nextCell);
        this.missedGoblins++;
        this.missedElement.textContent = `Missed: ${this.missedGoblins}`;
        if (!this.character.element.classList.contains("active")) {
          this.character.element.classList.add("active");
        }
        if (this.missedGoblins >= 5) {
          this.endGame();
        }
      }, 1000);
    }

    endGame() {
      clearInterval(this.intervalId);
      this.scoreElement.textContent = `Game Over! Your score: ${this.score}`;
      this.missedElement.textContent = "";
      this.missedGoblins = 0;
      this.score = 0;
      this.character.removeGoblinClass();
      this.showRestartButton();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
      new GoblinGame();
  });


