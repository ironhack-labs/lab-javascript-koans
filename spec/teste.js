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
  console.log(obj.score())
  obj.addPoint();
  console.log(obj.score())

