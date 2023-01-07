const _ = require('lodash')
const prompts = require('prompts');
const Table = require('cli-table3');

let digitCount = 4
let randomAns = []
let prefix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let tableArr = []
let tableCount = 1;
_.times(digitCount, ()=>{
    randomAns.push(prefix.charAt(_.random(0, prefix.length-1)))
})

const answer =  randomAns.join('');

const question = async () =>{
        const response = await prompts({
          type: 'text',
          name: 'value',
          message: 'Please input answer',
          validate: value => value.length !== digitCount ? `Please input ${digitCount} digit` : true
        });
        response.value = response.value.toUpperCase()
        if(response.value === 'EXIT') return;
 
        let correctCount = {
            all : 0,
            position : 0
        }

        for( let i = 0; i < answer.length; i++) {
            if(answer.charAt(i) === response.value.charAt(i)) correctCount.position++;
            if(response.value.split('').includes(answer.charAt(i))) correctCount.all++;
        }

        var table = new Table({
            head: ['answer', 'random', 'correct/all', 'correct/position', 'count'], 
        });
        tableArr.push([answer, response.value, correctCount.all, correctCount.position, tableCount++])
        table.push(
            ...tableArr
        );
        console.log(table.toString())
        if(response.value === answer) {
            console.log('Congratulations! Answer is correct.')
            return;
        }
        question();
}
question();