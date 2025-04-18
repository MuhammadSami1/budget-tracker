export let transactions = [];


export const getTransactions = (req, res) => {
  try {

    if (!transactions) {
      throw new Error('Transactions array not initialized');
    }
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });

  } catch (err) {
    console.error('Error in getTransactions:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Failed to fetch transactions'
    });
  }
};

export const addTransaction = (req, res) => {
  try {
    const { title, amount, type, category } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        error: "Please provide title, amount, type and category",
      });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Amount must be a greater than zero",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        error: "Type must be income or expense",
      });
    }
    const date = new Date();
    const transaction = {
      id: Date.now().toString(),
      title,
      amount,
      category,
      type,
      date: date.toISOString(),
    };
    transactions.push(transaction);

    res.status(201).json({
      success: true,
      data: transaction,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const deleteTransaction = (req, res) => {
  try {
    const { id } = req.params;
    const index = transactions.findIndex((userID) => userID.id === id);

    // if (index === -1) {
    //   return res.status(404).json({
    //     success: false,
    //     error: "Transaction is not found",
    //   });
    // }

    transactions.splice(index, 1);

    return res.status(200).json({
      success: true,
      data: {},
    });



  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
