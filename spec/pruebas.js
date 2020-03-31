function Cat() {
  this.kilos = 1;
  this.feed = function() {
    this.kilos++;
  };
  this.isPurring = function() {
    return true;
  };
}

cat = new Cat();
window.kilos = 0;

console.log(cat);
window.log(window);
