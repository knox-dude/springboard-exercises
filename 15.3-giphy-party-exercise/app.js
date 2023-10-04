console.log("Let's get this party started!");

const $search = $('#search')
const $gifs = $('#gifs')

function appendGif(img) {
    const $newCol = $("<div>")
    const $newImg = $("<img>", {
        src: img.images.original.url
    })
    $newCol.append($newImg);
    $gifs.append($newCol);
}

$('form').on("submit", async function(e) {
    // if (e.originalEvent.submitter)
    e.preventDefault();
    if (e.originalEvent.submitter.id =="remove") {
        return // prevents remove button from activating this event
    }
    let $searchValue = $search.val();
    $search.val("");

    // get response, got API key from solution
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q:$searchValue,
            api_key:"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    })
    // from the response, get some random gif
    const randomGifNum = Math.floor(Math.random()*response.data.data.length)
    if (!(randomGifNum)) {
        alert("Couldn't find a gif with that search!");
    } else {
        const randomGif = response.data.data[randomGifNum]
        appendGif(randomGif)
    }
})

$("#remove").on("click", function() {
    $gifs.empty();
})