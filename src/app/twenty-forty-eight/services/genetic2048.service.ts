import { Injectable } from '@angular/core';
import { RandomService } from 'src/app/shared/services/random.service';
import { BoardOf2048 } from '../data-models/board';
import { Chromosome2048 } from '../data-models/gene2048';
import { Population2048 } from '../data-models/population2048';
import { Mutation2048Service } from './mutation2048.service';
import { Selection2048Service } from './selection2048.service';
import { CrossOver2048Service } from './crossover2048.service';
import { GameService } from './game.service';
import { DIRECTIONS } from '../data-models/direction';

const L1: number = 8;
const POPULATION_SIZE = 10;

@Injectable()
export class Genetic2048Service {

    population: Population2048
    bestChromosome: Chromosome2048;
    bestLocalGene: Chromosome2048;

    bestFitness: number;
    bestLocalFitness: number;

    constructor(private rnd: RandomService,
        private mutation: Mutation2048Service,
        private selection: Selection2048Service,
        private crossOver: CrossOver2048Service,
        private game: GameService
    ) {
        this.population = new Population2048();
        for (let i = 0; i < POPULATION_SIZE; i++) this.population.push(this.createChromosome());
    }

    createChromosome(): Chromosome2048 {
        const gene = new Chromosome2048();
        for (let i = 0; i < L1; i++) gene.layer1.push(this.rnd.next());
        for (let i = 0; i < 4; i++) gene.layer2.push(this.rnd.next());
        return gene;
    }

    makeNewPopulation() {
        const newPopulation = new Population2048();
        if (this.bestChromosome) {
            newPopulation.push(this.bestChromosome.clone());

            let x = this.bestChromosome.clone();
            this.mutation.forceMutate(x);
            newPopulation.push(x.clone());

            this.mutation.forceMutate(x);
            newPopulation.push(x.clone());
            newPopulation.push(x);
        }

        while (newPopulation.length < POPULATION_SIZE) {
            const first = this.selection.tournament(this.population);
            const second = this.selection.tournament(this.population);
            const child = this.crossOver.getChild(first, second);

            this.mutation.mutate(child);
            newPopulation.push(child);
        }

        this.population = newPopulation;
    }

    calculateFitness() {
        const boards: BoardOf2048[] = [];
        for (let i = 0; i < 4; i++) {
            boards[i] = new BoardOf2048();
            this.game.startBoard(boards[i]);
        }
        this.population.chromosomes.forEach(chromosome => {
            const scores = this.playGame(boards[0].clone(), chromosome) +
                this.playGame(boards[1].clone(), chromosome) +
                this.playGame(boards[2].clone(), chromosome) +
                this.playGame(boards[3].clone(), chromosome);
            chromosome.fitness = scores / boards.length;
        });

        this.population.sort();
        this.population.takeTop(POPULATION_SIZE);

        this.bestLocalGene = this.population.top;
        this.bestLocalFitness = this.bestLocalGene.fitness;

        this.selection.normalizeFitness(this.population);

        return this.bestLocalFitness;
    }

    playGame(board: BoardOf2048, chromosome: Chromosome2048): number {
        let running = true;
        while (running) {
            running = false;
            const foundAMove = this.playNextMove(board, chromosome);

            if (foundAMove) {
                running = true;
            } else {
                return this.getScore(board);
            }
        }
    }

    playNextMove(board: BoardOf2048, chromosome: Chromosome2048): boolean {
        const result = this.getNextMove(board, chromosome);
        const resWithIndex = result.map((value, index) => ({ value, index }));
        resWithIndex.sort((a, b) => b.value - a.value);

        return this.game.advance(board, DIRECTIONS[resWithIndex[0].index]) ||
            this.game.advance(board, DIRECTIONS[resWithIndex[1].index]) ||
            this.game.advance(board, DIRECTIONS[resWithIndex[2].index]) ||
            this.game.advance(board, DIRECTIONS[resWithIndex[3].index]);
    }


    getNextMove(board: BoardOf2048, gene: Chromosome2048) {
        const result1 = [];
        for (let i = 0; i < gene.layer1.length; i++) {
            result1[i] = 0;
            board.forEach((val: number) => result1[i] += gene.layer1[i] * val);
            result1[i] = 1 / (1 + Math.exp(-result1[i]));
        }

        const result2 = [];
        for (let i = 0; i < gene.layer2.length; i++) {
            result2[i] = 0;
            for (let j = 0; j < gene.layer1.length; j++) {
                result2[i] += gene.layer2[i] * result1[j];
            }

            result2[i] = 1 / (1 + Math.exp(-result2[i]));
        }

        return result2;
    }

    getScore(board: BoardOf2048): number {
        let score = 0;
        board.forEach((val: number) => score += val);
        return score;
    }

}
