export const convertGame = (game) => ({
    ...game,
    timestamp: game.timestamp.toMillis(),
  });
  