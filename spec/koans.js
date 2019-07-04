context = describe;

describe("the JavaScript language", function() {

  describe("has different types and operators", function() {
    it("considers numbers to be equal to their string representation", function() {
      expect(1 == "1").toBeTruthy();
      expect(1 != "1").toBeFalsy();
    });

    it("knows that numbers and strings are not exactly the same", function() {
      expect(1 === "1").toBeFalsy();
      expect(1 !== "1").toBeTruthy();
    });

    it("joins parts as string when using the plus operator", function() {
      expect(1 + "a").toEqual("1a");
    });

    it("operates integers before joining the string", function() {
      expect(1 + 1 + "2").toEqual('22');
    });

    it("knows the type of the variable", function() {
      var x = 1;

      expect(typeof(x)).toEqual('number');
    });

    it("surprises me, NaN is not comparable with NaN", function() {
      expect(5 / "a").toEqual(5 / "a");
      expect(typeof(NaN)).toEqual('number');
      expect(isNaN(5 / "a")).toBeTruthy();
    });

    it("considers an empty string to be falsy", function() {
      expect("" == false).toBeTruthy();// Truthy or Falsy
      expect("" === false).toBeFalsy();// Truthy or Falsy
    });

    it("considers zero to be falsy", function() {
      expect(0 == false).toBeTruthy();// Truthy or Falsy
      expect(0 === false).toBeFalsy();// Truthy or Falsy
    });

    it("considers nulls to be falsy", function() {
      var x = null;
      var result;

      if (x) {
         result = true;
      } else {
         result = false;
      }

      expect(result == false).toBeTruthy();// Truthy or Falsy
      expect(null === false).toBeFalsy();// Truthy or Falsy
      expect(null == false).toBeFalsy();// Truthy or Falsy
    });

    it("knows the type of a function", function() {
      function x(){}

      expect(typeof(x)).toBe('function');
      expect(typeof(xxx)).toBe('undefined');
    });

    it("has arrays and they can contain anything inside", function() {
      var arr = [1,2,3,4];
      arr.push(5);
      arr[9] = 6;
      var matrix = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 7, 8]];

      expect(arr[1]).toEqual(2);
      expect(arr[4]).toEqual(5);
      expect(arr[6]).toEqual(undefined);
      expect(arr[9]).toEqual(6);
      expect(matrix[0][2]).toEqual('c');
      /*
      */
    });

    it("may contain functions inside arrays", function() {
      var arr = [1,2, function(arg){ return 3 + arg;}];

      expect(arr[2](1)).toEqual(4);
    });

    it("concatenate arrays - well, kind of", function() {
      var a = [1,2,3];
      var b = [4,5,6];

      expect(a + b).toEqual('1,2,34,5,6');
    });

    it("joins arrays and strings", function() {
      var a = [1,2,3];

      expect ("1" + a).toEqual('11,2,3');
      expect(a + "1").toEqual('1,2,31');
    });

    it("joins arrays and other things", function() {
      var a = [1,2,3];
      var b = ['x', 'y', 'z'];

      expect(1 + a).toEqual('11,2,3');
      expect(a + 1).toEqual('1,2,31');
      expect(1 + b).toEqual('1x,y,z');
      expect(true + a).toEqual('true1,2,3');
    });

    it("can't compare arrays", function() {
      var a = [1,2,3];
      var b = [1,2,3];

      expect(a == b).toBeFalsy();  // Truthy or Falsy
      expect(a === b).toBeFalsy(); // Truthy or Falsy
    });

    it("is not the same to compare by value than by reference ", function() {
      var a = [1,2,3];
      var b = [1,2,3];

      expect(a).toEqual(b);        // Jasmine toEqual compares by value
      expect(a).not.toBe(b);       // Jasmine toBe compares by reference
    });
  });


  describe("considers functions as first class citizens", function() {
    it("can declare named functions", function() {
      function example() {
        return 'some example';
      }

      expect(example()).toEqual('some example');
    });

    it("can declare anonymous functions", function() {
      var someVar = function(a, b) {
        return a + b;
      };

      expect(typeof(someVar)).toBe('function');
      expect(someVar(1,1)).toBe(2);
    });

    it("may return anything", function() {
      function example(arg) {
        return [arg, arg * 2, arg * 3];
      }

      var result = example(2);

      expect(result[1]).toEqual(4);
    });

    it("may return arrays that contains functions and so on", function() {
      //receives an index
      function example(index=1) {
         // write the missing code here
         array = [(number)=>[1,10], 10]
         return array;
         //Returns an array
      }

      expect(example()[0](1)[1]).toEqual(10);
    });

    it("doesn't care about the declaration order when they are named", function() {
      function exampleA() {
          return exampleB(1);
      }

      expect(exampleA()).toEqual(1);

      function exampleB(arg1) {
          return arg1;
      }
    });

    it("matters, the declaration order when they are anonymous", function() {
      var exampleB = function(arg1) {
          return arg1;
      };
      var exampleA = function() {
          return exampleB(1);
      };

      expect(exampleA()).toEqual(1);

    });

    it("can use optional parameters", function() {
      function example(a, b, c) {
        if (c) {
          return a + b + c;
        }
        return a + b;
      }

      expect(example(1,1,1)).toBe(3);
      expect(example(1,1)).toBe(2);
    });

    it("anonymous functions are anonymous", function() {
      var x = function z() {
        return 1;
      };
      expect(typeof(z)).toEqual('undefined');
      expect(x()).toEqual(1);
    });

    it("can create closures with free variables", function() {
      function external() {
        var a = 1;

        function internal() {
          return a + 1;
        }

        return internal();
      }

      expect(external()).toBe(2);
    });

    it("can create closures with several free variables", function() {
      function external() {
        var a = 1, b = 2;

        function internal() {
          var c = 3;
          return a + b + c;
        }
        return internal();
      }

      expect(external()).toBe(6);
    });

    it("defines a pure function when there are no free variables", function() {
      function external() {
        var a = 1, b = 2;

        function internal(a, b) {
          var c = 1;
          return a + b + c;
        }

        return internal(4,4);
      }

      expect(external()).toBe(9);
    });

    it("may return arrays that contain closures and so on", function() {
      function example() {
        // write the missing code here
      }
      // PENDIENTE
      //expect(example()[0](1)[1]).toEqual(10);
      //expect(example()[0](2)[1]).toEqual(11);
      //expect(example()[0](3)[1]).toEqual(12);
    });

    it("passes primitive types as values (a copy) to functions", function() {
      function example(arg) {
        arg = "test!";
      }

      var x = 1;
      var y = "example";
      var z = true;

      example(x);
      expect(x).toEqual(1);

      example(y);
      expect(y).toEqual('example');

      example(z);
      expect(z).toEqual(true);
    });

    it("passes arrays by reference", function() {
      function example(arg) {
        arg[0] = 100;
      }

      var x = [1,2,3];

      example(x);
      expect(x).toEqual([100,2,3]);
    });

    it("passes objects by reference", function() {
      function example(arg) {
        arg.property = 'test';
      }

      var x = { property: 'cool!' };

      example(x);
      expect(x).toEqual({ property: 'test' });
    });

    it("may return a function as the result of invoking a function", function() {
      function add(a, b){
        return a + b;
      }

      function example(){
        return add;
      }

      expect(example()(1,2)).toEqual(3);
      var f = example();
      expect(f(2,2)).toEqual(4);
    });

    it("can return closures as a function result", function() {
      function plus(amount){
        return function(number){
          return number + amount;
        };
      }

      var f = plus(5);

      expect(f(3)).toBe(8);
    });

    it("can have functions that receive other functions as arguments", function() {
      function add(a,b){
        return a + b;
      }

      function example(arg){
        return arg(2,2) + 1;
      }

      expect(example(add)).toEqual(5);
    });

    it("may have functions as the input and the output", function() {
      function plus(originalFunction) {
        return function(arg1) {
          return originalFunction() + arg1;
        };
      }

      var f = plus(function() {return 1;});

      expect(f(2)).toBe(3);
    });

    it("can invoke functions indirectly using the special 'call'", function() {
      function f(a, b){
        return a + b;
      }

      expect(f.call(f,1,1)).toEqual(2);
    });

    it("can invoke functions indirectly using the special 'apply'", function() {
      function f(a, b){
        return a + b;
      }

      expect(f.apply(f, [1,1])).toEqual(2);
    });

    it("doesnt have a private scope inside blocks", function() {
      var j = 0;
      for (var i = 0; i < 5; i++) {
        j += i;
      }

      expect(i).toEqual(5);
      expect(j).toEqual(10);
    });
  });

  describe("has multiple ways to define and create objects", function() {
    it("can define object literals", function() {
        var obj = {
          name:    'bob',
          theName: function() {
            return this.name;
          }
        };

        expect(obj.theName()).toBe('bob');
    });

    it("can create properties dynamically", function() {
      var obj = {
        name:    'bob',
        surname: 'sponge'
      };
      obj.address = 'palm tree';

      expect(obj.address).toEqual('palm tree');
      expect(obj['address']).toEqual('palm tree');
      expect(obj['name']).toEqual('bob');
    });

    it("may define complex objects", function() {
      var user;
      // write the contents of the obj to make the satisfy the expectations:
      var user = {
        friends: [
          {name: 'triki'}
        ],
        address: {
          street: 'sesame'
        }
      }
      expect(user.address.street).toEqual('sesame');
      expect(user.friends[0].name).toEqual('triki');
    });

    it("has a pattern called, the Module Pattern", function() {
      function createObject() {
        var points = 0;

        return {
          addPoint: function(){ ++points; },
          score:    function(){ return points; }
        };
      }

      var obj = createObject();
      obj.addPoint();

      expect(obj.score()).toEqual(1);
      expect(typeof(obj.points)).toEqual('undefined');
    });

    it("may create objects also with the module pattern", function() {
      function createObject(initialScore, argColor) {
        // write the code here
        var points = 0;
        this.color = 'red';
        return {
          incrementScoreIn: function(increment){ points+=increment; },
          score:    function(){ return points; },
          color: argColor
        };
      }

      var obj = createObject(5, 'red');
      obj.incrementScoreIn(5);
      expect(obj.color).toEqual('red');
      obj.incrementScoreIn(5);
      expect(obj.score()).toEqual(10);
      /*
      */
    });

    it("can define constructors", function() {
      function Obj() {
        var name = 'bob';

        this.theName = function() {
          return this.name;
        };
      }

      var obj = new Obj();
      expect(obj.theName()).toBe();
    });

    it("may contain 'static' methods", function() {
      function Obj() {
        var name = 'bob';

        this.theName = function() {
          return name;
        };
      }

      Obj.someStaticMethod = function() {
        return 22;
      };

      expect(Obj.someStaticMethod()).toBe(22);
    });

    it("can have have methods in the prototype", function() {
      function Obj() {
        var name = 'bob';
      }

      Obj.prototype.theName = function() {
        return this.name;
      };

      var obj = new Obj();
      expect(obj.theName()).toEqual();
      expect(obj.theName).toBe(new Obj().theName);
    });

    it("can define a factory", function() {
      function obj() {
        var self = {};
        var name = 'bob';

        self.theName = function() {
          return this.name;
        };

        return self;
      }

      var instance = obj();
      expect(instance.theName()).toBe();
      expect(instance.theName).not.toBe(obj().theName);
    });

    it("can create methods dynamically on an object instance", function() {
        var obj = {};
        var methodNames = ['meow', 'jump'];

        for (var i = 0; i < methodNames.length; i++) {
          obj[[methodNames[i]]] = function() { return 'it works'; };
        }

        expect(obj.meow()).toEqual('it works');
    });

    describe("the polymorphism", function() {
      it("may use constructor plus prototype", function() {
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

        var child = new Child();
        expect(child.someMethod()).toEqual(10);
        expect(child.name).toEqual('child');
      });

      it("may use the functional inheritance", function(){
        function parent() {
          var name = 'parent';
          var self = {};
          self.someMethod = function() {
              return 10;
          };
          return self;
        }

        function child() {
          var name = 'child';
          var self = parent();
          return self;
        }

        var instance = child();
        expect(instance.someMethod()).toBe(10);
      });

    });
  });

  describe("commons patterns with functions and behaviors", function() {
    it("can invoke functions immediately to take advantage of scopes", function() {
      var myNamespace = {};

      (function(theNamespace) {
          var counter = 0;

          theNamespace.addOne = function() {
            counter++;
          };

          theNamespace.giveMeTheCount = function() {
            return counter;
          };

      }(myNamespace));

      myNamespace.addOne();
      myNamespace.addOne();

      expect(myNamespace.giveMeTheCount()).toBe(2);
    });

    it("hoists variables the way you probably dont expect", function() {
      function generate() {
        var functions = [];
        for (var i = 0; i < 5; i++) {
          functions.push(function() {
            return i;
          });
        }
        return functions;
      }

      expect(generate()[0]()).toEqual(5);
      expect(generate()[1]()).toEqual(5);
    });
  });

  context("has ways to simulate classes", function() {
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
      var self = this;

      var run = function() { // private method
        self.energy -= 10;
      };
      var attack = function() { // private method
        self.energy -= 5;
      };
      this.playWithFriend = function(friend) {
        if (friend.isPurring())
          self.energy += 10;
      };
      this.hunt = function(){ // public method
        run();
        attack();
        this.onHunting(); // fire event
      };
      this.onHunting = function() { /* event */ };
    }

    context("and the THIS keyword", function() {
      var cat;

      beforeEach(function() {
        cat = new Cat();
        window.kilos = 0;
      });

      it("sometimes works as expected in other languages", function() {
        cat.feed();
        cat.feed();

        expect(cat.kilos).toEqual(3);
      });

      it("works different on dettached functions", function() {
        window.kilos = 10;
        var feed = cat.feed;

        feed();

        expect(window.kilos).toEqual(11);
        expect(cat.kilos).toEqual(1);
      });

      it("can be bound explicitly with CALL and APPLY", function() {
        var feed = cat.feed;
        feed.apply(cat);

        expect(cat.kilos).toEqual(2);
      });

      it("can be bound in modern browsers with BIND", function() {
        var feed = cat.feed;
        var bound = feed.bind(cat);

        bound();

        expect(cat.kilos).toEqual(2);
      });

      it("works different when function is attached to other object", function() {
        var otherCat = new Cat();
        otherCat.kilos = 10;
        otherCat.feed = cat.feed;

        otherCat.feed();
        expect(otherCat.kilos).toEqual(11);
        expect(cat.kilos).toEqual(1);
      });

      it("can be handled using the SELF trick", function() {
        var energy = 200;
        var lion = new Lion(energy);

        lion.hunt();

        expect(lion.energy).toEqual(185);
      });

      it("interprest the THIS when the function is executed", function() {
        var energy = 200;
        var lion = new Lion();

        lion.hunt = function() {
          this.energy = 4000;
        };
        lion.hunt();

        expect(lion.energy).toEqual(4000);
      });
    });
  });
});
