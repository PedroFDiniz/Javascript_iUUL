let rodando = true;
while (rodando) {
    const prompt = PromptSync({sigint:true});
    console.log("Vertice 1");
    let nome1 = prompt('X Y: ');
    let xy1 = nome1.split(" ");
    console.log("");

    console.log("Vertice 2");
    let nome2 = prompt('X Y: ');
    let xy2 = nome2.split(" ");
    console.log("");

    console.log("Vertice 3");
    let nome3 = prompt('X Y: ');
    let xy3 = nome3.split(" ");
    console.log("");

    let v1 = new Vertice(parseInt(xy1[0]), parseInt(xy1[1]));
    let v2 = new Vertice(parseInt(xy2[0]), parseInt(xy2[1]));
    let v3 = new Vertice(parseInt(xy3[0]), parseInt(xy3[1]));
    console.log(v1.toString());
    console.log(v2.toString());
    console.log(v3.toString());
    rodando = false;
}