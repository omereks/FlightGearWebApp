function dist(a, b){
    return Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y,2));
}

//making a circle out of 2 points
function trivialCircle2(p1,p2){
    let radius = dist (p1, p2) / 2;
    let cx = (p1.x + p2.x) / 2;
    let cy = (p1.y + p2.y) / 2;
    let center = new Point (cx, cy);
    return new Circle(center, radius);
}


//making a circle out of 3 points from Wikipdia
function trivialCircle3(p1, p2, p3){
    let bx = p2.x - p1.x;
    let by = p2.y - p1.y;
    let cx = p3.x - p1.x;
    let cy = p3.y - p1.y;

    let B = bx * bx + by * by;
    let C = cx * cx + cy * cy;
    let D = bx * cy - by * cx;

    let centerX = (cy * B - by * C) / (2 * D) + p1.x;
    let centerY = (bx * C - cx * B) / (2 * D) + p1.y;

    let center = new Point(centerX, centerY);

    let radius = dist(center, p1);

    return new Circle(center, radius);
}

function trivial(P){
    if(P.size()===0)
        return new Circle(new Point(0,0),0);
    else if(P.size()===1)
        return new Circle(P[0],0);
    else if (P.size()===2)
        return trivialCircle2(P[0],P[1]);

    // maybe 2 of the points define a small circle that contains the 3ed point
    let c=trivialCircle2(P[0],P[1]);
    if(dist(P[2],c.center)<=c.radius)
        return c;
    c=trivialCircle2(P[0],P[2]);
    if(dist(P[1],c.center)<=c.radius)
        return c;
    c=trivialCircle2(P[1],P[2]);
    if(dist(P[0],c.center)<=c.radius)
        return c;
    // else find the unique circle from 3 points
    return trivialCircle3(P[0],P[1],P[2]);
}

/*
function swap(pElement, pElement2) {
    let element;
    element = pElement;
    pElement = pElement2;
    pElement2 = element;
}
*/

//recursiv Wexler Algo
function minds(P, R, n){
    let element;
    if(n===0 || R.size()===3){
        return trivial(R);
    }

    // remove random point p
    // swap is more efficient than remove
    //srand (time(NULL));
    let i=Math.random()%n;
    let p = new Point (P[i].x,P[i].y);
    element = P[i];
    P[i] = P[n-1];
    P[n-1] = element;
   // swap(P[i],P[n-1]);


    let c=minds(P,R,n-1);

    if(dist(p,c.center)<=c.radius)
        return c;

    R.push(p);

    return minds(P,R,n-1);
}

function findMinCircle(points, size){
    return minds(points,{},size);
}
