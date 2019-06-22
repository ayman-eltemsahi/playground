import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RandomService } from '../../shared/services/random.service';

enum Direction {
    Up,
    Down,
    Left,
    Right
}

enum KEY_CODE {
    Up_ARROW = 38,
    Down_ARROW = 40,
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

const DIRECTIONS = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];

@Component({
    selector: 'twenty-forty-eight',
    templateUrl: 'twenty-forty-eight.component.html',
    styleUrls: ['twenty-forty-eight.component.scss']
})
export class TwentyFortyEightComponent {

    board: any[];

    constructor(private title: Title,
        private rnd: RandomService
    ) {
        this.title.setTitle("2048");
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        this.addRandomNumber();
        this.addRandomNumber();

        // this.guess();
    }

    guess() {
        setTimeout(() => {

            let result: boolean;

            result = this.advance(Direction.Down) ||
                this.advance(Direction.Left) ||
                this.advance(Direction.Right) ||
                this.advance(Direction.Up);
            // do {
            //     const dir = DIRECTIONS[this.rnd.next(0, 4)];
            //     result = this.advance(dir);
            // } while (!result)

            if (result)
                this.guess();
        }, 10);
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {

        switch (event.keyCode) {
            case KEY_CODE.Up_ARROW: this.advance(Direction.Up); break;
            case KEY_CODE.Down_ARROW: this.advance(Direction.Down); break;
            case KEY_CODE.RIGHT_ARROW: this.advance(Direction.Right); break;
            case KEY_CODE.LEFT_ARROW: this.advance(Direction.Left); break;
        }
    }

    private advance(direction: Direction): boolean {
        let foundAMove = false;
        switch (direction) {
            case Direction.Down: foundAMove = this.moveDown(); break;
            case Direction.Up: foundAMove = this.moveUp(); break;
            case Direction.Left: foundAMove = this.moveLeft(); break;
            case Direction.Right: foundAMove = this.moveRight(); break;
        }

        if (!foundAMove) {
            console.log('did not find any move');
            return false;
        }
        this.addRandomNumber();
        return true;
    }

    moveDown(): boolean {
        let foundAMove = false;
        const isMerged = [[], [], [], []];
        for (let i = 3; i >= 0; i--) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === 0) continue;

                for (let k = i + 1; k < 4; k++) {
                    if (this.board[k][j] === 0) {
                        this.board[k][j] = this.board[k - 1][j];
                        this.board[k - 1][j] = 0;
                        foundAMove = true;
                    } else {
                        if (!isMerged[k][j] && this.board[k][j] === this.board[k - 1][j]) {
                            this.board[k][j] *= 2;
                            this.board[k - 1][j] = 0;
                            isMerged[k][j] = true;
                            foundAMove = true;
                        }
                        break;
                    }
                }
            }
        }
        return foundAMove;
    }

    moveUp(): boolean {
        let foundAMove = false;
        const isMerged = [[], [], [], []];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === 0) continue;

                for (let k = i - 1; k >= 0; k--) {
                    if (this.board[k][j] === 0) {
                        this.board[k][j] = this.board[k + 1][j];
                        this.board[k + 1][j] = 0;
                        foundAMove = true;
                    } else {
                        if (!isMerged[k][j] && this.board[k][j] === this.board[k + 1][j]) {
                            this.board[k][j] *= 2;
                            this.board[k + 1][j] = 0;
                            isMerged[k][j] = true;
                            foundAMove = true;
                        }
                        break;
                    }
                }
            }
        }
        return foundAMove;
    }

    moveRight(): boolean {
        let foundAMove = false;
        const isMerged = [[], [], [], []];
        for (let j = 3; j >= 0; j--) {
            for (let i = 0; i < 4; i++) {
                if (this.board[i][j] === 0) continue;

                for (let k = j + 1; k < 4; k++) {
                    if (this.board[i][k] === 0) {
                        this.board[i][k] = this.board[i][k - 1];
                        this.board[i][k - 1] = 0;
                        foundAMove = true;
                    } else {
                        if (!isMerged[i][k] && this.board[i][k] === this.board[i][k - 1]) {
                            this.board[i][k] *= 2;
                            this.board[i][k - 1] = 0;
                            isMerged[i][k] = true;
                            foundAMove = true;
                        }
                        break;
                    }
                }
            }
        }
        return foundAMove;
    }

    moveLeft(): boolean {
        let foundAMove = false;
        const isMerged = [[], [], [], []];
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                if (this.board[i][j] === 0) continue;

                for (let k = j - 1; k >= 0; k--) {
                    if (this.board[i][k] === 0) {
                        this.board[i][k] = this.board[i][k + 1];
                        this.board[i][k + 1] = 0;
                        foundAMove = true;
                    } else {
                        if (!isMerged[i][k] && this.board[i][k] === this.board[i][k + 1]) {
                            this.board[i][k] *= 2;
                            this.board[i][k + 1] = 0;
                            isMerged[i][k] = true;
                            foundAMove = true;
                        }
                        break;
                    }
                }
            }
        }
        return foundAMove;
    }

    private addRandomNumber() {
        const value = this.rnd.next() > 0.8 ? 4 : 2;
        let x: number, y: number;
        do {
            x = this.rnd.next(0, 4);
            y = this.rnd.next(0, 4);
        } while (this.board[x][y] > 0)

        this.board[x][y] = value;
    }

    private draw() {

    }
}
