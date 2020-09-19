function all_combinations(array){
    let answer=[];
    for(k = 1; k <= array.length; k++){
        for(i = 0; i+k <= array.length; i++) {
            let combination = [];
            function make_comb(index) {
                combination.push(array[index]);
                if(combination.length < k) {
                    for (next = index+1; next < array.length; next++) {
                        let temp = combination.slice();
                        make_comb(next);
                        combination = temp.slice();
                    }
                }
                else {
                    answer.push(([]).concat(combination));
                }
            }
            make_comb(i);
        }
    }
    return answer;
}