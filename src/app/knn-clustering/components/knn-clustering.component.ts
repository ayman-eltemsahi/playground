import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Cluster } from '../data-models/';
import { Point } from '../../shared/data-models/';
import { RandomService } from '../../shared/services/random.service';
import { SharedUtilityService } from 'src/app/shared/services/shared-utility.service';
import { KNNClusteringConfiguration as config } from '../configuration/knn-clustering.configuration';
import { EnhancedCanvasComponent } from '../../shared/components/enhanced-canvas/enhanced-canvas.component';


@Component({
    selector: 'knn-clustering',
    templateUrl: 'knn-clustering.component.html'
})
export class KnnClusteringMainComponent implements AfterViewInit {
    @ViewChild(EnhancedCanvasComponent) canvas: EnhancedCanvasComponent;

    input: {
        points: number,
        clusters: number,
        cycle: number,
        animationSpeed: number
    } = {
            clusters: config.numberOfClusters,
            points: config.numberOfPoints,
            animationSpeed: config.animationSpeed,
            cycle: 0
        };

    width: number = 875;
    height: number = 875;

    isRunning: boolean = false;
    finished: boolean = false;

    private clusters: Cluster[] = [];
    private points: Point[] = [];

    constructor(private title: Title,
        private rnd: RandomService,
        private util: SharedUtilityService
    ) {
        this.title.setTitle("KNN Clustering");
    }

    ngAfterViewInit() {

        this.canvas.clear();
        setTimeout(() => {
            this.start();
        }, 2);
    }

    initialize() {
        this.isRunning = true;
        this.finished = false;
        this.input.cycle = 0;
        this.points = this.rnd.randomPoints(this.input.points, 10, this.width - 10, 10, this.height - 10);

        this.clusters = [];
        for (let i = 0; i < this.input.clusters; i++) {
            this.clusters[i] = new Cluster(this.rnd.randomColor());
            this.clusters[i].center = this.rnd.randomPoint(10, this.width - 10, 10, this.height - 10);
        }
        this.evaluatePoints();
    }

    start() {
        this.initialize();
        this.run();
    }

    run() {
        this.input.cycle++;
        this.draw();
        this.isRunning = false;
        this.clusters.forEach(cluster => {
            const diff = this.calculateCenter(cluster);
            if (diff > 0.1) this.isRunning = true;
        });
        this.evaluatePoints();
        this.draw();

        if (this.isRunning) {
            setTimeout(() => this.run(), this.input.animationSpeed);
        } else {
            this.finish();
        }
    }

    calculateCenter(cluster: Cluster) {
        let n = cluster.points.length;
        let x = 0, y = 0;

        for (let i = 0; i < n; i++) {
            x += cluster.points[i].x;
            y += cluster.points[i].y;
        }

        if (n !== 0) {
            x /= n;
            y /= n;
        }

        var diff = Math.abs(x - cluster.center.x) + Math.abs(y - cluster.center.y);
        cluster.center = new Point(x, y);
        return diff;
    }

    evaluatePoints() {
        this.clusters.forEach(cluster => cluster.points = []);
        this.points.forEach(point => {
            const cluster = this.getClusterWithMinDistance(point);
            cluster.addPoint(point);
        });
    }

    finish() {
        this.isRunning = false;
        this.finished = true;
    }

    private getClusterWithMinDistance(point: Point): Cluster {
        let bestCluster = this.clusters[0];
        let bestDistance = Number.MAX_VALUE;
        this.clusters.forEach(cluster => {
            const distance = this.util.distancePoint(cluster.center, point);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestCluster = cluster;
            }
        });

        return bestCluster;
    }

    private draw() {
        this.canvas.clear();
        this.canvas.font = '14px serif';

        this.points.forEach(point => {
            this.canvas.strokeStyle = 'green';
            this.canvas.circle(point.x, point.y, 2);
        });

        this.canvas.strokeStyle = 'blue';

        this.canvas.lineWidth = 2;
        this.clusters.forEach(cl => {
            this.canvas.strokeStyle = cl.color;
            cl.points.forEach(point => {
                this.canvas.polygon([point, cl.center]);
            });
        });
    }
}
