let padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 600 - padding.left - padding.right,
  h = 600 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 27,
  oldpick = [],
  turn = false;
color = d3.scale.category20();


/* Attention: The following logic is the same for the Data Wheel: https://github.com/lzaquine/wheel_data */

/* Change name/picture of each student */

let data = [
  {
    label: "Alexandre A.", /* Student Name */
    value: 1,
    question: "Alexandre", /* Name that is going to show up on the screen */
    pic: "Alunos_Jan23/Alexandre.png", /* Picture of the student */
  },
  {
    label: "André L.", 
    value: 2,
    question: "André",
    pic: "Alunos_Jan23/Andre.jpeg",
  },
  {
    label: "Assebe K.",
    value: 3,
    question: "Assebe",
    pic: "Alunos_Jan23/Assebe.jpeg",
  },
  {
    label: "Caio M.",
    value: 4,
    question: "Caio",
    pic: "Alunos_Jan23/Caio.jpeg",
  },
  {
    label: "Caroline K.",
    value: 5,
    question: "Caroline",
    pic: "Alunos_Jan23/Caroline.png",
  },
  {
    label: "Duarte F.",
    value: 6,
    question: "Duarte",
    pic: "Alunos_Jan23/Duarte.jpeg",
  },
  {
    label: "Déborah L.",
    value: 7,
    question: "Déborah",
    pic: "Alunos_Jan23/Deborah.png",
  },
  {
    label: "Erika G.",
    value: 8,
    question: "Erika",
    pic: "Alunos_Jan23/Erika.jpeg",
  },
  {
    label: "Eveline C.",
    value: 9,
    question: "Eveline",
    pic: "Alunos_Jan23/Eveline.png",
  },
  {
    label: "Farid C.",
    value: 10,
    question: "Farid",
    pic: "Alunos_Jan23/Farid.png",
  },
  {
    label: "Francisco P.",
    value: 11,
    question: "Francisco",
    pic: "Alunos_Jan23/Francisco.png",
  },
  {
    label: "Gabriel G.",
    value: 12,
    question: "Gabriel",
    pic: "Alunos_Jan23/Gabriel.png",
  },
  {
    label: "Joana G.",
    value: 13,
    question: "Joana",
    pic: "Alunos_Jan23/Joana.jpeg",
  },
  {
    label: "José L.",
    value: 14,
    question: "José",
    pic: "Alunos_Jan23/JoseL.png",
  },
  {
    label: "João C.",
    value: 15,
    question: "João Carneiro",
    pic: "Alunos_Jan23/JoaoC.png",
  },
  {
    label: "João R.",
    value: 16,
    question: "João Raposo",
    pic: "Alunos_Jan23/JoaoR.jpeg",
  },
  {
    label: "Maria C.",
    value: 17,
    question: "Maria",
    pic: "Alunos_Jan23/Maria.jpeg",
  },
  {
    label: "Mariana F.",
    value: 18,
    question: "Mariana",
    pic: "Alunos_Jan23/Mariana.jpeg",
  },
  {
    label: "Marisha D.",
    value: 19,
    question: "Marisha",
    pic: "Alunos_Jan23/Marisha.jpeg",
  },
  {
    label: "Miguel J.",
    value: 20,
    question: "Miguel Jesus",
    pic: "Alunos_Jan23/MiguelJ.png",
  },
  {
    label: "Paulo C.",
    value: 22,
    question: "Paulo",
    pic: "Alunos_Jan23/Paulo.png",
  },
  {
    label: "Pedro L.",
    value: 23,
    question: "Pedro",
    pic: "Alunos_Jan23/Pedro.jpeg",
  },
  {
    label: "Rafaela U.",
    value: 24,
    question: "Rafaela",
    pic: "Alunos_Jan23/Rafaela.jpeg",
  },
  {
    label: "Tiago R.",
    value: 25,
    question: "Tiago",
    pic: "Alunos_Jan23/Tiago.jpeg",
  },
  {
    label: "Tomás B.",
    value: 26,
    question: "Tomás",
    pic: "Alunos_Jan23/Tomas.png",
  },
  {
    label: "Vanessa V.",
    value: 27,
    question: "Vanessa",
    pic: "Alunos_Jan23/Vanessa.jpeg",
  },
];
let svg = d3
  .select("#chart")
  .append("svg")
  .data([data])
  .attr("width", w + padding.left + padding.right)
  .attr("height", h + padding.top + padding.bottom);
let container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
  );
let vis = container.append("g");

let pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });
let arc = d3.svg.arc().outerRadius(r);
let arcs = vis
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice");

arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("d", function (d) {
    return arc(d);
  });
arcs
  .append("text")
  .attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")translate(" +
      (d.outerRadius - 10) +
      ")"
    );
  })
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return data[i].label;
  });
container.on("click", spin);
function spin(d) {
  turn = true;
  container.on("click", null);
  if (oldpick.length == data.length) {
    console.log("done");
    container.on("click", null);
    return;
  }

  /* Song method.  */
  song.play();
  let ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    /* RNG Velocity */
    rng = Math.floor(Math.random() * 2880 + 360);

  /* Rotation Velocity */
  rotation = Math.round(rng / ps) * ps * 2;

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;
  if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
  } else {
    oldpick.push(picked);
  }
  rotation += 90 - Math.round(ps / 2);
  vis
    .transition()
    /* Duration of each spin */
    .duration(8000) /* I always cropped the audio to 7-8 seconds to use 8000 here */
    .attrTween("transform", rotTween)
    .each("end", function () {
      if (data[picked].label === "Miguel L.") {
        data[picked].label === "NOT HERE";
      }
      d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
        "fill",
        "#111"
      );
      d3.select("#question h1").text(data[picked].question);
      d3.select("#pic img").attr("src", data[picked].pic);
      oldrotation = rotation;
      turn = false;
      container.on("click", spin);
    });
}

/* Arrow */
svg
  .append("g")
  .attr(
    "transform",
    "translate(" + (w + 200) + "," + (h / 2 + padding.top) + ")"
  )
  .append("path")
  .attr("d", "M-" + r * 0.8 + ",0L0," + r * 0.4 + "L0,-" + r * 0.4 + "Z")
  .style({ fill: "red" });
/* Draw spin circle */
/* container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer"}); */
container
  .append("image")
  .attr("xlink:href", "/assets/ironhackpt-removebg-preview.png") /* Image on the center of the wheel. To change size/position, lines 299 to 302 */
  .attr("x", -110)
  .attr("y", -110)
  .attr("width", 225)
  .attr("height", 225)
  .style({ cursor: "pointer" });

function rotTween(to) {
  let i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}

function getRandomNumbers() {
  let array = new Uint16Array(1000);
  let scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
  if (
    window.hasOwnProperty("crypto") &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(array);
    console.log("works");
  } else {
    for (let i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}
