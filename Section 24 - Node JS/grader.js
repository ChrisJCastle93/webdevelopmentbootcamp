function average(scores) {
    var total = 0;
    scores.forEach(function(score) {
    total += score;
    });
    var average = total/scores.length;
    return Math.round(average);
}

var scores=[1, 3, 6, 7];

console.log(average(scores));