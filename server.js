const express = require("express");

const ser = express();

ser.get('/',function (request, response){
    response.send('<h1>Welcome</h1>');
})

ser.get('/api/GudkovNikita/lab1/2',function (request, response){

        let array = (request.query.Array).slice();
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
        response.send(answer);
})

ser.get('/api/GudkovNikita/lab1/5',function (request, response){
    let words = (request.query.String).split(" ");
    let max_w = words[0];
    for(i = 1; i < words.length; i++){
        if(max_w.length < words[i].length)
            max_w = words[i];
    }
    response.send(max_w);
})

ser.get('/api/GudkovNikita/lab1/15',function (request, response){
    email = request.query.Email;
    let emails = new RegExp("[\\w0-9_-]+@[\\w0-9_-]+\\.[\\w]{2,4}",'ig');
    response.send("Email is " + emails.test(email));
})

ser.listen(4444);