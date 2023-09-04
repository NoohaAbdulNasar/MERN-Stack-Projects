(function () {
    const firstDiv = document.querySelector('.first');
    const secondDiv = document.querySelector('.second');
    const thirdDiv = document.querySelector('.third');
    const diceLink = document.getElementById('diceLink');
    const retryButton = document.getElementById('retryButton');
    const newPlayerButton = document.getElementById('newPlayerButton');
    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');

    let player1Name = '';
    let player2Name = '';

    document.getElementById('playerForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const player1NameInput = document.getElementById('player1');
        const player2NameInput = document.getElementById('player2');

        player1Name = player1NameInput.value;
        player2Name = player2NameInput.value;

        setTimeout(() => {
            secondDiv.style.display = 'block';
            firstDiv.style.display = 'none';
            thirdDiv.style.display = 'none';
            const pElement = document.querySelector('.second.box p');
            pElement.textContent = `${player1Name} vs ${player2Name}`;
        }, 100);
    });

    diceLink.addEventListener('click', () => {
        diceLink.classList.add('rotate-dice');

        setTimeout(() => {
            rollDice();

            setTimeout(() => {
                firstDiv.style.display = 'none';
                secondDiv.style.display = 'none';
                thirdDiv.style.display = 'block';

                document.getElementById("playerOne").textContent = player1Name;
                document.getElementById("playerTwo").textContent = player2Name;
            }, 100);
        }, 1200);
    });

    retryButton.addEventListener('click', () => {
        secondDiv.style.display = 'block';
        thirdDiv.style.display = 'none';

        diceLink.classList.remove('rotate-dice');
    });

    newPlayerButton.addEventListener('click', () => {
        firstDiv.style.display = 'block';
        secondDiv.style.display = 'none';
        thirdDiv.style.display = 'none';

        // Clear player names
        player1Name = '';
        player2Name = '';
    });

    // Function to simulate a dice roll
    function rollDice() {
        const result1 = Math.floor(Math.random() * 6) + 1;
        const result2 = Math.floor(Math.random() * 6) + 1;

        img1.src = `images/dice${result1}.png`;
        img2.src = `images/dice${result2}.png`;

        const resultText = document.querySelector(".container h2");
        if (result1 > result2) {
            resultText.innerHTML = `🚩${player1Name} wins`;
        } else if (result1 < result2) {
            resultText.innerHTML = `${player2Name} wins 🚩`;
        } else {
            resultText.innerHTML = "It's a draw !!!";
        }
    }
})();