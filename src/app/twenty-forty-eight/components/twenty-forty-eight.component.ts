import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RandomService } from '../../shared/services/random.service';
import { BoardOf2048 } from '../data-models/board';
import { GameService } from '../services/game.service';
import { Genetic2048Service } from '../services/genetic2048.service';
import { Direction, DIRECTIONS } from '../data-models/direction';

enum KEY_CODE {
    Up_ARROW = 38,
    Down_ARROW = 40,
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
    selector: 'twenty-forty-eight',
    templateUrl: 'twenty-forty-eight.component.html',
    styleUrls: ['twenty-forty-eight.component.scss']
})
export class TwentyFortyEightComponent {

    board: BoardOf2048;
    generations: number = 0;

    constructor(private title: Title,
        private rnd: RandomService,
        private game: GameService,
        private genetic: Genetic2048Service
    ) {
        this.title.setTitle("2048");
        this.board = new BoardOf2048();

        this.game.addRandomNumber(this.board);
        this.game.addRandomNumber(this.board);

        this.genetic.calculateFitness();
        this.runGenetic();
    }

    runGenetic() {
        this.genetic.makeNewPopulation();

        const fitness = this.genetic.calculateFitness();
        console.log(`Generation : ${this.generations + 1}. Best fitness: ${fitness}`);

        this.generations++;
        if (this.generations < 500) {
            setTimeout(() => this.runGenetic(), 0);
        }
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        switch (event.keyCode) {
            case KEY_CODE.Up_ARROW: this.game.advance(this.board, Direction.Up); break;
            case KEY_CODE.Down_ARROW: this.game.advance(this.board, Direction.Down); break;
            case KEY_CODE.RIGHT_ARROW: this.game.advance(this.board, Direction.Right); break;
            case KEY_CODE.LEFT_ARROW: this.game.advance(this.board, Direction.Left); break;
        }
    }

}
