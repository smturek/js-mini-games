$(document).ready(function() {

  var wins = 0;
  var losses = 0;
  var ties = 0;

  $("#wins span").html(wins);
  $("#losses span").html(losses);
  $("#ties span").html(ties);

  $('.rock').on('click', function() {
    $(this).parent().parent().find('.game').find('.result').text(result("rock", computerChoose()));
    $("#wins span").html(wins);
    $("#losses span").html(losses);
    $("#ties span").html(ties);
  });

  $('.paper').on('click', function() {
    $(this).parent().parent().find('.game').find('.result').text(result("paper", computerChoose()));
    $("#wins span").html(wins);
    $("#losses span").html(losses);
    $("#ties span").html(ties);
  });

  $('.scissors').on('click', function() {
    $(this).parent().parent().find('.game').find('.result').text(result("scissors", computerChoose()));
    $("#wins span").html(wins);
    $("#losses span").html(losses);
    $("#ties span").html(ties);
  });

  var result = function(userChoice, computerChoice) {
    if(userChoice === computerChoice) {
      ties += 1;
      return "It's a tie!";
    }
    else if(userChoice === "rock") {
      if(computerChoice === "paper") {
        losses += 1;
        return "Your rock loses to paper";
      }
      else if(computerChoice === "scissors") {
        wins += 1;
        return "Your rock beats scissors";
      }
    }
    else if(userChoice === "paper") {
      if(computerChoice === "scissors") {
        losses += 1;
        return "Your paper loses to scissors";
      }
      else if(computerChoice === "rock") {
        wins += 1;
        return "Your paper beats rock";
      }
    }
    else if(userChoice === "scissors") {
      if(computerChoice === "rock") {
        losses += 1;
        return "Your scissors lose to rock";
      }
      else if(computerChoice === "paper") {
        wins += 1;
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

});
