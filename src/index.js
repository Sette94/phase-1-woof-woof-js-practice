
const url = "http://localhost:3000/pups/"
const dogbarContainer = document.getElementById('dog-bar')
const doginfoContainer = document.getElementById('dog-info')
const dogFilter = document.getElementById('good-dog-filter')

fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(dogNames => {
            const dogSpan = document.createElement('span')
            dogSpan.textContent = dogNames.name
            dogbarContainer.appendChild(dogSpan)

            dogSpan.addEventListener('click', () => {
                doginfoContainer.textContent = ""
                console.log(dogNames.name)
                console.log(dogNames.isGoodDog)
                console.log(dogNames.image)

                const image = document.createElement('img')
                image.src = dogNames.image

                const dogName = document.createElement('p')
                dogName.textContent = dogNames.name

                const goodDogButton = document.createElement('button')
                goodDogButton.textContent = dogNames.isGoodDog


                doginfoContainer.appendChild(image)
                doginfoContainer.appendChild(dogName)
                doginfoContainer.appendChild(goodDogButton)

                dogFilter.textContent = "Filter good dogs: OFF -Individual Dog"


                goodDogButton.addEventListener('click', () => {
                    if (dogNames.isGoodDog) {
                        let data = {
                            isGoodDog: false

                        }
                        fetch(url + dogNames.id, {
                            method: "PATCH",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data),
                        }).then(
                            goodDogButton.textContent = 'false'
                        );
                    } else {
                        let data = {
                            isGoodDog: true

                        }
                        fetch(url + dogNames.id, {
                            method: "PATCH",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data),
                        }).then(
                            goodDogButton.textContent = 'true'
                        );
                    }
                })
            })
        })
    })

let dogFilterBoolean = false;

dogFilter.addEventListener('click', () => {

    console.log(dogFilterBoolean = !dogFilterBoolean)

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (dogFilterBoolean) {
                const result = data.filter((good) => good.isGoodDog == dogFilterBoolean);
                doginfoContainer.textContent = ""
                result.forEach(goodDogs => {
                    const image = document.createElement('img')
                    image.src = goodDogs.image

                    const dogName = document.createElement('p')
                    dogName.textContent = goodDogs.name

                    const goodDogButton = document.createElement('button')
                    goodDogButton.textContent = goodDogs.isGoodDog


                    doginfoContainer.appendChild(image)
                    doginfoContainer.appendChild(dogName)
                    doginfoContainer.appendChild(goodDogButton)
                })
                dogFilter.textContent = "Filter good dogs: ON"

            } else {
                dogFilter.textContent = "Filter good dogs: OFF"
                doginfoContainer.textContent = ""
                data.forEach(goodDogs => {
                    const image = document.createElement('img')
                    image.src = goodDogs.image

                    const dogName = document.createElement('p')
                    dogName.textContent = goodDogs.name

                    const goodDogButton = document.createElement('button')
                    goodDogButton.textContent = goodDogs.isGoodDog


                    doginfoContainer.appendChild(image)
                    doginfoContainer.appendChild(dogName)
                    doginfoContainer.appendChild(goodDogButton)
                })
            }

        })
})