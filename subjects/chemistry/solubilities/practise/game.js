var anions = [];
var cations = [];
var answer = "";

function gcd (a, b) {
  return (b == 0) ? a : gcd (b, a%b);
}

class Ion {
  constructor(formula, name, charge) {
    this.formula = formula;
    this.name = name;
    this.charge = charge;
  }
}

class IonicCompound {
  constructor(cation, anion) {
    this.cation = cation;
    this.anion = anion;
  }

  isSoluble() {
    const solubleIons = [
    "sodium",
    "potassium",
    "ammonium",
    "hydrogencarbonate",
    "nitrate",
    ];
    const halides = [
      "chloride",
      "bromide",
      "iodide"
    ];
    var cationName = this.cation.name;
    var anionName = this.anion.name;

    // ALL SOLUBLE IONS
    if (solubleIons.includes(cationName) || solubleIons.includes(anionName)) {
      return true;
    }

    // halides
    if (halides.includes(anionName)) {
      if (cationName == "potassium" || cationName == "silver") return false;
      else return true;
    }

    // sulphates
    if (anionName == "sulphate") {
      const insolubleList = ["barium", "lead", "calcium"];
      if (insolubleList.includes(cationName)) return false;
      else return true;
    }

    // carbonates & sulphites
    if (anionName == "carbonate" || anionName == "sulphite") {
      if (this.cation.charge == 1) return true;
      else return false;
    }

    if (anionName == "oxide" || anionName == "hydroxide") {
      if (cationName == "barium") return true;
      else if (this.cation.charge == 1) return true;
      else return false;
    }
  }

  getFormula() {
    const compoundIons = [
      "HCO3", "NO3", "SO4", "CO3", "SO3", "OH", "NH4"
    ]
    var cationFormula = this.cation.formula;
    var anionFormula = this.anion.formula;
    var posCharge = this.cation.charge;
    var negCharge = Math.abs(this.anion.charge);
    var r = gcd(posCharge, negCharge);
    return `${compoundIons.includes(cationFormula) && negCharge/r > 1 ? '(' + cationFormula + ')' : cationFormula}${negCharge/r == 1 ? '' : negCharge/r}${compoundIons.includes(anionFormula) && posCharge/r > 1 ? '(' + anionFormula + ')' : anionFormula}${posCharge/r == 1 ? '' : posCharge/r}`;
  }

  getName() {
    return `${this.cation.name} ${this.anion.name}`
  }
}

function randomElement(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function initialize() {
  anions.push(new Ion("Cl", "chloride", -1));
  anions.push(new Ion("Br", "bromide", -1));
  anions.push(new Ion("I", "iodide", -1));
  anions.push(new Ion("HCO3", "hydrogencarbonate", -1));
  anions.push(new Ion("NO3", "nitrate", -1));
  anions.push(new Ion("SO4", "sulphate", -2));
  anions.push(new Ion("CO3", "carbonate", -2));
  anions.push(new Ion("SO3", "sulphite", -2));
  anions.push(new Ion("O", "oxide", -2));
  anions.push(new Ion("OH", "hydroxide", -1));

  cations.push(new Ion("Ca", "calcium", 2));
  cations.push(new Ion("Mg", "magnesium", 2));
  cations.push(new Ion("Al", "aluminium", 3));
  cations.push(new Ion("Zn", "zinc", 2));
  cations.push(new Ion("Fe", "iron(II)", 2));
  cations.push(new Ion("Fe", "iron(III)", 3));
  cations.push(new Ion("Pb", "lead", 2));
  cations.push(new Ion("Cu", "copper(I)", 1));
  cations.push(new Ion("Cu", "copper(II)", 2));
  cations.push(new Ion("Ag", "silver", 1));
  cations.push(new Ion("Ba", "barium", 2));
  cations.push(new Ion("NH4", "ammonium", 1));
}

function genQuestion() {
  var anion = randomElement(anions);
  var cation = randomElement(cations);
  var compound = new IonicCompound(cation, anion);

  answer = compound.isSoluble() ? "soluble" : "insoluble";
  $("#game-card").removeClass("bg-success-pale").removeClass("bg-danger-pale").addClass("bg-light", 200);
  $("#game-panel, #btnNext").animate({opacity: 0}, 400, function() {
    $("#compoundFormula").text(`$$\\ce{${compound.getFormula()}}$$`);
    renderMathInElement($("#compoundFormula")[0]);
    $("#gameResult").css("opacity", 0);
    $("#btnNext").css("display", "none");
    $("#compoundName").text(compound.getName());
    $("#btnAnswer").css("display", "flex");
    $("#btnAnswer").animate({opacity: 1}, 400);
    $("#game-panel").animate({opacity: 1}, 400);
  });


}

function userAnswer(ans) {
  $("#btnAnswer").css("display", "none");
  $("#btnAnswer").css("opacity", 0);
  $("#btnNext").css("display", "grid");
  $("#btnNext").css("opacity", 1);
  $("#game-card").removeClass("bg-light");
  if (answer == ans) {
    $("#game-card").addClass("bg-success-pale", 800);
    $("#gameResult").text("Correct!");
  } else {
    $("#game-card").addClass("bg-danger-pale", 800);
    $("#gameResult").text("Incorrect!");
  }
  $("#gameResult").animate({opacity: 1}, 800);
}
