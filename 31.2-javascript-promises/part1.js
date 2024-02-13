// Part 1: Number Facts
const BASE_URL_PART1 = "http://numbersapi.com";

$(document).ready(function(){

    //question 1
    axios.get(`${BASE_URL_PART1}/17/trivia?json`)
        .then(res => {
            // $("#part1").append("<li>First question - use the API:<br><br>" + res.data.text + "</li><br>");
            console.log(res.data.text);
        });

    //question 2
    axios.get(`${BASE_URL_PART1}/17..19/trivia?json`)
        .then(res => {
            // $("#part1").append("<li>Second question - use the API for batch job:<br><br>")
            for (let num in res.data) {
                // $("#part1").append(num + ": " + res.data[num] + "<br><br>");
                console.log(num + ": " + res.data[num]);
            };
            // $("#part1").append("</li>");
        });


    //question 3
    const url = `${BASE_URL_PART1}/17/trivia?json`

    axios.get(`${url}`)
        .then(res => {
            // $("#part1").append("<li>Third question - use the API multiple times:<br><br></li>");
            // $("#part1").append(res.data.text + "<br><br>");
            console.log(res.data.text);
            return axios.get(`${url}`);
        })
        .then(res => {
            // $("#part1").append(res.data.text + "<br><br>");
            console.log(res.data.text);
            return axios.get(`${url}`);
        })
        .then(res => {
            // $("#part1").append(res.data.text + "<br><br>");
            console.log(res.data.text);
            return axios.get(`${url}`);
        })
        .then(res => {
            // $("#part1").append(res.data.text + "<br><br>");
            console.log(res.data.text);
        });
});