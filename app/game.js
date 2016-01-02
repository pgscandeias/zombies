function random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateDate()
{
    document.getElementById('date').innerHTML = Game.state.date.format('LL');
}

var Game = {
    state: {
        survivors: 1,
        food: 10,
        date: moment('2020-01-01'),
        nights: 0
    },

    nextNight: function() {
        this.state.nights++;
        this.state.date.add(1, 'days');

        this.fightZombies();

        this.upkeep();

        updateDate();

        var specialDates = [
            {
                date: moment('2020-01-03'),
                message: 'A wild Joe appeared'
            },
            {
                date: moment('2020-01-04'),
                message: 'You found Klaus. He is very special jah. Morale up by 5'
            }
        ];

        for (var i = 0; i < specialDates.length; i++) {
            if (specialDates[i].date.format('L') == this.state.date.format('L')) {
                alert(specialDates[i].message);
            }
        }

        console.log(this.state);
    },

    searchSurvivors: function() {
        var chance = this.state.survivors;
        var found = random(0, 3);
        if (chance >= found) {
            console.log('Found a survivor!');
            this.state.survivors++;
        }

        this.nextNight();
    },

    searchFood: function() {
        var chance = this.state.survivors;
        var found = random(0, 3);
        if (chance >= found) {
            console.log('Found food!');
            this.state.food++;
        }

        this.nextNight();
    },

    fightZombies: function() {
        // Always fight at least 10 zombies. Every night you might fight even more.
        var zombies = random(10, 10 + this.state.nights * 10);

        // Each survivor can defend against a number of zombies
        var defense = random(10, 10 + this.state.survivors * 20);

        console.log('Fought ' + zombies + ' zombies tonight. Could defend against ' + defense);

        // If more zombies than defense capacity, lose a survivor
        if (zombies > defense) {
            this.state.survivors--;
            console.log('Lost a survivor to zombies');
        }
    },

    upkeep: function() {
        // Eat 1 food per survivor
        var consumption = this.state.survivors;
        this.state.food = this.state.food - consumption;
        console.log('Ate ' + consumption + ' food.');

        // If no food left, lose 1 survivor
        if (this.state.food < 0) {
            this.state.survivors--;
            alert('1 survivor starved to death');
        }

        // If no people left, lose the game
        if (this.state.survivors < 1) {
            alert('GAME OVER: Everyone is dead.');
        }
    }
}


// Game initialization
updateDate();
