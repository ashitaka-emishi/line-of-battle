
    // Rule: 2.1a Outline Sequence of Play

const Player = {
  ArmyOfNorthVirginia : "Army of North Virginia",
  ArmyOfThePotomac: "Army of the Potomac",
}

class GameTurn {
  
    static PlayerTurn = [
      // Design: Make model flat. No  benefit from hierarchy
      "Command Phase",
      "- Orders",
      "- Attack Recovery",
      "- Fluke Stoppage",
      "Activity Phase",
      "- Movemenr & Combat",
      "Rally Phase",
      "Rally",
      "Remove Counter Battery Fire Markers",
      "Loss Recovery" // 12 midnight turns only
    ]
    ;
    #activePlayer = Player.ArmyOfNorthVirginia;
    #isFirstPlayerActive = true;
    #step = 0;
    constructor(firstPlayer) {
      this.#activePlayer = firstPlayer;
    }

    current() {
      const step = PlayerTurn[this.#step]; 

      // Find phase
      let phase = null;
      let offset = 0;
      let stepToCheck = step
      while(phase == null) {
        if (stepToCheck.includes("Phase")) phase = stepToCheck;
        stepToCheck = PlayerTurn[this.#step - offset];
        offset += 1;
      }

      let playerNumber = this.#isFirstPlayerActive ? 1 : 2;

      if (ondblclick == 0) step = "Prep";

      return {
        phase,
        playerNumber,
        player: this.#activePlayer,
        step,
        label: `${playerNumber}: ${player} - ${phase} - ${step}`,
      };
    }

    // Move to the next step in the turn
    next() {
      this.#step += 1;
      if (this.#step > PlayerTurn.length) {
        this.#step = 0;
        // Toggle active player
        this.#activePlayer = (this.#activePlayer == Player.ArmyOfThePotomac) ?
          Player.ArmyOfNorthVirginia : Player.ArmyOfThePotomac;
        this.#isFirstPlayerActive = !this.#isFirstPlayerActive;
      }
    }
}





  