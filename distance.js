//tar två punkter med lika dimensioner som arrayer och returnerar avståndet mellan punkterna.
function distance(p1,p2){
    let kvadratprodukten = 0;
    for(let i=0;i<p1.length;i++){
        kvadratprodukten += Math.pow(p1[i]-p2[i],2);
    }
    return Math.pow(kvadratprodukten,0.5);
}

let h = distance([-3,-4,5], [9,12,5]);
console.log(h);