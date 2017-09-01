import mojs from "mo-js";

const removeClass = className => {
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

//EFFECT

let starEff = () => {
  mojs.addShape(
    "star",
    class Star extends mojs.CustomShape {
      getShape() {
        return `<path d="M5.51132201,34.7776271 L33.703781,32.8220808 L44.4592855,6.74813038 C45.4370587,4.30369752 47.7185293,3 50,3 C52.2814707,3 54.5629413,4.30369752 55.5407145,6.74813038 L66.296219,32.8220808 L94.488678,34.7776271 C99.7034681,35.1035515 101.984939,41.7850013 97.910884,45.2072073 L75.9109883,63.1330483 L82.5924381,90.3477341 C83.407249,94.4217888 80.4739296,97.6810326 77.0517236,97.6810326 C76.0739505,97.6810326 74.9332151,97.3551083 73.955442,96.7032595 L49.8370378,81.8737002 L26.044558,96.7032595 C25.0667849,97.3551083 23.9260495,97.6810326 22.9482764,97.6810326 C19.3631082,97.6810326 16.2668266,94.4217888 17.4075619,90.3477341 L23.9260495,63.2960105 L2.08911601,45.2072073 C-1.98493875,41.7850013 0.296531918,35.1035515 5.51132201,34.7776271 Z" />`;
      }
    }
  );

  let className = "mo-js-star";

  const star = new mojs.Shape({
    shape: "star",
    fill: "#FFEB3B",
    className,
    scale: { 0: 5 },
    easing: "elastic.out",
    duration: 1000,
    radius: 20
  }).then({
    scale: { to: 0, easing: "sin.out" },
    angle: { 0: "rand(0, 360)" },
    onComplete() {
      removeClass(className);
    }
  });

  star.play();
};

export { starEff };
