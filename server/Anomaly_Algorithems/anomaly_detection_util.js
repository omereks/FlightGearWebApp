function avg(x, size){
    let fi = 0, sum = 0;
    for(let i = 0; i < size; i++) {
        sum += x[i];
    }
    if (size * sum === 0) {
        return 0;
    }
    fi = 1 / size * sum;
    return fi;
}

function vars(x, size) {
    let var1 , sumPow=0, fi;
    for(let i=0; i < size; i++) {
        sumPow += Math.pow(x[i], 2);
    }
    fi = avg(x , size);
    if (size * sumPow === 0) {
        return 0;
    }
    var1 = 1 / size * sumPow - Math.pow(fi, 2);
    return var1;
}

function cov(x, y, size) {
    let covar, sum = 0;
    for(let i = 0; i < size; i++) {
        sum += (x[i] - avg(x , size)) * (y[i] - avg(y , size));
    }

    covar = sum / size;
    return covar;
}

function pearson(x, y, size) {
    return cov(x, y, size) / (Math.sqrt(vars(x, size)) * Math.sqrt(vars(y, size)));
}

function linear_reg(points, size){
    let a, b;
    let x = [];
    let y = [];
    for(let i = 0; i < size; i++) {
        x[i] = points[i].x;
        y[i] = points[i].y;
    }
    a = cov(x , y, size) / vars(x , size);
    b = avg(y , size) - a * avg(x , size);
    return new Line(a, b);
}

function linear_reg(x, y, size) {
    let a, b;
    a = cov(x , y, size) / vars(x , size);
    b = avg(y , size) - a * avg(x , size);
    return new Line(a, b);
}

function dev(p, points, size){
    let fx, dis;
    let l = linear_reg(points , size);
    fx = l.f(p.x);
    dis = Math.abs(fx - p.y);
    return dis;

}

function dev(p,l) {
    let fx, dis;
    fx = l.f(p.x);
    dis = Math.abs(fx - p.y);
    //  cout << "div1" << endl ;
    return dis;
//return 0;
}