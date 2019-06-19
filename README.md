# Playground

# Projects
## - Algorithms:
#### 1 - TSP with Genetic Algorithm
A solution to The travelling salesman problem using genetic algorithm. The algorithm keeps working with generations of solutions to get to an optimal solution for the problem.
The location of the cities is generated randomly every time.
Available parameters:
    - **Number of cities**: the number of cities that the algorithm will try to find a solution for.
    - **Population size**: the size of the population used internally in the genetic algorithm.
    - **Mutation rate**: the rate of applying mutations on the resulting children in the new population in the genetic algorithm.
    - **Stop after**: the number of generations with no better solution after which the algorithm will stop.

#### 2 - A* Search
Creates a space with many obstacles and tries to find the best path from the top left corner to the bottom right corner. If there is no solution and the algorithm gets stuck, a new space will be created and restarted.
Available parameters:
    - **Columns**: the number of columns.
    - **Rows**: the number of rows.
    - **Obstacle rate**: the ration of the created obstacles in relation to the entire space. Having a high rate of obstacles might create an impossible space to work.

#### 3 - KNN Clustering
Creates some random points and clusters them into a defined number of clusters using *k-nearest neighbors* algorithm.
Available parameters:
    - **No of Clusters**: the number of generated clusters.
    - **Number of cities**: the number of cities that the algorithm will cluster.

## - Physics:
#### 1 - Centered Particles
Creates a space with a couple of points that have a center of gravity. The points will always try to move to their center while moving the mouse near them will repel them.
Available parameters:
    - **Friction**: the friction of the surface.
    - **Mouse Range**: the range of effect of the mouse.
