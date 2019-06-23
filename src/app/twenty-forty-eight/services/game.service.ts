import { Injectable } from '@angular/core';
import { BoardOf2048 } from '../data-models/board';
import { Direction } from '../data-models/direction';
import { RandomService } from 'src/app/shared/services/random.service';
import { Chromosome2048 } from '../data-models/gene2048';

@Injectable()
export class GameService {


    constructor(private rnd: RandomService) { }

    advance(board: BoardOf2048, direction: Direction): boolean {
        let foundAMove = false;
        switch (direction) {
            case Direction.Down: foundAMove = this.moveDown(board); break;
            case Direction.Up: foundAMove = this.moveUp(board); break;
            case Direction.Left: foundAMove = this.moveLeft(board); break;
            case Direction.Right: foundAMove = this.moveRight(board); break;
        }

        if (!foundAMove) {
            // console.log('did not find any move');
            return false;
        }

        this.addRandomNumber(board);
        return true;
    }

    startBoard(board: BoardOf2048) {
        this.addRandomNumber(board);
        this.addRandomNumber(board);
    }

    addRandomNumber(board: BoardOf2048) {
        if (board.isFull()) {
            throw new Error('The board is full');
        }
        const value = this.rnd.next() > 0.8 ? 4 : 2;
        let x: number, y: number;
        do {
            x = this.rnd.next(0, 4);
            y = this.rnd.next(0, 4);
        } while (!board.isEmpty(x, y))

        board.set(x, y, value);
    }

    moveDown(board: BoardOf2048): boolean {
        let foundAMove = false;
        const isMerged = [[], [], [], []];
        for (let i = 3; i >= 0; i--) {
            for (let j = 0; j < 4; j++) {
                if (board.isEmpty(i, j)) continue;

                for (let k = i + 1; k < 4; k++) {
                    if (board.isEmpty(k, j)) {
                        board.set(k, j, board.at(k - 1, j));
                        board.clear(k - 1, j);
                        foundAMove = true;
                    } else {
                        if (!isMerged[k][j] && board.at(k, j) === board.at(k - 1, j)) {
                            board.doubleAt(k, j);
                            board.clear(k - 1, j);
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

    moveUp(board: BoardOf2048): boolean {
        let foundAMove = false;
        const isMerged = [[], [], [], []];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board.isEmpty(i, j)) continue;

                for (let k = i - 1; k >= 0; k--) {
                    if (board.isEmpty(k, j)) {
                        board.set(k, j, board.at(k + 1, j));
                        board.clear(k + 1, j);
                        foundAMove = true;
                    } else {
                        if (!isMerged[k][j] && board.at(k, j) === board.at(k + 1, j)) {
                            board.doubleAt(k, j);
                            board.clear(k + 1, j);
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

    moveRight(board: BoardOf2048): boolean {
        let foundAMove = false;
        const isMerged = [[], [], [], []];
        for (let j = 3; j >= 0; j--) {
            for (let i = 0; i < 4; i++) {
                if (board.isEmpty(i, j)) continue;

                for (let k = j + 1; k < 4; k++) {
                    if (board.isEmpty(i, k)) {
                        board.set(i, k, board.at(i, k - 1));
                        board.clear(i, k - 1);
                        foundAMove = true;
                    } else {
                        if (!isMerged[i][k] && board.at(i, k) === board.at(i, k - 1)) {
                            board.doubleAt(i, k);
                            board.clear(i, k - 1);
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

    moveLeft(board: BoardOf2048): boolean {
        let foundAMove = false;
        const isMerged = [[], [], [], []];
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                if (board.isEmpty(i, j)) continue;

                for (let k = j - 1; k >= 0; k--) {
                    if (board.isEmpty(i, k)) {
                        board.set(i, k, board.at(i, k + 1));
                        board.clear(i, k + 1);
                        foundAMove = true;
                    } else {
                        if (!isMerged[i][k] && board.at(i, k) === board.at(i, k + 1)) {
                            board.doubleAt(i, k);
                            board.clear(i, k + 1);
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
}
