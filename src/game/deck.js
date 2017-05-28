const priorities = {
    high: 1,
    normal: 2,
    low: 3,
};

function hasMajority(suit, player, other, debug) {
    const playerCount = player.status.suits[suit] || 0;
    const otherCount = other.status.suits[suit] || 0;

    return playerCount && (playerCount + Boolean(player.status.winTies)) > otherCount;
}

const deck = [

    {
        description: 'Double the amount of your most numerous suit',
        short: 'LARGEST SUIT ×2',
        priority: priorities.high,
        resolve: player => {
            const maxOfSuit = Object.values(player.status.suits).sort().reverse()[0];

            for (let [key, value] of Object.entries(player.status.suits)) {
                if (value === maxOfSuit) {
                    player.status.suits[key] *= 2;
                }
            }
        }
    },

    {
        suit: '👑',
        description: 'For each 📜 gain 3 ⭐',
        short: '👑 — 3⭐️ for each 📜',
        priority: priorities.normal,
        resolve: player => {
            const count = player.status.suits['📜'] || 0;
            const points = 3 * count;

            player.status.points.push(points);
        }
    },

    {
        suit: '🖐',
        description: 'For each set of 📜 🌿 gain 5 ⭐',
        short: '🖐 — 5⭐ for each 📜🌿',
        priority: priorities.normal,
        resolve: player => {
            const count = Math.min(player.status.suits['📜'] || 0, player.status.suits['🌿'] || 0);
            const points = 5 * count;

            player.status.points.push(points);
        }
    },

    {
        suit: '👑',
        description: 'Win all ties',
        short: '👑 — win all ties',
        priority: priorities.high,
        resolve: player => {
            player.status.winTies = true;
        }
    },

    {
        description: 'For scoring the highest with a single card gain 8 ⭐',
        short: '8⭐ for one-card high score',
        priority: priorities.low,
        resolve: (player, other) => {
            const countPlayer = Math.max(...player.status.points);
            const countOther = Math.max(...other.status.points);

            if ((countPlayer + Boolean(player.status.winTies)) > countOther) {
                player.status.points.push(8);
            }
        }
    },

    {
        suit: '🖐',
        description: 'For majority in 🌿 gain 7 ⭐',
        short: '🖐 — 7⭐ for majority of 🌿',
        priority: priorities.normal,
        resolve: (player, other) => {
            if (hasMajority('🌿', player, other)) {
                player.status.points.push(7);
            }
        }
    },

    {
        suit: '🌿',
        description: 'For majority in 👑 gain 7 ⭐',
        short: '🌿 — 7⭐ for majority of 👑',
        priority: priorities.normal,
        resolve: (player, other) => {
            if (hasMajority('👑', player, other)) {
                player.status.points.push(7);
            }
        }
    },

    {
        suit: '🌿',
        description: 'For a set of 👑 🏰 🌿 📜 🖐 gain 13 ⭐',
        short: '🌿 — 13⭐ for 👑🏰🌿📜🖐',
        priority: priorities.normal,
        resolve: player => {
            const count = Math.min(
                player.status.suits['👑'] || 0, 
                player.status.suits['🏰'] || 0, 
                player.status.suits['🖐'] || 0, 
                player.status.suits['🌿'] || 0, 
                player.status.suits['📜'] || 0);
            const points = 13 * count;

            player.status.points.push(points);
        }
    },

    {
        suit: '📜',
        description: 'For each 🌿 gain 3 ⭐',
        short: '📜 — 3⭐ for each 🌿',
        priority: priorities.normal,
        resolve: player => {
            const count = player.status.suits['🌿'] || 0;
            const points = 3 * count;

            player.status.points.push(points);
        }
    },

    {
        suit: '👑',
        description: 'For majority in 🏰 gain 7 ⭐',
        short: '👑 — 7⭐ for majority of 🏰',
        priority: priorities.normal,
        resolve: (player, other) => {
            if (hasMajority('🏰', player, other)) {
                player.status.points.push(7);
            }
        }
    },

    {
        suit: '📜',
        description: 'For majority in 🖐 gain 7 ⭐',
        short: '📜 — 7⭐ for majority of 🖐',
        priority: priorities.normal,
        resolve: (player, other) => {
            if (hasMajority('🖐', player, other)) {
                player.status.points.push(7);
            }
        }
    },

    {
        suit: '🏰',
        description: 'For each suit you don\'t have gain 3 ⭐',
        short: '🏰 — 3⭐ for each 🙅',
        priority: priorities.normal,
        resolve: player => {
            const count = 5 - Object.keys(player.status.suits).length;
            const points = 3 * count;

            player.status.points.push(points);
        }
    },

    {
        suit: '🌿',
        description: 'For each 🏰 gain 3 ⭐',
        short: '🌿 — 3⭐ for each 🏰',
        priority: priorities.normal,
        resolve: player => {
            const count = player.status.suits['🏰'] || 0;
            const points = 3 * count;

            player.status.points.push(points);
        }
    },

    {
        suit: '🏰',
        description: 'For each 🖐 gain 3 ⭐',
        short: '🏰 — 3⭐ for each 🖐',
        priority: priorities.normal,
        resolve: player => {
            const count = player.status.suits['🖐'] || 0;
            const points = 3 * count;

            player.status.points.push(points);
        }
    },

    {
        suit: '📜',
        description: 'For each set of 👑 🏰 🖐 gain 9 ⭐',
        short: '📜 — 9⭐ for each 👑🏰🖐',
        priority: priorities.normal,
        resolve: player => {
            const count = Math.min(player.status.suits['👑'] || 0, player.status.suits['🏰'] || 0, player.status.suits['🖐'] || 0);
            const points = 9 * count;

            player.status.points.push(points);
        }
    },

    {
        suit: '🏰',
        description: 'For majority in 📜 gain 7 ⭐',
        short: '🏰 — 7⭐ for majority of 📜',
        priority: priorities.normal,
        resolve: (player, other) => {
            if (hasMajority('📜', player, other, 1)) {
                player.status.points.push(7);
            }
        }
    },

    {
        description: 'For majority in suits with only one card gain 8 ⭐',
        short: '8⭐ for one-card majority',
        priority: priorities.normal,
        resolve: (player, other) => {
            const countPlayer = Object.values(player.status.suits).filter(x => x === 1).length;
            const countOther = Object.values(player.status.suits).filter(x => x === 1).length;

            if ((countPlayer + Boolean(player.status.winTies)) > countOther) {
                player.status.points.push(8);
            }
        }
    },

    {
        suit: '🖐',
        description: 'For each 👑 gain 3 ⭐',
        short: '🖐 — 3⭐ for each 👑',
        priority: priorities.normal,
        resolve: player => {
            const count = player.status.suits['👑'] || 0;
            const points = 3 * count;

            player.status.points.push(points);
        }
    },

];

module.exports = { deck, priorities };
