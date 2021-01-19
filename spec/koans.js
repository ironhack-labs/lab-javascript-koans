context = describe;

describe('the JavaScript language', () => {
  describe('has different types and operators', () => {
    it('considers numbers to be equal to their string representation', () => {
      expect(1 == '1').toBeTruthy();
      expect(1 != '1').toBeFalsy();
    });

    it('knows that numbers and strings are not exactly the same', () => {
      expect(1 === '1').toBeFalsy();
      expect(1 !== '1').toBeTruthy();
    });

    it('joins parts as string when using the plus operator', () => {
      expect(1 + 'a').toEqual('1a');
    });

    it('operates integers before joining the string', () => {
      expect(1 + 1 + '2').toEqual('22');
    });

    it('knows the type of the variable', () => {
      const x = 1;

      expect(typeof x).toEqual('number');
    });

    it('surprises me, NaN is not comparable with NaN', () => {
      expect(5 / 'a').toEqual(5 / 'a');
      expect(typeof(NaN)).toEqual('number');
      expect(isNaN(5 / 'a')).toBeTruthy();
    });

    it('considers an empty string to be falsy', () => {
      expect("" == false).toBeTruthy(); // Truthy or Falsy
      expect("" === false).toBeFalsy(); // Truthy or Falsy
    });

    it('considers zero to be falsy', () => {
      expect(0 == false).toBeTruthy();// Truthy or Falsy
      expect(0 === false).toBeFalsy();// Truthy or Falsy
    });

    it('considers nulls to be falsy', () => {
      const x = null;
      let result;

      if (x) {
        result = true;
      } else {
        result = false;
      }

      expect(result == false).toBeTruthy();// Truthy or Falsy
      expect(null === false).toBeFalsy();// Truthy or Falsy
      expect(null == false).toBeFalsy();// Truthy or Falsy
    });

    it('knows the type of a function', () => {
      function x() {
        // ...
      }

      expect(typeof x).toBe('function');
      expect(typeof(xxx)).toBe('undefined');
    });

    it('has arrays and they can contain anything inside', () => {
      const arr = [1, 2, 3, 4];
      arr.push(5);
      arr[9] = 6;

      const matrix = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 7, 8]];

      expect(arr[1]).toEqual(2);
      expect(arr[4]).toEqual(5);
      expect(arr[6]).toEqual();
      expect(arr[9]).toEqual(6);
      expect(matrix[0][2]).toEqual('c');
    });

    it('may contain functions inside arrays', () => {
      const arr = [
        1,
        2,
        function(arg) {
          return 3 + arg;
        }
      ];

      expect(arr[2](1)).toEqual(4);
    });

    it('concatenate arrays - well, kind of', () => {
      const a = [1, 2, 3];
      const b = [4, 5, 6];

      expect(a + b).toEqual('1,2,34,5,6');
    });

    it('joins arrays and strings', () => {
      const a = [1, 2, 3];

      expect ("1" + a).toEqual('11,2,3');
      expect(a + "1").toEqual('1,2,31');
    });

    it('joins arrays and other things', () => {
      const a = [1, 2, 3];
      const b = ['x', 'y', 'z'];

      expect(1 + a).toEqual('11,2,3');
      expect(a + 1).toEqual('1,2,31');
      expect(1 + b).toEqual('1x,y,z');
      expect(true + a).toEqual('true1,2,3');
    });

    it("can't compare arrays", () => {
      const a = [1, 2, 3];
      const b = [1, 2, 3];

      expect(a == b).toBeFalsy();  // Truthy or Falsy
      expect(a === b).toBeFalsy(); // Truthy or Falsy
    });

    it('is not the same to compare by value than by reference ', () => {
      const a = [1, 2, 3];
      const b = [1, 2, 3];

      expect(a).toEqual(b); // Jasmine toEqual compares by value
      expect(a).not.toBe(b); // Jasmine toBe compares by reference
    });
  });

  describe('considers functions as first class citizens', () => {
    it('can declare named functions', () => {
      function example() {
        return 'some example';
      }

      expect(example()).toEqual('some example');
    });

    it('can declare anonymous functions', () => {
      const someVar = function(a, b) {
        return a + b;
      };

      expect(typeof(someVar)).toBe('function');
      expect(someVar(1,1)).toBe(2);
    });

    it('may return anything', () => {
      function example(arg) {
        return [arg, arg * 2, arg * 3];
      }

      const result = example(2);

      expect(result[1]).toEqual(4);
    });

    it('may return arrays that contains functions and so on', () => {
      function example() {
        return [ function(arg) {
          return [0,arg*10];
        }];
      }

      expect(example()[0](1)[1]).toEqual(10);
    });

    it("doesn't care about the declaration order when they are named", () => {
      function exampleA() {
        return exampleB(1);
      }

      expect(exampleA()).toEqual(1);

      function exampleB(arg1) {
        return arg1;
      }
    });

    it('matters, the declaration order when they are anonymous', () => {
      const exampleB = function(arg1) {
        return arg1;
      };
   
      
      const exampleA = function() {
        return exampleB(1);
      };

      expect(exampleA()).toEqual(1);
    });
    

    it('can use optional parameters', () => {
      function example(a, b, c) {
        if (c) {
          return a + b + c;
        }
        return a + b;
      }

      expect(example(1,1,1)).toBe(3);
      expect(example(1,1)).toBe(2);
    });

    it('anonymous functions are anonymous', () => {
      const x = function z() {
        return 1;
      };
      expect(typeof(z)).toEqual('undefined');
      expect(x()).toEqual(1);
    });

    it('can create closures with free variables', () => {
      function external() {
        const a = 1;

        function internal() {
          return a + 1;
        }

        return internal();
      }

      expect(external()).toBe(2);
    });

    it('can create closures with several free variables', () => {
      function external() {
        const a = 1,
          b = 2;

        function internal() {
          const c = 3;
          return a + b + c;
        }
      }

      expect(external()).toBe();
    });

    it('defines a pure function when there are no free variables', () => {
      function external() {
        const a = 1,
          b = 2;

        function internal(a, b) {
          const c = 1;
          return a + b + c;
        }

        return internal(4, 4);
      }

      expect(external()).toBe(9);
    });

    it('may return arrays that contains closures and so on', () => {
      function example() {
        return [ function(arg) {
          return [0,arg+9];
        }];
      }

      expect(example()[0](1)[1]).toEqual(10);
      expect(example()[0](2)[1]).toEqual(11);
      expect(example()[0](3)[1]).toEqual(12);
    });

    it('passes primitive types as values (a copy) to functions', () => {
      function example(arg) {
        arg = 'test!';
      }

      const x = 1;
      const y = 'example';
      const z = true;

      example(x);
      expect(x).toEqual(1);

      example(y);
      expect(y).toEqual('example');

      example(z);
      expect(z).toEqual(true);
    });

    it('passes arrays by reference', () => {
      function example(arg) {
        arg[0] = 100;
      }

      const x = [1, 2, 3];

      example(x);
      expect(x).toEqual([100, 2, 3]);
    });

    it('passes objects by reference', () => {
      function example(arg) {
        arg.property = 'test';
      }

      const x = { property: 'cool!' };

      example(x);
      expect(x).toEqual({ property: 'test' });
    });

    it('may return a function as the result of invoking a function', () => {
      function add(a, b) {
        return a + b;
      }

      function example() {
        return add;
      }

      expect(example()(1,2)).toEqual(3);
      const f = example();
      expect(f(2,2)).toEqual(4);
    });

    it('can return closures as a function result', () => {
      function plus(amount) {
        return function(number) {
          return number + amount;
        };
      }

      const f = plus(5);

      expect(f(3)).toBe(8);
    });

    it('can have functions that receive other functions as arguments', () => {
      function add(a, b) {
        return a + b;
      }

      function example(arg) {
        return arg(2, 2) + 1;
      }

      expect(example(add)).toEqual(5);
    });

    it('may have functions as the input and the output', () => {
      function plus(originalFunction) {
        return function(arg1) {
          return originalFunction() + arg1;
        };
      }

      const f = plus(function() {
        return 1;
      });

      expect(f(2)).toBe(3);
    });

    it("can invoke functions indirectly using the special 'call'", () => {
      function f(a, b) {
        return a + b;
      }

      expect(f.call(f,1,1)).toEqual(2);
    });

    it("can invoke functions indirectly using the special 'apply'", () => {
      function f(a, b) {
        return a + b;
      }

      expect(f.apply(f, [1,1])).toEqual(2);
    });

    it("doesn't have a private scope inside blocks", () => {
      let j = 0;
      for (let i = 0; i < 5; i++) {
        j += i;
      }

      expect(i).toEqual();
      expect(j).toEqual(10);
    });
  });

  describe('has multiple ways to define and create objects', () => {
    it('can define object literals', () => {
      const obj = {
        name: 'bob',
        theName: function() {
          return this.name;
        }
      };

      expect(obj.theName()).toBe('bob');
    });

    it('can create properties dynamically', () => {
      const obj = {
        name: 'bob',
        surname: 'sponge'
      };
      obj.address = 'palm tree';

      expect(obj.address).toEqual('palm tree');
      expect(obj['address']).toEqual('palm tree');
      expect(obj['name']).toEqual('bob');
    });

    it('may define complex objects', () => {
      let user={
        address:{
          street:"sesame"
        },
        friends:[{name:"triki"}]
      };
      // write the contents of the obj to make the satisfy the expectations:

      expect(user.address.street).toEqual('sesame');
      expect(user.friends[0].name).toEqual('triki');
    });

    it('has a pattern called, the Module Pattern', () => {
      function createObject() {
        let points = 0;

        return {
          addPoint: function() {
            ++points;
          },
          score: function() {
            return points;
          }
        };
      }

      const obj = createObject();
      obj.addPoint();

      expect(obj.score()).toEqual(1);
      expect(typeof(obj.points)).toEqual('undefined');
    });

    it('may create objects also with the module pattern', () => {
      function createObject(num,color) {
        let point = num;

        return {
          color:color,
          incrementScoreIn: function(arg) {
            point += arg;
          },
          points: function() {
            return point;
          }, 
        };
      }

    
      const obj = createObject(5, 'red');
      obj.incrementScoreIn(5);
      expect(obj.color).toEqual('red');
      expect(obj.points()).toEqual(10);
      
    });

    it('can define constructors', () => {
      function Obj() {
        const name = 'bob';

        this.theName = function() {
          return name;
        };
      }

      const obj = new Obj();
      expect(obj.theName()).toBe('bob');
    });

    it("may contain 'static' methods", () => {
      function Obj() {
        const name = 'bob';

        this.theName = function() {
          return name;
        };
      }

      Obj.someStaticMethod = function() {
        return 22;
      };

      expect(Obj.someStaticMethod()).toBe(22);
    });

    it('can have have methods in the prototype', () => {
      function Obj() {
        const name = 'bob';
      }

      Obj.prototype.theName = function() {
        return this.name;
      };

      const obj = new Obj();
      expect(obj.theName()).toEqual();
      expect(obj.theName).toBe(new Obj().theName);
    });

    it('can define a factory', () => {
      function obj() {
        const self = {};
        const name = 'bob';

        self.theName = function() {
          return name;
        };

        return self;
      }

      const instance = obj();
      expect(instance.theName()).toBe('bob');
      expect(instance.theName).not.toBe(obj().theName);
    });

    it('can create methods dynamically on an object instance', () => {
      const obj = {};
      const methodNames = ['meow', 'jump'];

      for (let i = 0; i < methodNames.length; i++) {
        obj[[methodNames[i]]] = function() {
          return 'it works';
        };
      }

      expect(obj.meow()).toEqual('it works');
    });

    describe('the polymorphism', () => {
      it('may use constructor plus prototype', () => {
        function Parent() {
          this.name = 'parent';
        }
        Parent.prototype.someMethod = function() {
          return 10;
        };

        function Child() {
          Parent.call(this); // constructor stealing
          this.name = 'child';
        }
        Child.prototype = Object.create(Parent.prototype); // prototype chaining

        const child = new Child();
        expect(child.someMethod()).toEqual(10);
        expect(child.name).toEqual('child');
      });

      it('may use the functional inheritance', () => {
        function parent() {
          const name = 'parent';
          const self = {};
          self.someMethod = function() {
            return 10;
          };
          return self;
        }

        function child() {
          const name = 'child';
          const self = parent();
          return self;
        }

        const instance = child();
        expect(instance.someMethod()).toBe(10);
      });
    });
  });

  describe('commons patterns with functions and behaviors', () => {
    it('can invoke functions immediately to take advantage of scopes', () => {
      const myNamespace = {};

      (function(theNamespace) {
        let counter = 0;

        theNamespace.addOne = function() {
          counter++;
        };

        theNamespace.giveMeTheCount = function() {
          return counter;
        };
      })(myNamespace);

      myNamespace.addOne();
      myNamespace.addOne();

      expect(myNamespace.giveMeTheCount()).toBe(2);
    });

    it("hoists variables the way you probably don't expect", () => {
      function generate() {
        const functions = [];
        for (let i = 0; i < 5; i++) {
          functions.push(function() {
            return i;
          });
        }
        return functions;
      }

      expect(generate()[0]()).toEqual(0);
      expect(generate()[1]()).toEqual(1);
    });
  });

  context('has ways to simulate classes', () => {
    // "Class"
    function Cat() {
      this.kilos = 1;
      this.feed = function() {
        this.kilos++;
      };
      this.isPurring = function() {
        return true;
      };
    }

    //////////////////////////////////////
    // "Class"
    //////////////////////////////////////
    function Lion(energy) {
      Cat.call(this);
      this.energy = energy || 100;
      const self = this;

      const run = function() {
        // private method
        self.energy -= 10;
      };
      const attack = function() {
        // private method
        self.energy -= 5;
      };
      this.playWithFriend = function(friend) {
        if (friend.isPurring()) self.energy += 10;
      };
      this.hunt = function() {
        // public method
        run();
        attack();
        this.onHunting(); // fire event
      };
      this.onHunting = function() {
        /* event */
      };
    }

    context('and the THIS keyword', () => {
      let cat;

      beforeEach(function() {
        cat = new Cat();
        window.kilos = 0;
      });

      it('sometimes works as expected in other languages', () => {
        cat.feed();
        cat.feed();

        expect(cat.kilos).toEqual(3);
      });

      it('works different on detached functions', () => {
        window.kilos = 10;
        let feed = cat.feed;

        feed();

        expect(window.kilos).toEqual(11);
        expect(cat.kilos).toEqual(1);
      });

      it('can be bound explicitly with CALL and APPLY', () => {
        const feed = cat.feed;
        feed.apply(cat);

        expect(cat.kilos).toEqual(2);
      });

      it('can be bound in modern browsers with BIND', () => {
        const feed = cat.feed;
        const bound = feed.bind(cat);

        bound();

        expect(cat.kilos).toEqual(2);
      });

      it('works different when function is attached to other object', () => {
        const otherCat = new Cat();
        otherCat.kilos = 10;
        otherCat.feed = cat.feed;

        otherCat.feed();
        expect(otherCat.kilos).toEqual(11);
        expect(cat.kilos).toEqual(1);
      });

      it('can be handled using the SELF trick', () => {
        const energy = 200;
        const lion = new Lion(energy);

        lion.hunt();

        expect(lion.energy).toEqual(185);
      });

      it('interprets the THIS when the function is executed', () => {
        const energy = 200;
        const lion = new Lion();

        lion.hunt = function() {
          this.energy = 4000;
        };
        lion.hunt();

        expect(lion.energy).toEqual( 4000);
      });
    });
  });
});
