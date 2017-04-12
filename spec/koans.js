const chai = require('chai');
const $ = require('jquery');

const assert = chai.assert;
const expect = chai.expect;

// describe - It's used to group different tests on our code.
// it - It receives a string that indicates what we are testing
// expect - What we are expecting in the test.


describe('the JavaScript language', () => {
  describe('has different types and operators', () => {
    it('considers numbers to be equal to their string representation', () => {
      expect(1 == '1').to.be.true;
      expect(1 != '1').to.be.false;
    });

    it('knows that numbers and strings are not exactly the same', () => {
      expect(1 === '1').to.be.false;
      expect(1 !== '1').to.be.true;
    });

    it('joins parts as string when using the plus operator', () => {
      expect(`${1}a`).to.equal('1a');
    });

    it('operates integers before joining the string', () => {
      expect(`${1 + 1}2`).to.equal('22');
    });

    it('knows the type of the variable', function () {
      const x = 1;
      assert.typeOf(x, 'number');
    });

    it('surprises me, NaN is not comparable with NaN', () => {
      expect(5 / 'a').toEqual(5 / 'a');
      // expect(typeof(NaN)).toEqual();
      expect(isNaN(5 / 'a')).toBeTruthy();
    });

    it('considers an empty string to be falsy', () => {
      // expect("" == false).toBe......();// Truthy or Falsy
      // expect("" === false).toBe.....();// Truthy or Falsy
    });

    it('considers zero to be falsy', () => {
      // expect(0 == false).toBe......();// Truthy or Falsy
      // expect(0 === false).toBe.....();// Truthy or Falsy
    });

    it('considers nulls to be falsy', () => {
      let x = null;
      let result;

      if (x) {
        result = true;
      } else {
        result = false;
      }

      // expect(result == false).toBe......();// Truthy or Falsy
      // expect(null === false).toBe.....();// Truthy or Falsy
      // expect(null == false).toBe....();// Truthy or Falsy
    });

    it('knows the type of a function', () => {
      function x() {}

      expect(typeof (x)).toBe('function');
      // expect(typeof(xxx)).toBe('...');
    });

    it('has arrays and they can contain anything inside', () => {
      let arr = [1, 2, 3, 4];
      arr.push(5);
      arr[9] = 6;
      let matrix = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 7, 8]];

      /*
      expect(arr[1]).toEqual();
      expect(arr[4]).toEqual();
      expect(arr[6]).toEqual();
      expect(arr[9]).toEqual();
      expect(matrix[0][2]).toEqual();
      */
    });

    it('may contain functions inside arrays', () => {
      let arr = [1, 2, function (arg) { return 3 + arg; }];

      // expect(arr[2](1)).toEqual();
    });

    it('concatenate arrays - well, kind of', () => {
      let a = [1, 2, 3];
      let b = [4, 5, 6];

      // expect(a + b).toEqual();
    });

    it('joins arrays and strings', () => {
      let a = [1, 2, 3];

      // expect ("1" + a).toEqual();
      // expect(a + "1").toEqual();
    });

    it('joins arrays and other things', () => {
      let a = [1, 2, 3];
      let b = ['x', 'y', 'z'];

      // expect(1 + a).toEqual();
      // expect(a + 1).toEqual();
      // expect(1 + b).toEqual();
      // expect(true + a).toEqual();
    });

    it("can't compare arrays", () => {
      let a = [1, 2, 3];
      let b = [1, 2, 3];

      // expect(a == b).toBe.....();  // Truthy or Falsy
      // expect(a === b).toBe.....(); // Truthy or Falsy
    });

    it('is not the same to compare by value than by reference ', () => {
      let a = [1, 2, 3];
      let b = [1, 2, 3];

      expect(a).toEqual(b);        // Jasmine toEqual compares by value
      expect(a).not.toBe(b);       // Jasmine toBe compares by reference
    });
  });


  describe('considers functions as first class citizens', () => {
    it('can declare named functions', () => {
      function example() {
        return 'some example';
      }

      // expect(example()).toEqual();
    });

    it('can declare anonymous functions', () => {
      let someVar = function (a, b) {
        return a + b;
      };

      // expect(typeof(someVar)).toBe();
      // expect(someVar(1,1)).toBe();
    });

    it('may return anything', () => {
      function example(arg) {
        return [arg, arg * 2, arg * 3];
      }

      let result = example(2);

      // expect(result[1]).toEqual();
    });

    it('may return arrays that contains functions and so on', () => {
      function example() {
         // write the missing code here
      }

      // expect(example()[0](1)[1]).toEqual(10);
    });

    it("doesn't care about the declaration order when they are named", () => {
      function exampleA() {
        return exampleB(1);
      }

      // expect(exampleA()).toEqual();

      function exampleB(arg1) {
        return arg1;
      }
    });

    it('matters, the declaration order when they are anonymous', () => {
      let exampleA = function () {
        return exampleB(1);
      };

      // expect(exampleA()).toEqual(1);

      var exampleB = function (arg1) {
        return arg1;
      };
    });

    it('can use optional parameters', () => {
      function example(a, b, c) {
        if (c) {
          return a + b + c;
        }
        return a + b;
      }

      // expect(example(1,1,1)).toBe();
      // expect(example(1,1)).toBe();
    });

    it('anonymous functions are anonymous', () => {
      let x = function z() {
        return 1;
      };
      // expect(typeof(z)).toEqual();
      // expect(x()).toEqual();
    });

    it('can create closures with free variables', () => {
      function external() {
        let a = 1;

        function internal() {
          return a + 1;
        }

        return internal();
      }

      // expect(external()).toBe();
    });

    it('can create closures with several free variables', () => {
      function external() {
        let a = 1, 
b = 2;

        function internal() {
          let c = 3;
          return a + b + c;
        }
      }

      // expect(external()).toBe(6);
    });

    it('defines a pure function when there are no free variables', () => {
      function external() {
        let a = 1, 
b = 2;

        function internal(a, b) {
          let c = 1;
          return a + b + c;
        }

        return internal(4, 4);
      }

      // expect(external()).toBe();
    });

    it('may return arrays that contains closures and so on', () => {
      function example() {
        // write the missing code here
      }

      // expect(example()[0](1)[1]).toEqual(10);
      // expect(example()[0](2)[1]).toEqual(11);
      // expect(example()[0](3)[1]).toEqual(12);
    });

    it('passes primitive types as values (a copy) to functions', () => {
      function example(arg) {
        arg = 'test!';
      }

      let x = 1;
      let y = 'example';
      let z = true;

      example(x);
      // expect(x).toEqual();

      example(y);
      // expect(y).toEqual();

      example(z);
      // expect(z).toEqual();
    });

    it('passes arrays by reference', () => {
      function example(arg) {
        arg[0] = 100;
      }

      let x = [1, 2, 3];

      example(x);
      // expect(x).toEqual();
    });

    it('passes objects by reference', () => {
      function example(arg) {
        arg.property = 'test';
      }

      let x = { property: 'cool!' };

      example(x);
      // expect(x).toEqual();
    });

    it('may return a function as the result of invoking a function', () => {
      function add(a, b) {
        return a + b;
      }

      function example() {
        return add;
      }

      // expect(example()(1,2)).toEqual();
      let f = example();
      // expect(f(2,2)).toEqual();
    });

    it('can return closures as a function result', () => {
      function plus(amount) {
        return function (number) {
          return number + amount;
        };
      }

      let f = plus(5);

      // expect(f(3)).toBe();
    });

    it('can have functions that receive other functions as arguments', () => {
      function add(a, b) {
        return a + b;
      }

      function example(arg) {
        return arg(2, 2) + 1;
      }

      // expect(example(add)).toEqual();
    });

    it('may have functions as the input and the output', () => {
      function plus(originalFunction) {
        return function (arg1) {
          return originalFunction() + arg1;
        };
      }

      let f = plus(() => { return 1; });

      // expect(f(2)).toBe();
    });

    it("can invoke functions indirectly using the special 'call'", () => {
      function f(a, b) {
        return a + b;
      }

      // expect(f.call(f,1,1)).toEqual();
    });

    it("can invoke functions indirectly using the special 'apply'", () => {
      function f(a, b) {
        return a + b;
      }

      // expect(f.apply(f, [1,1])).toEqual();
    });

    it('doesnt have a private scope inside blocks', () => {
      let j = 0;
      for (let i = 0; i < 5; i++) {
        j += i;
      }

      // expect(i).toEqual();
      // expect(j).toEqual();
    });
  });

  describe('has multiple ways to define and create objects', () => {
    it('can define object literals', () => {
      let obj = {
          name: 'bob',
          theName() {
            return this.name;
          },
        };

        // expect(obj.theName()).toBe();
    });

    it('can create properties dynamically', () => {
      let obj = {
        name: 'bob',
        surname: 'sponge',
      };
      obj.address = 'palm tree';

      // expect(obj.address).toEqual();
      // expect(obj['address']).toEqual();
      // expect(obj['name']).toEqual();
    });

    it('may define complex objects', () => {
      let user;
      // write the contents of the obj to make the satisfy the expectations:

      // expect(user.address.street).toEqual('sesame');
      // expect(user.friends[0].name).toEqual('triki');
    });

    it('has a pattern called, the Module Pattern', () => {
      function createObject() {
        let points = 0;

        return {
          addPoint(){ ++points; },
          score(){ return points; },
        };
      }

      let obj = createObject();
      obj.addPoint();

      // expect(obj.score()).toEqual();
      // expect(typeof(obj.points)).toEqual();
    });

    it('may create objects also with the module pattern', () => {
      function createObject(initialScore) {
        // write the code here
      }

      /*
      var obj = createObject(5, 'red');
      obj.incrementScoreIn(5);
      expect(obj.color).toEqual('red');
      expect(obj.points()).toEqual(10);
      */
    });

    it('can define constructors', () => {
      function Obj() {
        let name = 'bob';

        this.theName = function () {
          return name;
        };
      }

      let obj = new Obj();
      // expect(obj.theName()).toBe();
    });

    it("may contain 'static' methods", () => {
      function Obj() {
        let name = 'bob';

        this.theName = function () {
          return name;
        };
      }

      Obj.someStaticMethod = function () {
        return 22;
      };

      // expect(Obj.someStaticMethod()).toBe();
    });

    it('can have have methods in the prototype', () => {
      function Obj() {
        let name = 'bob';
      }

      Obj.prototype.theName = function () {
        return this.name;
      };

      let obj = new Obj();
      // expect(obj.theName()).toEqual();
      // expect(obj.theName).toBe(new Obj().theName);
    });

    it('can define a factory', () => {
      function obj() {
        let self = {};
        let name = 'bob';

        self.theName = function () {
          return name;
        };

        return self;
      }

      let instance = obj();
      // expect(instance.theName()).toBe();
      // expect(instance.theName).not.toBe(obj().theName);
    });

    it('can create methods dynamically on an object instance', () => {
      let obj = {};
      let methodNames = ['meow', 'jump'];

      for (let i = 0; i < methodNames.length; i++) {
          obj[[methodNames[i]]] = function () { return 'it works'; };
        }

        // expect(obj.meow()).toEqual();
    });

    describe('the polymorphism', () => {
      it('may use constructor plus prototype', () => {
        function Parent() {
          this.name = 'parent';
        }
        Parent.prototype.someMethod = function () {
          return 10;
        };

        function Child() {
          Parent.call(this); // constructor stealing
          this.name = 'child';
        }
        Child.prototype = Object.create(Parent.prototype); // prototype chaining

        let child = new Child();
        // expect(child.someMethod()).toEqual();
        // expect(child.name).toEqual();
      });

      it('may use the functional inheritance', () =>  {
        function parent() {
          let name = 'parent';
          let self = {};
          self.someMethod = function () {
            return 10;
          };
          return self;
        }

        function child() {
          let name = 'child';
          let self = parent();
          return self;
        }

        let instance = child();
        // expect(instance.someMethod()).toBe();
      });
    });
  });

  describe('commons patterns with functions and behaviors', () => {
    it('can invoke functions immediately to take advantage of scopes', () => {
      let myNamespace = {};

      (function (theNamespace) {
        let counter = 0;

        theNamespace.addOne = function () {
            counter++;
          };

        theNamespace.giveMeTheCount = function () {
            return counter;
          };
      }(myNamespace));

      myNamespace.addOne();
      myNamespace.addOne();

      // expect(myNamespace.giveMeTheCount()).toBe();
    });

    it('hoists variables the way you probably dont expect', () => {
      function generate() {
        let functions = [];
        for (var i = 0; i < 5; i++) {
          functions.push(() => {
            return i;
          });
        }
        return functions;
      }

      // expect(generate()[0]()).toEqual();
      // expect(generate()[1]()).toEqual();
    });
  });

  context('has ways to simulate classes', () => {
    // "Class"
    function Cat() {
      this.kilos = 1;
      this.feed = function () {
        this.kilos++;
      };
      this.isPurring = function () {
        return true;
      };
    }

    // ////////////////////////////////////
    // "Class"
    // ////////////////////////////////////
    function Lion(energy) {
      Cat.call(this);
      this.energy = energy || 100;
      let self = this;

      let run = function () { // private method
        self.energy -= 10;
      };
      let attack = function () { // private method
        self.energy -= 5;
      };
      this.playWithFriend = function (friend) {
        if (friend.isPurring())
          {self.energy += 10;}
      };
      this.hunt = function () { // public method
        run();
        attack();
        this.onHunting(); // fire event
      };
      this.onHunting = function () { /* event */ };
    }

    context('and the THIS keyword', () => {
      let cat;

      beforeEach(() => {
        cat = new Cat();
        window.kilos = 0;
      });

      it('sometimes works as expected in other languages', () => {
        cat.feed();
        cat.feed();

        // expect(cat.kilos).toEqual();
      });

      it('works different on dettached functions', () => {
        window.kilos = 10;
        let feed = cat.feed;

        feed();

        // expect(window.kilos).toEqual();
        // expect(cat.kilos).toEqual();
      });

      it('can be bound explicitly with CALL and APPLY', () => {
        let feed = cat.feed;
        feed.apply(cat);

        // expect(cat.kilos).toEqual();
      });

      it('can be bound in modern browsers with BIND', () => {
        let feed = cat.feed;
        let bound = feed.bind(cat);

        bound();

        // expect(cat.kilos).toEqual();
      });

      it('works different when function is attached to other object', () => {
        let otherCat = new Cat();
        otherCat.kilos = 10;
        otherCat.feed = cat.feed;

        otherCat.feed();
        // expect(otherCat.kilos).toEqual();
        // expect(cat.kilos).toEqual();
      });

      it('can be handled using the SELF trick', () => {
        let energy = 200;
        let lion = new Lion(energy);

        lion.hunt();

        // expect(lion.energy).toEqual();
      });

      it('interprest the THIS when the function is executed', () => {
        let energy = 200;
        let lion = new Lion();

        lion.hunt = function () {
          this.energy = 4000;
        };
        lion.hunt();

        // expect(lion.energy).toEqual();
      });
    });
  });
});
