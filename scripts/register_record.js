const hre = require("hardhat")
const contract_json = require("../artifacts/contracts/Domains.sol/Domains.json")
//https://mumbai.polygonscan.com/token/0x8892307a36A04271B69A9EC575f2Ae8089AFCb7c#balances
//https://mumbai.polygonscan.com/address/0x8892307a36A04271B69A9EC575f2Ae8089AFCb7c
const abi = contract_json.abi
let domain_name = "JohnDemoc"
let record_des = "Who is country owner?"
async function main() {
    // create provider ==> connect wallet 
    // invoke  contract
    const alchemy_provider = new hre.ethers.providers.AlchemyProvider(
        'maticmum', process.env.ALCHEMY_MUMBAI_API_KEY
    )
    // set pk of any user = 'xxxxxxxxxxx'
    const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy_provider);
    const domainContract = new hre.ethers.Contract(
        process.env.ALCHEMY_MUMBAI_CONTRACT_ADDRESS
        , abi
        , userWallet)


    const fee =
        domain_name.length === 3
            ? "0.5"
            : domain_name.length === 4
                ? "0.3"
                : "0.1";
    console.log("minting domain ", domain_name, "with price ", fee);



    try {
        //1-function register(string calldata name) public payable
        let tx_register = await domainContract.register(domain_name, {
            value: hre.ethers.utils.parseEther(fee)
        });
        const tx_register_resp = await tx_register.wait();

        if (tx_register_resp.status == 1) {

            console.log("domain minted https://mumbai.polygonscan.com/tx/" + tx_register.hash);
            //2-function setRecord(string calldata name, string calldata record) public
            const tx_record = await domainContract.setRecord(domain_name, record_des)
            await tx_record.wait()
            console.log("record minted https://mumbai.polygonscan.com/tx/" + tx_record.hash);
        }
        else {
            alert("transaction failed, please try again");
        }

        console.log("Get information once minted and recorded successfully.")
        //function getAddress(string calldata name) public view returns (address) 
        const address = await domainContract.getAddress(domain_name);
        console.log("1-Owner of domain pongthsa:", address);

        const record_item = await domainContract.getRecord(domain_name);
        console.log("2-Record of :", record_item);

        //get balance of contract
        const balance = await hre.ethers.provider.getBalance(domainContract.address);
        console.log("3-Contract balance:", hre.ethers.utils.formatEther(balance));

    } catch (error) {
        console.log(error)
    }



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
