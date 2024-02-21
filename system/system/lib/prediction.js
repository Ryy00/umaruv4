function words(input, output) {
    let tokenize = input.trim().replace(/\s+/, "").match(/.{1,2}/g);
    let tokenizer = output.trim().replace(/\s+/, "").match(/.{1,2}/g);
    if(tokenize === tokenizer) return 1;
    let score = 0;
    let cBi = {};
    let cBo = {};
    let bBi = {};
    let bBo = {};
    let prediction = [];
    if(tokenize[tokenize.length - 1].length === 1) {
        let cB = tokenize[tokenize.length - 1];
        tokenize = tokenize.filter(a => a !== tokenize[tokenize.length - 1]);
        tokenize.push(tokenize[tokenize.length - 1][1]+cB)
    }
    if(tokenizer[tokenizer.length - 1].length === 1) {
        let cB = tokenizer[tokenizer.length - 1];
        tokenizer = tokenizer.filter(a => a !== tokenizer[tokenizer.length - 1]);
        tokenizer.push(tokenizer[tokenizer.length - 1][1]+cB)
    }
    prediction.push(tokenize.length + tokenizer.length);
    for (let i = 0; i < tokenize.length; i++) {
            if(!cBi[tokenize[i]]) cBi[tokenize[i]] = 0;
            cBi[tokenize[i]]++
            bBi[tokenize[i]] = 0;
    }
    for (let i = 0; i < tokenizer.length; i++) {
            if(!cBo[tokenizer[i]]) cBo[tokenizer[i]] = 0;
            cBo[tokenizer[i]]++
            bBo[tokenizer[i]] = 0;
    }
    for (let i = 0; i < tokenize.length; i++) {
        if(tokenizer.includes(tokenize[i]) && bBi[tokenizer[i]] !== cBi[tokenizer[i]] ) {
            score++;
            bBi[tokenizer[i]]++;
        }
    }
    for (let i = 0; i < tokenizer.length; i++) {
        if(tokenize.includes(tokenizer[i]) && bBo[tokenize[i]] !== cBo[tokenize[i]]) {
            score++;
            bBo[tokenize[i]]++;
        }
    }
    prediction.push(score);
    return Math.min(...prediction) / Math.max(...prediction);
}
export const predict=function(input, array) {
     if(input === "") {
        return {input: input, data: array[0], accuracy: 0, prediction: [{data: array[0], accuracy: 1}]};
     } else if(array.includes(input)) {
        return {input: input, data: input, accuracy: 1, prediction: [{data: input, accuracy: 1}]};
     } else if (2 >= input.length) {
        return {input: input, data: array[0], accuracy: 0, prediction: [{data: array[0], accuracy: 1}]};
     }
      let prediction = [];
      let score = 0;
      let outp = array[0];
    for(const item of array) {
        prediction.push({data: item, accuracy: words(input, item)});
    }
    let out = prediction.sort((a, b) => b.accuracy - a.accuracy);
    if(out.length !== 0) {
        outp = out[0].data;
        score = out[0].accuracy
    }

    return {input: input, data: outp, accuracy: score,prediction: out}
}
