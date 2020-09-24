function Find (str) {
    let words = str.split(" ");
    let max_w = words[0];
    for(i = 1; i < words.length; i++){
        if(max_w.length < words[i].length)
            max_w = words[i];
    }
    return max_w;
}

module.exports.Find = Find;