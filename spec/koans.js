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
      expect("" == false).toBe(true);
      expect("" === false).toBe(false);
    });

    it("considers zero to be falsy", function() {
      expect(0 == false).toBe(true);
      expect(0 === false).toBe(false);
    });

    it("considers nulls to be falsy", function() {
      var x = null;
      var result;

      if (x) {
         result = true;
      } else {
         result = false;
      }

      expect(result == false).toBe(true);
      expect(null === false).toBe(false);
      expect(null == false).toBe(false);
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
    
    });

    it("may contain functions inside arrays", function() {
      var arr = [1,2, function(arg){ return 3 + arg;}];

      expect(arr[2](1)).toEqual(4);
    });

    it("concatenate arrays - well, kind of", function() {
      var a = [1,2,3];
      var b = [4,5,6];

      expect(a + b).toEqual([1,2,3] + [4,5,6]);
    });

    it("joins arrays and strings", function() {
      var a = [1,2,3];

      expect ("1" + a).toEqual("1" + [1,2,3]);
      expect(a + "1").toEqual([1,2,3] + "1");
    });

    it("joins arrays and other things", function() {
      var a = [1,2,3];
      var b = ['x', 'y', 'z'];

      expect(1 + a).toEqual(1 + [1,2,3]);
      expect(a + 1).toEqual([1,2,3] + 1);
      expect(1 + b).toEqual(1 + ['x', 'y', 'z']);
      expect(true + a).toEqual(true + [1,2,3]);
    });

    it("can't compare arrays", function() {
      var a = [1,2,3];
      var b = [1,2,3];

      expect(a == b).toBe(false);  
      expect(a === b).toBe(false); 
    });

    it("is not the same to compare by value than by reference ", function() {
      var a = [1,2,3];
      var b = [1,2,3];

      expect(a).toEqual(b);     
      expect(a).not.toBe(b);       
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

      expect(typeof(someVar)).toBe("function");
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
      
      function example() {
         var arr = [
           function(a){
              return a = [0,10];
           }
         ]
         return arr;
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
  });
});
