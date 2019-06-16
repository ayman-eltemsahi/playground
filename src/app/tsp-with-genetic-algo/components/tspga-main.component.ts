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

    width: number = 875;
    height: number = 875;

    stopAfter: number = config.stopAfter;
    numberOfCities: number = config.numberOfCities;
    populationSize: number = config.populationSize;
    mutationRate: number = config.mutationRate;
    bestGeneration: number = -1;

    private cities: City[];
    private population: Population;

    private bestGene: Chromosome;
    private bestLocalGene: Chromosome;
    private bestFitness: number = 0;
    private bestLocalFitness: number;
    private lastFitnessCount: number;

    constructor(private title: Title,
        private rnd: RandomService,
        private util: UtilityService,
        private fitness: FitnessService,
        private mutation: MutationService,
        private distance: DistanceService,
        private selection: SelectionService,
        private crossOver: CrossOverService
    ) {
        super(true);
        this.animationSpeed = 0;
        this.title.setTitle("TSP with Genetic Algorithm");
    }

    initialize() {
        this.bestGene = undefined;
        this.bestLocalGene = undefined;
        this.bestFitness = 0;
        this.bestLocalFitness = 0;
        this.lastFitnessCount = 0;
        this.mutation.count = 0;
        this.bestGeneration = -1;

        this.mutation.setMutationRate(this.mutationRate);

        this.cities = [];
        const order = [];

        for (let i = 0; i < this.numberOfCities; i++) {
            this.cities[i] = new City(this.rnd.next(10, this.width - 10), this.rnd.next(10, this.height - 10));
            order[i] = i;
        }

        this.cities[0].desiredPriority = 10;
        this.cities[1].desiredPriority = 100;
        this.cities[2].desiredPriority = 5;
        this.cities[3].desiredPriority = 10;
        this.cities[4].desiredPriority = 20;

        this.distance.registerCities(this.cities);

        this.population = new Population();
        for (let i = 0; i < this.populationSize; i++) {
            const chromosome = new Chromosome();
            chromosome.genes = this.util.shuffleArray(order.map(x => new Gene(x)));
            this.population.push(chromosome);
        }

        this.calculateFitness();
    }

    run() {
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
        this.calculateFitness();
    }

    private calculateFitness() {
        this.population.chromosomes.forEach(ch => {
            ch.fitness = this.fitness.calculateFitness(ch, this.cities);
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
            this.bestGeneration = this.cycle;
            this.lastFitnessCount = 1;
            this.draw();
        } else {
            this.lastFitnessCount++;

            if (this.lastFitnessCount > this.stopAfter) {
                this.stop();
            }
        }
    }

    private draw() {
        const order: number[] = this.bestGene.genes.map(x => x.value);
        this.canvas.clear();
        this.canvas.font = '14px serif';

        this.canvas.strokeStyle = 'green';
        this.cities.forEach((city, i) => {
            this.canvas.circle(city.x, city.y, i == order[0] ? 10 : (city.desiredPriority > 0 ? 5 : 2));
            if (city.desiredPriority > 0) {
                var itsOrder = order.findIndex(o => o === i);
                this.canvas.text(itsOrder + ' > ' + city.desiredPriority, city.x, city.y);
            }
        });

        this.canvas.strokeStyle = 'blue';

        const points: Point[] = order.map(i => this.cities[i]);
        this.canvas.polygon(points, { closePolygon: false })
    }
}
