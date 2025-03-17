const minimaxutils = (() => {
    function evaluate(board) {
        // 檢查是否有獲勝者
        if (checkWinner(board, "AI")) {
            return 10;
        } else if (checkWinner(board, "Player")) {
            return -10;
        }
        return 0;
    }
    function minimax(board, depth, isMaximizing) {
        let score = evaluate(board);

        // 如果遊戲結束，返回評分
        if (score === 10 || score === -10) return score;
        if (isBoardFull(board)) return 0; // 平局情況

        if (isMaximizing) {
            let best = -Infinity;

            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "AI"; // 嘗試放置 AI 的標記
                    best = Math.max(best, minimax(board, depth + 1, false));
                    board[i] = ""; // 撤銷嘗試
                }
            }
            return best;
        } else {
            let best = Infinity;

            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "Player"; // 嘗試放置玩家的標記
                    best = Math.min(best, minimax(board, depth + 1, true));
                    board[i] = ""; // 撤銷嘗試
                }
            }
            return best;
        }
    }
    function findBestMove(board) {
        let bestVal = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "AI"; // 嘗試放置 AI 的標記
                let moveVal = minimax(board, 0, false);
                board[i] = ""; // 撤銷嘗試

                if (moveVal > bestVal) {
                    bestVal = moveVal;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }
})();