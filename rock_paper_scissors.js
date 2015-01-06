var result = function(userChoice, computerChoice) {
  if(userChoice === computerChoice) {
    return "It's a tie!";
  }
  else if(userChoice === "rock") {
    if(computerChoice === "paper") {
      return "Your rock loses to paper";
    }
    else if(computerChoice === "scissors") {
      return "Your rock beats scissors";
    }
  }
  else if(userChoice === "paper") {
    if(computerChoice === "scissors") {
      return "Your paper loses to scissors";
    }
    else if(computerChoice === "rock") {
      return "Your paper beats rock";
    }
  }
  else if(userChoice === "scissors") {
    if(computerChoice === "rock") {
      return "Your scissors lose to rock";
    }
    else if(computerChoice === "paper") {
      return "Your scissors beat paper";
    }
  }
};

var computerChoose = function() {
  var choice = Math.random();
  if(choice < .34) {
    return "rock";
  }
  else if(choice < .67) {
    return "paper";
  }
  else {
    return "scissors";
  }
};

$(document).ready(function() {

  $('.rock').on('click', function() {
    $('.game h1').text(result("rock", computerChoose()));
  });


});
