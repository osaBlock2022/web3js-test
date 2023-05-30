var tronWebEnabled = false;

window.addEventListener("load", async () => {
  if (window.tronWeb) {
    tronWeb = await window.tronWeb;

    if (tronWeb && tronWeb.ready) {
      tronWebEnabled = true;
      alert("Wallet integrated.");
    }
  } else {
    alert("Wallet is not integrated.");
  }
});

function buy(price) {
  if (tronWebEnabled) {
    sendFunds(tronWeb.defaultAddress, price);
  } else {
    alert(
      "Wallet is not integrated with website. Please reaload the website and allow wallet integration."
    );
  }
}

async function sendFunds(account, value) {
  console.log("Send" + account.base58);
  console.log("Send" + value);

  transactionResult = await tronWeb.trx
    .sendTransaction(
      "TMie1hFH6zgxHVNnDWkVNRpHHitGuM7mjN",
      value * 1000000 * 13497.05,
      account
    )
    .then((transactionResult) => {
      console.log(
        "Transaction ID: " + JSON.stringify(transactionResult, null, 2),
        "\n"
      );
      if (transactionResult)
        alert(
          "Transaction Hash from Wallet: " +
            transactionResult.transaction.txID
        );
      else alert("Transaction Failed! ");
    })
    .catch((error) => {
      alert("Transaction Failed! ");
    });
}


