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

    points: Point[] = [];
    clusters: Cluster[] = [];

    width: number = 875;
    height: number = 875;

    private changed: boolean = false;

    constructor(private title: Title,
        private rnd: RandomService,
        private util: SharedUtilityService
    ) {
        this.title.setTitle("Knn Clustering");
    }

    ngAfterViewInit() {

        this.canvas.clear();
        setTimeout(() => {
            this.start();
        }, 2);
    }

    initialize() {
        for (let i = 0; i < this.input.points; i++) {
            this.points[i] = new Point(this.rnd.next(10, this.width - 10), this.rnd.next(10, this.height - 10));
        }

        this.clusters = [];
        let cur = 0;
        for (let i = 0; i < this.input.clusters; i++) {
            this.clusters[i] = new Cluster(this.rnd.getRandomColor());
            this.clusters[i].center = new Point(this.rnd.next(10, this.width - 10), this.rnd.next(10, this.height - 10));
            for (let j = 0; j < this.input.points / this.input.clusters && cur < this.input.points; j++)
                this.clusters[i].points[j] = this.points[cur++];
        }
    }

    start() {
        this.initialize();
        this.run();
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


    run() {
        this.changed = false;
        this.clusters.forEach(cluster => {
            const diff = this.calculateCenter(cluster);
            if (diff > 0.1) this.changed = true;
        });
        this.reevaluatePoints();
        this.draw();

        if (this.changed) {
            setTimeout(() => this.run(), 100);
        } else {
            alert('done');
        }
    }

    reevaluatePoints() {
        this.clusters.forEach(cluster => cluster.points = []);
        this.points.forEach(point => {
            const cluster = this.getClusterWithMinDistance(point);
            cluster.addPoint(point);
        });
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

        this.points.forEach(city => {
            this.canvas.strokeStyle = 'green';
            this.canvas.circle(city.x, city.y, 2);
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
