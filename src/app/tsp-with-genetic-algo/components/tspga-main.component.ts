import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Point } from '../../shared/data-models';
import { Population, City, Gene, Chromosome } from '../data-models';
import { UtilityService } from '../services/utility.service';
import { FitnessService } from '../services/fitness.service';
import { MutationService } from '../services/mutation.service';
import { DistanceService } from '../services/distance.service';
import { CrossOverService } from '../services/crossover.service';
import { SelectionService } from '../services/selection.service';
import { RandomService } from '../../shared/services/random.service';
import { LoopComponent } from 'src/app/shared/components/loop/loop.component';
import { TSPGAConfiguration as config } from '../configuration/tsp-ga.configuration';
import { EnhancedCanvasComponent } from '../../shared/components/enhanced-canvas/enhanced-canvas.component';

@Component({
    selector: 'tsp-ga',
    templateUrl: 'tspga-main.component.html'
})
export class TSPGAMainComponent extends LoopComponent {
    @ViewChild(EnhancedCanvasComponent) canvas: EnhancedCanvasComponent;

    cities: City[];
    population: Population;
    width: number = 875;
    height: number = 875;

    stopAfter: number = 200;
    bestGeneration: number = -1;

    populationSize: number;
    numberOfCities: number;
    mutationRate: number;

    bestGene: Chromosome;
    bestLocalGene: Chromosome;
    bestFitness: number = 0;
    bestLocalFitness: number;
    currentGeneration: number = 0;
    lastFitnessCount: number;

    constructor(private title: Title,
        private crossOver: CrossOverService,
        private rnd: RandomService,
        private fitness: FitnessService,
        private mutation: MutationService,
        private distance: DistanceService,
        private selection: SelectionService,
        private util: UtilityService
    ) {
        super(true);
        this.animationSpeed = 0;
        this.title.setTitle("TSP with Genetic Algorithm");
        this.populationSize = config.populationSize;
        this.numberOfCities = config.numberOfCities;
        this.mutationRate = config.mutationRate;
    }

    initialize() {
        this.bestGene = undefined;
        this.bestLocalGene = undefined;
        this.bestFitness = 0;
        this.bestLocalFitness = 0;
        this.currentGeneration = 0;
        this.lastFitnessCount = 0;
        this.mutation.count = 0;
        this.bestGeneration = -1;

        this.mutation.setMutationRate(this.mutationRate);

        this.cities = [];
        let order = [];

        for (let i = 0; i < this.numberOfCities; i++) {
            this.cities[i] = new City(this.rnd.next(10, this.width - 10), this.rnd.next(10, this.height - 10));
            order[i] = i;
        }

        this.distance.registerCities(this.cities);

        this.population = new Population();
        for (let i = 0; i < this.populationSize; i++) {
            let chromosome = new Chromosome();
            chromosome.genes = this.util.shuffleArray(order.map(x => new Gene(x)));
            this.population.push(chromosome);
        }
    }

    run() {
        this.calculateFitness();
        this.runGeneration();
    }

    private runGeneration() {
        this.currentGeneration++;

        const newPopulation = new Population();
        if (this.bestGene) {
            newPopulation.push(this.bestGene.clone());

            let x = this.bestGene.clone();
            this.mutation.forceMutate(x);
            newPopulation.push(x.clone());

            this.mutation.forceMutate(x);
            newPopulation.push(x.clone());
            newPopulation.push(x);
        }

        while (newPopulation.length < this.populationSize) {
            const first = this.selection.tournament(this.population);
            const second = this.selection.tournament(this.population);
            const child = this.crossOver.getChild(first, second);

            this.mutation.mutate(child);
            newPopulation.push(child);
        }

        this.population = newPopulation;
    }

    private calculateFitness() {
        this.population.chromosomes.forEach(ch => {
            ch.fitness = this.fitness.calculateFitness(ch);
        });

        this.population.sort();
        this.population.takeTop(this.populationSize);

        this.bestLocalGene = this.population.top;
        this.bestLocalFitness = this.bestLocalGene.fitness;

        this.selection.normalizeFitness(this.population);

        this.checkGenerationResults();
    }

    private checkGenerationResults() {
        if (this.bestFitness < this.bestLocalFitness) {
            this.bestFitness = this.bestLocalFitness;
            this.bestGene = this.bestLocalGene;
            this.bestGeneration = this.currentGeneration;
            this.draw(this.cities, this.bestGene.genes.map(x => x.value));
            this.lastFitnessCount = 1;
        } else {
            this.lastFitnessCount++;

            if (this.lastFitnessCount >= this.stopAfter) {
                this.isRunning = false;
            }
        }
    }

    private draw(cities: City[], order: number[]) {
        this.canvas.clear();
        this.canvas.font = '14px serif';

        this.canvas.strokeStyle = 'green';
        cities.forEach(city => {
            this.canvas.circle(city.x, city.y, 2);
        });

        this.canvas.strokeStyle = 'blue';

        let points = order.map(i => <Point>cities[i]);

        this.canvas.polygon(points, { closePolygon: true })
    }
}
