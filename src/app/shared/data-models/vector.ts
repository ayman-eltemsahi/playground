
export class Vector {
    x: number;
    y: number;

    constructor(_x: number = 0, _y: number = 0) {
        this.x = _x;
        this.y = _y;
    }

    public static get zero(): Vector {
        return new Vector(0, 0);
    }

    public add(other: Vector | number): Vector {
        if (typeof other === "number")
            return new Vector(this.x + other, this.y + other);
        return new Vector(this.x + other.x, this.y + other.y);
    }

    public sub(other: Vector | number): Vector {
        if (typeof other === "number")
            return this.add(-other);
        return new Vector(this.x - other.x, this.y - other.y);
    }

    public mult(other: Vector | number): Vector {
        if (typeof other === "number")
            return new Vector(this.x * other, this.y * other);
        return new Vector(this.x * other.x, this.y * other.y);
    }

    public div(other: Vector | number): Vector {
        if (typeof other === "number")
            return new Vector(this.x / other, this.y / other);
        return new Vector(this.x / other.x, this.y / other.y);
    }
}

export class Vector3D {
    x: number;
    y: number;
    z: number;

    constructor(_x: number = 0, _y: number = 0, _z: number = 0) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

}


// Vector.prototype.add = function (v) { var v = Vector.add(this, v); this.x = v.x; this.y = v.y; return this; }
// Vector.prototype.sub = function (v) { var v = Vector.sub(this, v); this.x = v.x; this.y = v.y; return this; }
// Vector.prototype.mult = function (v) { var v = Vector.mult(this, v); this.x = v.x; this.y = v.y; return this; }
// Vector.prototype.div = function (v) { var v = Vector.div(this, v); this.x = v.x; this.y = v.y; return this; }

// Vector.prototype.limitUp = function (v) {
//     if (this.x > v) this.x = v;
//     if (this.y > v) this.y = v;
//     return this;
// }

// Vector.prototype.limitDown = function (v) {
//     if (this.x < v) this.x = v;
//     if (this.y < v) this.y = v;
//     return this;
// }

// Vector.prototype.limit = function (v) {
//     this.limitUp(v);
//     this.limitDown(-v);
// }

// Vector.add = function (v1, v2) {
//     if (typeof v2 === "number")
//         return new Vector(v1.x + v2, v1.y + v2);
//     return new Vector(v1.x + v2.x, v1.y + v2.y);
// };

// Vector.sub = function (v1, v2) {
//     if (typeof v2 === "number")
//         return new Vector(v1.x - v2, v1.y - v2);
//     return new Vector(v1.x - v2.x, v1.y - v2.y);
// };

// Vector.mult = function (v1, v2) {
//     if (typeof v2 === "number")
//         return new Vector(v1.x * v2, v1.y * v2);
//     return new Vector(v1.x * v2.x, v1.y * v2.y);
// };

// Vector.div = function (v1, v2) {
//     if (typeof v2 === "number")
//         return new Vector(v1.x / v2, v1.y / v2);
//     return new Vector(v1.x / v2.x, v1.y / v2.y);
// };




// Vector3D.prototype.add = function (v) { var v = Vector3D.add(this, v); this.x = v.x; this.y = v.y; this.z = v.z; return this; }
// Vector3D.prototype.sub = function (v) { var v = Vector3D.sub(this, v); this.x = v.x; this.y = v.y; this.z = v.z; return this; }
// Vector3D.prototype.mult = function (v) { var v = Vector3D.mult(this, v); this.x = v.x; this.y = v.y; this.z = v.z; return this; }
// Vector3D.prototype.div = function (v) { var v = Vector3D.div(this, v); this.x = v.x; this.y = v.y; this.z = v.z; return this; }

// Vector3D.prototype.limitUp = function (v) {
//     if (this.x > v) this.x = v;
//     if (this.y > v) this.y = v;
//     if (this.z > v) this.z = v;
//     return this;
// }

// Vector3D.prototype.limitDown = function (v) {
//     if (this.x < v) this.x = v;
//     if (this.y < v) this.y = v;
//     if (this.z < v) this.z = v;
//     return this;
// }

// Vector3D.prototype.limit = function (v) {
//     this.limitUp(v);
//     this.limitDown(-v);
// }

// Vector3D.add = function (v1, v2) {
//     if (typeof v2 === "number")
//         return new Vector3D(v1.x + v2, v1.y + v2, v1.z + v2);
//     return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
// };

// Vector3D.sub = function (v1, v2) {
//     if (typeof v2 === "number")
//         return new Vector3D(v1.x - v2, v1.y - v2, v1.z - v2);
//     return new Vector3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
// };

// Vector3D.mult = function (v1, v2) {
//     if (typeof v2 === "number")
//         return new Vector3D(v1.x * v2, v1.y * v2, v1.z * v2);
//     return new Vector3D(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
// };

// Vector3D.div = function (v1, v2) {
//     if (typeof v2 === "number")
//         return new Vector3D(v1.x / v2, v1.y / v2, v1.z / v2);
//     return new Vector3D(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
// };
