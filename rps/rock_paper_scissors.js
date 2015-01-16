$(document).ready(function() {

  var wins = 0;
  var losses = 0;
  var ties = 0;

  $("#wins span").html(wins);
  $("#losses span").html(losses);
  $("#ties span").html(ties);

  $('[data-play]').on('click', function() {
    $('[data-placeholder=history]').empty();
    $('[data-placeholder=result]').empty();
    var computerChoice = computerChoose();
    $('[data-placeholder=history]').append($('<p>You chose ' + $(this).data('play') + '</p>'));
    $('[data-placeholder=history]').append($('<p>The computer chose ' + computerChoice + '</p>'));
    setTimeout(function () {
      $('[data-placeholder=result]').text(result($(this).data('play'), computerChoice));
      $("#wins span").html(wins);
      $("#losses span").html(losses);
      $("#ties span").html(ties);
    }.bind(this), 1000);
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
