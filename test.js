var web3Enabled = false;
window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3Enabled = true;
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3Enabled = true;
    }
});

function buy(price){
    if(web3Enabled){
        //First you need to sender's get account from Browser
        web3.eth.getAccounts((error, account) =>{
        if(error){
            alert("Account Not found.")
        }
        else{
            //Account fetching successful
            sendFunds(account[0], price)
        }
    });
    }else{
        alert("Wallet is not integrated with website. Please reaload the website and allow wallet integration.");
    } 
}

function sendFunds(account, value){
    web3.eth.sendTransaction(
    {
            from: account,
            gasPrice: "20000000000",
            gas: "21000",
            to: "0x59B8B4238D8cBdA87046df15a6eF2815CD807C80",
            value: value*1000000000000000000,
            data: ""
    },
    function (error,hash){
        if(error) alert("Transaction Failed! ");
        else alert("Transaction Hash from Wallet: "+hash);
    }
    );
}


function subsAccount(){
    if(web3Enabled){
        //First you need to sender's get account from Browser
        web3.eth.getAccounts((error, account) =>{
        if(error){
            alert("Account Not found.")
        }
        else{
            //Account fetching successful
            subsStart(account[0]);
        }
    });
    }else{
        alert("Wallet is not integrated with website. Please reaload the website and allow wallet integration.");
    }
}

function subsStart(account){
    web3.eth.subscribe('logs',{
        address: account,
        topics: ""
    }, 
    function(error, result){
        if(error) console.log("function:" + error);
        else{
            console.log("function: "+ result);
        } 
    })
    .on("connected", function (result) {
        console.log("Connected: " + result);
        alert("Account " + account + " has received " + result/1000000000000000000 + " ETH.");
    })
    .on("data", function (log) {
        console.log("Data: " + log);
        if('data' in log){
            console.log("Data: " + data);
        }
        console.log("data:", log);
    })
    .on("changed", function (log) {
        console.log("changed:", log)
    }).on("error", function (log) {
        console.log("err:", log);
    });
}

